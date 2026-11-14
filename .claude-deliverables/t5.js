const { chromium } = require('playwright');
const pages=[['contattaci','/contattaci/'],['grazie','/grazie/'],['servizi','/servizi/'],['progetti','/progetti/']];
(async () => {
  const b = await chromium.launch();
  const out={};
  for (const [n,u] of pages){
    const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
    await p.goto('https://staging.propagandaadv.com'+u,{waitUntil:'networkidle'});
    out[n]=await p.evaluate(()=>{
      const parse=c=>{const m=c.match(/[\d.]+/g).map(Number);return {r:m[0],g:m[1],b:m[2],a:m[3]===undefined?1:m[3]}};
      const lum=({r,g,b})=>{const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};return .2126*f(r)+.7152*f(g)+.0722*f(b)};
      const bgOf=el=>{let layers=[];while(el){const c=parse(getComputedStyle(el).backgroundColor);if(c.a>0)layers.push(c);if(c.a===1)break;el=el.parentElement}let base={r:255,g:255,b:255};for(const l of layers.reverse()){base={r:base.r*(1-l.a)+l.r*l.a,g:base.g*(1-l.a)+l.g*l.a,b:base.b*(1-l.a)+l.b*l.a}}return base};
      const fails=[];const seen=new Set();
      document.querySelectorAll('main *, .elementor-location-single *').forEach(el=>{
        if(!el.childNodes.length)return;const t=[...el.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim()).map(n=>n.textContent.trim()).join(' ');if(!t)return;
        const cs=getComputedStyle(el);if(cs.visibility==='hidden'||cs.display==='none'||cs.opacity==='0')return;
        const r=el.getBoundingClientRect();if(!r.width||!r.height)return;
        const fg=parse(cs.color);const bg=bgOf(el);const mix={r:bg.r*(1-fg.a)+fg.r*fg.a,g:bg.g*(1-fg.a)+fg.g*fg.a,b:bg.b*(1-fg.a)+fg.b*fg.a};
        const L1=lum(mix),L2=lum(bg);const ratio=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);
        const size=parseFloat(cs.fontSize);const big=size>=24||(size>=18.66&&+cs.fontWeight>=700);
        const need=big?3:4.5;
        if(ratio<need&&!seen.has(t)){seen.add(t);fails.push(t.slice(0,40)+' | '+ratio.toFixed(2)+' | '+size+'px | '+cs.color)}
      });
      const h=document.querySelector('h1'),s=document.querySelector('section,.e-con.e-parent');
      const g=e=>{if(!e)return null;const c=getComputedStyle(e);return [c.fontFamily.split(',')[0],c.fontSize,c.fontWeight,c.lineHeight,c.color,c.letterSpacing].join('|')};
      const btn=document.querySelector('main .elementor-button, .elementor-widget-button .elementor-button');
      return {fails,h1:g(h),body:g(document.body),btn:g(btn),btnBg:btn&&getComputedStyle(btn).backgroundColor,btnRadius:btn&&getComputedStyle(btn).borderRadius,btnPad:btn&&getComputedStyle(btn).padding,firstSectionPad:(()=>{const e=document.querySelector('.elementor-location-single .e-con.e-parent, main .e-con.e-parent, .elementor > .e-con');return e&&getComputedStyle(e).padding})()};
    });
    await p.close();
  }
  console.log(JSON.stringify(out,null,1)); await b.close();
})();
