const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
  const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  const reqs=[]; p.on('response',r=>{if(r.request().method()==='POST')reqs.push(r.status()+' '+r.url().slice(0,120))});
  await p.goto('https://staging.propagandaadv.com/contattaci/',{waitUntil:'networkidle'});
  // anchor test
  await p.getByRole('link',{name:/Vai al modulo/}).click(); await p.waitForTimeout(800);
  console.log('after anchor url', p.url());
  const f = p.locator('form.elementor-form');
  const names = await f.locator('input,textarea').evaluateAll(els=>els.map(e=>e.name+':'+e.type));
  console.log(JSON.stringify(names));
  const fill=async(sel,v)=>{const l=f.locator(sel).first(); if(await l.count()) await l.fill(v)};
  await fill('[name="form_fields[name]"]','TEST CLAUDE');
  await fill('[name="form_fields[email]"]','test-claude@example.com');
  await fill('[name="form_fields[field_d937fe4]"]','+390000000000');
  await fill('[name="form_fields[company]"], [name="form_fields[azienda]"]','TEST CLAUDE');
  await fill('textarea','TEST CLAUDE - invio di prova, ignorare');
  await Promise.all([ p.waitForURL('**/grazie/**',{timeout:20000}).catch(()=>{}), f.locator('button[type=submit]').click() ]);
  await p.waitForTimeout(3000);
  console.log('final url', p.url(), JSON.stringify({errs,reqs}));
  const msg = await p.locator('.elementor-message').allInnerTexts().catch(()=>[]); console.log('msg',JSON.stringify(msg));
  await b.close();
})();
