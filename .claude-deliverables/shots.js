const { chromium } = require('playwright');
const out = process.argv[2];
(async () => {
  const b = await chromium.launch();
  const res = {};
  for (const [name, url] of [['contattaci','https://staging.propagandaadv.com/contattaci/'],['grazie','https://staging.propagandaadv.com/grazie/']]) {
    for (const w of [1440,1024,768,390]) {
      const ctx = await b.newContext({ viewport:{width:w,height:900}, deviceScaleFactor:2 });
      const p = await ctx.newPage();
      const errs=[]; p.on('console',m=>{if(m.type()==='error')errs.push(m.text())}); p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
      await p.goto(url,{waitUntil:'networkidle'});
      const h = await p.evaluate(()=>document.body.scrollHeight);
      for (let y=0;y<h;y+=500){await p.evaluate(y=>window.scrollTo(0,y),y);await p.waitForTimeout(350);}
      await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(1500);
      await p.screenshot({path:`${out}/${name}-${w}.png`,fullPage:true});
      if (w===1440) {
        res[name]={errs, headers:await p.locator('header').count(), footers:await p.locator('footer').count(),
          forms:await p.locator('form').count(), h1:await p.locator('h1').allInnerTexts(),
          robots:await p.evaluate(()=>document.querySelector('meta[name=robots]')?.content),
          links:await p.evaluate(()=>[...document.querySelectorAll('main a, .elementor-location-single a, a[href^="tel:"],a[href^="mailto:"],a[href*="maps"],a[href$=".pdf"],a[href*="#contatti"]')].map(a=>a.getAttribute('href')).filter((v,i,a)=>a.indexOf(v)===i)),
          cards:await p.locator('.pa-lp-card').count(),
          cardStyle:await p.evaluate(()=>{const c=document.querySelector('.pa-lp-card');return c?getComputedStyle(c).borderRadius+' '+getComputedStyle(c).aspectRatio:null}),
          h1Style:await p.evaluate(()=>{const e=document.querySelector('h1,.elementor-heading-title');const s=getComputedStyle(e);return [s.fontFamily,s.fontSize,s.fontWeight,s.color].join('|')})};
      }
      await ctx.close();
    }
  }
  console.log(JSON.stringify(res,null,1)); await b.close();
})();
