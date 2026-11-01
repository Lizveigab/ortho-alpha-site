const {test,expect}=require('@playwright/test');

const routes=[
 ['/',/Clínica Ortopédica especializada/i],
 ['/sobre',/ambiente também faz parte/i],
 ['/medicos',/Experiência técnica/i],
 ['/medicos/gabriel-abib',/Gabriel Lins Abib/i],
 ['/medicos/ricardo-queiroz',/Ricardo Gomes/i],
 ['/especialidades',/joelho em todas/i],
 ['/cirurgias',/Precisão em/i],
 ['/especialidades/artroscopia',/Artroscopia do joelho/i],
 ['/especialidades/reconstrucao-ligamentar',/Reconstrução do LCA/i],
 ['/especialidades/cirurgia-menisco',/Cirurgia de menisco/i],
 ['/especialidades/protese-joelho',/Prótese de joelho/i],
 ['/especialidades/medicina-regenerativa',/Medicina regenerativa/i],
 ['/especialidades/prp',/PRP no joelho/i],
 ['/especialidades/bloqueios-infiltracoes',/Bloqueios e infiltrações/i],
 ['/blog',/Informação para/i],
 ['/orientacoes',/Informação que acompanha/i],
 ['/contato',/Seu cuidado começa/i]
];

for(const [route,title] of routes){
 test('A rota '+route+' apresenta conteúdo próprio e FAQ',async({page})=>{
  await page.goto('./#'+route);
  await expect(page.locator('main h1').first()).toContainText(title);
  if(route!=='/'){
    await expect(page.locator('main .oa-page-faq details').first()).toBeAttached();
  }else{
    await expect(page.locator('main .at-faq details').first()).toBeAttached();
  }
 });
}

test('A hero carrega e o CTA abre o WhatsApp',async({page})=>{
 await page.goto('./#/');
 await expect(page.locator('.at-intro h1')).toContainText('técnica e o cuidado');
 const hero=page.locator('.at-intro-photo img');
 await expect(hero).toBeAttached();
 await expect.poll(()=>hero.evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
 await expect(page.locator('.at-intro .at-actions a').first()).toHaveAttribute('href',/^https:\/\/wa\.me\//);
});

test('O conteúdo não apresenta overflow horizontal relevante',async({page})=>{
 await page.goto('./#/');
 await expect(page.locator('main h1').first()).toBeAttached();
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
 expect(overflow).toBeLessThanOrEqual(2);
});

test('FAQ de especialidade permite expandir resposta',async({page})=>{
 await page.goto('./#/especialidades/artroscopia');
 const faq=page.locator('.oa-page-faq details').first();
 await faq.locator('summary').click();
 await expect(faq).toHaveAttribute('open','');
});

test('Blog abre artigo próprio',async({page})=>{
 await page.goto('./#/blog');
 await page.locator('.blogcards a').first().click();
 await expect(page).toHaveURL(/#\/blog\/dor-no-joelho-quando-procurar/);
 await expect(page.locator('.oa-article h2').first()).toBeAttached();
});

test('Menu mobile permite navegar e bloqueia scroll de fundo',async({page},testInfo)=>{
 test.skip(testInfo.project.name!=='mobile','Específico para dispositivos móveis');
 await page.goto('./#/');
 await page.getByRole('button',{name:'Abrir menu'}).click();
 const menu=page.getByRole('navigation',{name:'Navegação mobile'});
 await expect(menu).toBeVisible();
 await expect(page.locator('body')).toHaveCSS('overflow','hidden');
 await menu.locator('summary').click();
 await expect(menu.getByRole('link',{name:/Artroscopia do joelho/})).toBeVisible();
 await menu.getByRole('link',{name:/Artroscopia do joelho/}).click();
 await expect(page).toHaveURL(/#\/especialidades\/artroscopia/);
 await expect(menu).not.toBeVisible();
});

test('Menu mobile fecha pelo Escape',async({page},testInfo)=>{
 test.skip(testInfo.project.name!=='mobile','Específico para dispositivos móveis');
 await page.goto('./#/');
 await page.getByRole('button',{name:'Abrir menu'}).click();
 await page.keyboard.press('Escape');
 await expect(page.getByRole('navigation',{name:'Navegação mobile'})).not.toBeVisible();
});
