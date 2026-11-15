# Publicar o Link na Bio no domínio oficial (sem substituir o site)

## Estado do trabalho
A página e seus arquivos estão versionados no GitHub:
- Fonte: `bio/index.html`
- Imagem nova do Gabriel: `bio/assets/dr-gabriel-2026.webp`
- Ícone WhatsApp fornecido: `bio/assets/whatsapp-original.webp`
- Prévia pública: https://lizveigab.github.io/ortho-alpha-site/bio/

## Por que o domínio oficial ainda precisa ser ligado
O domínio `www.orthoalpha.com.br` apresenta outro site, enquanto este repositório GitHub Pages não tem `CNAME` para esse domínio. Publicar no GitHub **não publica automaticamente** em `https://www.orthoalpha.com.br/bio/`.

**Não** crie um CNAME apontando todo o domínio para GitHub Pages: isso pode substituir/desconfigurar o site atual.

## Opção recomendada: Cloudflare Worker só no /bio
Usar `bio/cloudflare-worker.mjs` para servir a página no endereço:
**https://www.orthoalpha.com.br/bio/**

A página já usa assets absolutos para que continue carregando as fotos e o logo mesmo com essa rota.

1. Entrar na conta Cloudflare responsável pelo domínio `orthoalpha.com.br`.
2. Ir a **Workers & Pages** → criar Worker → editar código. Colar o arquivo `bio/cloudflare-worker.mjs`.
3. Salvar e fazer deploy do Worker.
4. No Worker, acessar **Settings / Domains & Routes** → adicionar rota `www.orthoalpha.com.br/bio*` associada à zona correta.
5. Opcionalmente adicionar rota `orthoalpha.com.br/bio*` (se o domínio raiz não redirecionar automaticamente para `www`).
6. Verificar que `/bio/` retorna a página nova, que `/bio` redireciona para `/bio/` e que `/` e outras páginas continuam exatamente iguais.
7. Confirmar visualmente em iPhone/Android e testar todos os links WhatsApp/Instagram/Maps.

**Requer acesso/autorização à zona DNS/Workers do Cloudflare.** Sem esse acesso, nenhum commit no GitHub instala a rota de produção.

## Testes de aceite
- Foto atualizada do Dr. Gabriel; foto do Dr. Ricardo preservada.
- WhatsApp flutuante com imagem do ícone fornecido e frase `Vim pelo Instagram`.
- Mensagens personalizadas dos dois médicos e serviços.
- Mapa interativo da Av. Copacabana, 112, sala 1507, Edifício Medic Life, Alphaville.
- Link fornecido pela cliente: https://share.google/NXHybok1IGo6yy4pV
- Site oficial, Instagram e traçar rota.
- Loader e animações respeitando `prefers-reduced-motion`.
- O site oficial permanece sem outras alterações.
