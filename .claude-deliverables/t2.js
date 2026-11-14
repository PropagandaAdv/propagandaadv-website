const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
  const errs=[]; p.on('console',m=>{if(m.type()==='error')errs.push(m.text())}); p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
  await p.goto('https://staging.propagandaadv.com/contattaci/',{waitUntil:'networkidle'});
  const before = await p.locator('.pa-mapbox iframe').count();
  await p.locator('[data-map]').first().click(); await p.waitForTimeout(1500);
  const after = await p.locator('.pa-mapbox iframe').count();
  const formInFooter = await p.evaluate(()=>!!document.querySelector('footer form, .elementor-location-footer form'));
  const formInMain = await p.evaluate(()=>[...document.querySelectorAll('form')].filter(f=>!f.closest('footer,.elementor-location-footer')).length);
  const ids = await p.evaluate(()=>!!document.getElementById('contatti'));
  console.log(JSON.stringify({errs,before,after,formInFooter,formInMain,contattiAnchor:ids}));
  await b.close();
})();
