const {chromium} = require('@playwright/test');
const fs = require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
 for (const [name,width,height] of [['iphone',390,844],['desktop',1440,900]]){
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
  const response=await page.goto('http://127.0.0.1:4173/bio/',{waitUntil:'domcontentloaded'});
  if(response.status()!==200)throw Error('Bio page status '+response.status());
  await page.locator('.oa-loader').waitFor({state:'detached',timeout:5000});
  const checks={
   doctorCards:await page.locator('.doctor-card').count(),
   services:await page.locator('.service-card').count(),
   mapFrame:await page.locator('.location-map iframe').count(),
   floatingWhatsApp:await page.locator('a.whatsapp-floating').count(),
   socialLinks:await page.locator('.social-actions a').count()
  };
  if(checks.doctorCards!==2 || checks.services!==4 ||checks.mapFrame!==1||checks.floatingWhatsApp!==1||checks.socialLinks!==3)throw Error(name+': unexpected structure '+JSON.stringify(checks));
  const gabriel=page.locator('.doctor-card').first().locator('img');
  const photoSource=await gabriel.getAttribute('src');
  if(!photoSource.includes('bio/assets/dr-gabriel-2026.webp'))throw Error('Wrong Gabriel photo URL');
  const booking=await page.locator('.booking-link').count();
  if(booking!==9)throw Error(name+': expected nine booking links, found '+booking);
  const hrefs=await page.locator('.booking-link').evaluateAll(nodes=>nodes.map(n=>n.href));
  if(!hrefs.every(u=>decodeURIComponent(u).includes('Vim pelo Instagram')))throw Error('WhatsApp tracking attribution missing');
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
  if(overflow>3)throw Error(name+': horizontal overflow '+overflow);
  await page.screenshot({path:'bio/qa-'+name+'.png',fullPage:true,animations:'disabled'});
  console.log(JSON.stringify({name,...checks,booking,overflow,photoSource}));
  await page.close();
 }
 }finally{await browser.close()}
})().catch(e=>{console.error(e.stack||String(e));process.exit(1)});
