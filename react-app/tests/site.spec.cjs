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

test('Gerar capturas visuais para revisão do design',async({page},testInfo)=>{
 test.setTimeout(90000);
 const pages=[
  ['/', 'home'],
  ['/sobre','clinica'],
  ['/medicos','equipe'],
  ['/especialidades/artroscopia','tratamento-artroscopia'],
  ['/blog','blog'],
  ['/contato','contato']
 ];
 for(const [route,name] of pages){
  await page.goto('./#'+route);
  await expect(page.locator('main h1').first()).toBeAttached();
  await page.screenshot({path:testInfo.outputPath('visual-'+testInfo.project.name+'-'+name+'.png'),animations:'disabled'});
 }
 if(testInfo.project.name==='mobile'){
  await page.goto('./#/');
  await page.getByRole('button',{name:'Abrir menu'}).click();
  await page.screenshot({path:testInfo.outputPath('visual-mobile-menu-aberto.png'),animations:'disabled'});
 }
});

test('Contato tem mapa incorporado, identificação da clínica e CTA com contraste próprio',async({page})=>{
 await page.goto('./#/contato');
 const map=page.getByRole('iframe',{name:/Mapa da Ortho Alpha/});
 await expect(map).toBeVisible();
 await expect(map).toHaveAttribute('src',/maps\.google\.com\/maps\?q=/);
 const buttons=page.locator('.oa-contact-actions>a');
 await expect(buttons).toHaveCount(2);
 await expect(buttons.nth(0)).toHaveAttribute('href',/^https:\/\/wa\.me\//);
 await expect(buttons.nth(1)).toHaveAttribute('href',/google\.com\/maps\/search/);
 const first=await buttons.nth(0).boundingBox(),second=await buttons.nth(1).boundingBox();
 expect(first).toBeTruthy();expect(second).toBeTruthy();
 const separated= first.y+first.height<=second.y-9 || second.x>=first.x+first.width+9;
 expect(separated).toBeTruthy();
});
test('Blog apresenta cards com metadados, padding e Instagram',async({page})=>{
 await page.goto('./#/blog');
 const cards=page.locator('.oa-blog-card');
 await expect(cards).toHaveCount(4);
 const card=cards.first();
 await expect(card.locator('.oa-blog-card-media img')).toBeVisible();
 await expect(card.locator('.oa-blog-card-meta')).toContainText('min de leitura');
 await expect(card.locator('.oa-blog-more')).toBeVisible();
 await expect(page.getByRole('link',{name:/Acompanhar o Instagram/})).toHaveAttribute('href',/instagram\.com\/orthoalpha\.ortopedia/);
 const pad=await card.locator('.oa-blog-card-body').evaluate(node=>getComputedStyle(node).paddingLeft);
 expect(parseFloat(pad)).toBeGreaterThanOrEqual(20);
});
test('Leitor consegue avaliar artigo e encontrar Instagram da clínica',async({page})=>{
 await page.goto('./#/blog/dor-no-joelho-quando-procurar');
 await expect(page.getByRole('progressbar',{name:'Progresso de leitura'})).toBeVisible();
 await expect(page.locator('.oa-article-utility')).toContainText('min de leitura');
 const feedback=page.getByRole('region',{name:'Avaliar este artigo'});
 await feedback.getByRole('button',{name:'4 estrelas'}).click();
 await expect(feedback.getByRole('status')).toContainText('salva neste navegador');
 await expect(feedback.getByRole('button',{name:'4 estrelas'})).toHaveAttribute('aria-pressed','true');
 await page.reload();
 await expect(page.getByRole('button',{name:'4 estrelas'})).toHaveAttribute('aria-pressed','true');
 await expect(page.getByRole('link',{name:/Ver @orthoalpha.ortopedia/})).toHaveAttribute('href',/instagram\.com\/orthoalpha\.ortopedia/);
 await expect(page.locator('.oa-instagram-photos img')).toHaveCount(3);
});
