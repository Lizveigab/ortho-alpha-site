# Ortho Alpha — prévia integrada revisada

Site estático de prévia para revisão do projeto antes da publicação no domínio oficial. Esta revisão aproxima **a home HTML** do layout visual aprovado: hero de clínica em tela ampla, sequência branco / azul-marinho, anatomia do joelho, ambientes originais, retratos oficiais, grade de seis especialidades, FAQ e footer.

## Ver localmente

Abra `index.html` e utilize os links do menu. A página inicial carrega com as fotos no primeiro paint; páginas internas, páginas dos médicos, especialidades e blog estão integradas. Para testes mais confiáveis de navegação entre páginas e comportamento de scripts, hospede a pasta em um servidor estático (por exemplo, GitHub Pages).

## GitHub Pages

1. Crie um repositório novo e exclusivo, por exemplo `ortho-alpha-site`.
2. Faça upload do **conteúdo** do ZIP na raiz do repositório (`index.html` precisa ficar na raiz).
3. Acesse **Settings → Pages**, selecione **Deploy from a branch**, branch `main`, pasta `/(root)` e salve.
4. Confira o endereço de prévia exibido pelo GitHub. **O domínio oficial não precisa ser alterado para testar.**

## Arquitetura

- Home `index.html` (nova versão visual fiel) e CSS adicional `assets/premium.css`.
- Sobre `sobre.html`, perfis em `medicos/`, serviços em `especialidades/`, blog em `blog/`, contato em `contato.html`, convênios em `convenios.html`.
- Fotografia da clínica e retratos dos dois médicos: **imagens originais**, sem alteração de rostos ou criação de novas instalações.
- Ilustração anatômica e imagem de corrida: **arte ilustrativa extraída dos conceitos visuais**, não foto real da clínica ou registro médico.
- Símbolo circular Ortho Alpha original em menu e elementos gráficos, sem redesenhar o logo.

## Limites da prévia

- Os mockups iniciais eram **imagens conceituais**, com consultórios e elementos gráficos em parte imaginados; o HTML preserva as proporções e a linguagem, substituindo esses ambientes pelas fotografias verdadeiras. Por isso a equivalência não é pixel a pixel.
- Este protótipo **não** foi publicado em GitHub nem no site existente. Precisa de um repositório novo para uma URL online.
- Instagram: **galeria editorial**, não um feed automático. Uma integração autorizada é necessária para puxar novos posts.
- Conteúdos clínicos, currículos, RQE e dados de atendimento precisam de conferência pela clínica; política de privacidade é provisória.
- Avaliações reais devem ser inseridas somente após verificação e autorização. Nenhum depoimento foi inventado.
- Site sinalizado com `noindex,nofollow`, mas **GitHub Pages público não restringe acesso** a quem tiver o link.