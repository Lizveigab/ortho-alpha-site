const {defineConfig,devices}=require('@playwright/test');

module.exports=defineConfig({
 testDir:'./tests',
 testMatch:'**/*.spec.cjs',
 timeout:30000,
 expect:{timeout:9000},
 retries:process.env.CI?1:0,
 workers:process.env.CI?2:undefined,
 reporter:[['line'],['html',{open:'never',outputFolder:'playwright-report'}]],
 use:{
  baseURL:'http://127.0.0.1:4173/ortho-alpha-site/react/',
  screenshot:'only-on-failure',
  trace:'retain-on-failure'
 },
 projects:[
  {name:'desktop',use:{...devices['Desktop Chrome'],viewport:{width:1440,height:900}}},
  {name:'mobile',use:{...devices['iPhone 13'],browserName:'chromium'}}
 ],
 webServer:{
  command:'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',
  url:'http://127.0.0.1:4173/ortho-alpha-site/react/',
  reuseExistingServer:!process.env.CI,
  timeout:60000
 }
});