# Auditoria integral — Ortho Alpha
**Data:** 01/11/2026 · **Escopo:** prévia `https://lizveigab.github.io/ortho-alpha-site/react/`, repositório `Lizveigab/ortho-alpha-site` e comparação editorial com `https://www.orthoalpha.com.br/`.

> **Método e limites:** análise do código React/CSS/HTML, das imagens e arquivos no GitHub e das capturas mobile/desktop fornecidas nas conversas. Não houve auditoria Lighthouse real com pontuação medida nem inspeção visual ao vivo de todas as rotas nesta execução. Os itens abaixo distinguem fatos confirmados por código, sintomas vistos em captura e verificações pendentes. A prévia não deve ser confundida com o site oficial.

## 1. Síntese executiva
**Positivos:** identidade reconhecível (azul profundo/ciano, Plus Jakarta Sans), fotos reais da clínica e dos dois médicos, layout de especialidades interativo, CTAs de agendamento por WhatsApp, FAQ personalizada e explicação de antes/durante/depois dos 7 tratamentos, responsividade CSS existente, prévia React no GitHub Pages com deploy por GitHub Actions. O conteúdo técnico do site oficial serve de referência e deve ser aprovado pelos médicos.

**Prioridades:** (P0 = pode comprometer publicação, confiança ou funcionamento; P1 = alto impacto de UX/conversão/performance; P2 = refinamento relevante.)

| Prioridade | Área | Evidência e risco | Ação sugerida |
| --- | --- | --- | --- |
| P0 | Teste de regressão | Antes desta auditoria, nenhum smoke test de navegação/mobile fazia parte do repositório; alterações de CSS já quebraram áreas visuais na prévia | Usar workflow `ortho-quality.yml` e analisar resultados de Playwright em desktop e mobile |
| P0 | Publicidade médica | Clínica e conteúdo médico devem exibir registros e qualificações corretamente; confirmar RQE do Dr. Ricardo e responsável técnico da pessoa jurídica, sem inventar dados | Revisão clínica e jurídica da comunicação conforme CFM 2.336/2023 |
| P0 | Blog médico | Quatro artigos têm texto editorial inicial e não exibem referências, data e revisor médico | Revisar os artigos, criar autoria/CRM/RQE quando aplicáveis, atualizar referências, aprovação médica antes do lançamento |
| P1 | Hero desktop | Capturas mostram conflito entre rosto da corredora e menu transparente; o JSX ainda usa `lifestyle-corrida.webp`, não a nova imagem gerada | Reenquadrar/implantar imagem aprovada com `picture` desktop/mobile; validar em 1366, 1440, 1920 px |
| P1 | Hero mobile | Título institucional longo, botões empilhados e foto muito abaixo em capturas anteriores | Composição própria para mobile, títulos por linha mais controlados e CTA visível sem rolagem excessiva |
| P1 | Tipografia | 84 declarações de `font-size` inferiores a 14 px em CSS antigos; a camada nova tenta sobrepor várias. **Não significa que 84 textos estejam renderizados abaixo de 14 px** | Consolidar estilos, testar tamanho computado e zoom 200% |
| P1 | CSS acumulado | 7 arquivos CSS de origem + 326 ocorrências de `!important` | Refatorar para tokens, componentes, responsabilidades por arquivo; reduzir sobrescritas |
| P1 | Imagens | Fotos da clínica com 650 KB–1,05 MB; miniaturas reutilizam arquivos grandes | Variantes menores, `srcset`, `sizes`, dimensionamento e carregamento preguiçoso |
| P1 | URLs/SEO futuro | Prévia usa rotas `#/...`, `noindex`, SEO atualizado em runtime | Antes de migrar para domínio oficial, escolher rotas indexáveis e implementar sitemap, canonical e OG |
| P1 | Roteamento inválido | No `App`, rotas desconhecidas retornam a Home; visita direta a `#/convenios` não dispara o redirecionamento inicial da mesma forma que mudanças de hash | Criar página 404 e tratar rotas legadas tanto no carregamento inicial como no `hashchange` |
| P1 | Publicação GitHub | Há dois workflows com capacidade de escrever arquivos e publicar; deploy existente faz commit dos artefatos na `main` e não possui passo de QA antes da publicação | Testar QA primeiro, consolidar a estratégia de deploy e adicionar concorrência/controle de permissões com segurança |
| P2 | Atratividade local | Imagem gerada de corrida é cenário conceitual, não fotografia identificável de Alphaville | Se a localização real for promessa visual, fotografar/filmar região com autorização; não apresentar IA como registro local |
| P2 | Navegação/CTA | Botões de seleção de especialidade usam seta externa ↗, sugerindo navegação, mas trocam conteúdo na própria página | Diferenciar estado selecionado de link para detalhe; padronizar rótulos |
| P2 | Hero/galeria | Camadas de gradiente, blur, animação e galeria pesada podem causar custo de paint | Reduzir filtros custosos no mobile, medir LCP/INP/CLS em aparelhos reais |
| P2 | Metadados | `react-app/index.html` não inclui favicon e a prévia não possui imagem OG específica | Criar favicon/marca social, completar metadados para o lançamento |
| P2 | Analytics | GTM aparece no domínio atual; não confirmei configuração de eventos no React | Planejar mensuração de CTA WhatsApp, especialidades, blog e conversões com GA4/GTM no domínio oficial |

## 2. Auditoria por página
**Home:** conservar título institucional aprovado, apresentação equilibrada dos médicos, atlas do joelho, galeria real, FAQ e CTA. Rever altura/crop do banner, topo da corredora, overlay, cards do hero, sequência de seções, repetição de CTAs e peso de imagens. Diferenciar interação de seleção nas especialidades. Mobile: testar menu aberto com scroll lock, foco, layout 320–430 px e contraste nos cards de vidro.

**A clínica `#/sobre`:** estrutura e história já presentes. Dar mais protagonismo às fotos reais, à origem dos médicos e à metodologia de consulta; evitar repetir a Home. Verificar nitidez do acervo e qualidade do crop. FAQ sobre a clínica pode ficar antes do CTA final.

**Equipe `#/medicos`:** foto e texto com mesma hierarquia para Gabriel/Ricardo; nomes de tamanhos diferentes devem alinhar CTAs; mostrar CRM e RQE somente verificados. A informação institucional de "especialista" depende de confirmação do registro profissional.

**Páginas dos médicos:** preservar formação e áreas de atuação verificadas; conferir currículos com os profissionais antes do lançamento. Aprovar biografias, CRM/RQE, fotografias e correspondência das especialidades listadas; revisão mobile do H1 com nome longo. Exibir CTA de agendamento e FAQ sem redundância.

**Especialidades `#/especialidades`:** catálogo útil, mas a classificação entre cirúrgico/não cirúrgico deve ser clara; tratamento de imagem sem indicar que um resultado é garantido. Usar fotos/diagramas específicos e permitir acesso rápido à descrição. A FAQ já existe no componente React.

**Cirurgias `#/cirurgias`:** enfatizar indicação, alternativas e preparo/recuperação; texto e imagens diferentes da listagem geral. Não tratar bloqueios/infiltrações ou PRP como cirurgia.

**Artroscopia:** conferir correção do diagrama, critérios de indicação, procedimento, recuperação, FAQ e cuidados.
**Reconstrução do LCA:** validar material sobre enxerto, exames, reabilitação e retorno aos esportes por critérios funcionais.
**Menisco:** distinguir reparo/meniscectomia seletiva e alternativas conservadoras; revisar ilustração e cronologia.
**Prótese de joelho:** distinguir total/unicompartimental e planejamento; evitar promessas de prazo ou durabilidade.
**Medicina regenerativa:** esclarecer limites das evidências; não prometer regeneração de cartilagem.
**PRP:** material específico sobre indicação, coleta/preparo e incertezas; não confundir com BMA ou ácido hialurônico.
**Bloqueios e infiltrações:** revisar classificação "controle da dor", agentes utilizados, contraindicações e orientações.

**Blog `#/blog`:** quatro artigos com rotas próprias; falta estrutura editorial publicável: autor/revisor médico, data/revisão, fontes verificáveis, metadados específicos, índice e artigos adicionais originais. A galeria de fotos do Instagram é institucional e não está sincronizada.

**Orientações `#/orientacoes`:** valor educativo, mas separar instruções universais de protocolos clínicos individualizados. Não substituir alta médica; usar perguntas comuns e avisos de segurança.

**Contato `#/contato`:** telefone, endereço, horários e link para Google Maps estão presentes. Verificar os links, responsividade, legibilidade, real disponibilidade, esquema de medição de conversão. Evitar afirmar tempo de resposta garantido sem confirmação operacional.

## 3. Acessibilidade e design system
- Plus Jakarta Sans; corpo 16–18 px, pequenos textos 14 px ou mais; H1 40–48 px mobile/64–72 px desktop como referência, não regra rígida.
- Alvos interativos com área de pelo menos 44 × 44 px, foco visível, labels acessíveis e contraste adequado.
- Contraste WCAG AA: 4,5:1 para texto normal, 3:1 para texto grande; aferir com testes reais, em especial sobre fotos e glassmorphism.
- Navegação por teclado: foco inicial no menu aberto, sequência e retorno ao botão; não apenas bloqueio de rolagem.
- FAQ com `details/summary` é um bom padrão; testar leitor de tela e foco.
- Testar `prefers-reduced-motion`; JS de efeito de movimento não deve criar scroll jump ou travar a página.
- Hero com `object-fit:cover`: comparar crop real em diferentes proporções. Preferir imagem preparada com espaço superior, não depender só de `object-position`.
- Evitar repetição visual: duas seções de grande título seguidas podem cansar a navegação no mobile.

## 4. Performance / engenharia
**Fatos de repositório:** Vite 5.4.11, React 18.3.1, Node 22 no workflow, CSS produzido ~114 KB, bundle JS produzido ~215 KB na compilação consultada anteriormente (os valores variam com novos builds). Fotos de ambiente são os maiores arquivos de mídia encontrados; há cópias idênticas em `assets/` e `react/assets/` por exigência do método atual de publicação. Não há `package-lock.json` rastreado, e o deploy atual usa `npm install` em vez de `npm ci`.

**Ações:**
1. Diminuir peso de foto e usar `srcset/sizes` para hero e galeria.
2. Manter `fetchPriority=high` apenas no hero, e `loading=lazy` nas mídias abaixo da dobra.
3. Limpar CSS morto e reduzir sobrescritas; preservar animações que tenham valor.
4. Auditar importação de fontes (pesos estritamente usados e `font-display`).
5. Considerar `package-lock.json` e `npm ci` para builds reproduzíveis.
6. Rodar Lighthouse/PSI e testar Core Web Vitals reais; metas indicativas: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1. **Não foram medidos aqui.**
7. Validar a entrega em conexões móveis mais lentas e economia de dados.

## 5. SEO, conteúdo e confiabilidade
- **Prévia:** `noindex,nofollow` é proposital e deve continuar até a aprovação.
- **Lançamento:** migrar hash-routing para URLs indexáveis, definir domínio/canonical, sitemap.xml, robots.txt, meta OG/Twitter, dados estruturados apropriados, breadcrumbs e Search Console.
- **Conteúdo:** usar diagnóstico do site atual como referência; revisão médica obrigatória, especialmente sobre PRP/BMA, artroplastia, tempos de retorno e resultados.
- **Credenciais:** confirmar situação de CRM/RQE, responsável técnico e identificações exigidas em publicidade de pessoa jurídica (CFM). Não presumir RQE ausente.
- **Antes/depois:** fotos de pacientes apenas com consentimento e sob critérios educativos do CFM, abrangendo possíveis resultados não satisfatórios e riscos; não usar imagens alteradas artificialmente para simular resultados.
- **Reembolso/convênios:** o site oficial possui linguagem de reembolso integral ou parcial; confirmar a realidade de cada plano e evitar sugerir cobertura garantida na nova versão.
- **LGPD e analytics:** definir política de privacidade, governança de dados dos formulários ou de eventos e consentimento quando aplicável; não colocar dados de pacientes nos eventos.

## 6. Plano de implementação sugerido
| Fase | Entrega | Critério de aceitação |
| --- | --- | --- |
| 0 — Qualidade automatizada | Workflow GitHub Actions + Playwright | QA executado em push/PR e manualmente; relatório e screenshots disponíveis |
| 1 — Layout base | Header mobile, H1 responsivo, tokens, CSS limpo | Sem overflow em 320, 390, 430, 768, 1440 px e sem texto funcional abaixo de 14 px |
| 2 — Home | Hero sem rosto sob menu, cards legíveis, mídia optimizada | Aprovação visual em desktop/mobile; LCP medido |
| 3 — Páginas internas | Equipe, clínica, tratamentos e FAQ | Todas as páginas com conteúdo distintivo, revisão médica e links íntegros |
| 4 — Blog & conversão | Artigos completos, autoria, CTA e mensuração | Artigos aprovados e eventos testados |
| 5 — Publicação oficial | SEO indexável, 301, Search Console e checagens finais | Aprovação explícita para migrar do GitHub Pages para o domínio principal |

## 7. GitHub Actions: configuração atual
- `.github/workflows/ortho-react-preview.yml` **já publica automaticamente** ao receber alterações em `react-app/**` na branch `main`, gerando `react/` e publicando a pasta.
- `.github/workflows/import-ortho-visuals.yml` também pode gerar/publicar assets, quando executado manualmente ou quando sua definição é atualizada.
- `.github/workflows/ortho-quality.yml` foi adicionado em 01/11/2026: faz build, copia assets e executa testes Playwright de rotas, FAQ, menu mobile, hero, overflow e blog. Roda em push/PR e manualmente, com permissão de leitura e relatórios anexados. **Não modifica a página oficial nem impede o deploy enquanto não for integrado como gate**.
- O mesmo workflow possui um job **Lighthouse mobile (relatório informativo)** que coleta performance, acessibilidade e boas práticas, salva relatórios HTML/JSON em `lighthouse-report/` e usa alertas sem bloquear a prévia. SEO foi excluído da pontuação automática porque a prévia está, corretamente, com `noindex`.
- A bateria Playwright também captura telas de Home, Sobre, Equipe, Artroscopia, Blog e Contato em desktop/mobile, e menu aberto no mobile. As capturas são anexadas aos relatórios e não constituem aprovação visual automática.
- Para consultar os testes: repositório → aba **Actions** → **Ortho Alpha - UX e QA (desktop e mobile)** → selecionar execução → `Artifacts`.
- Para rodar manualmente: **Actions** → selecionar workflow → **Run workflow**.
- Não editar secrets manualmente sem necessidade. As verificações atuais não exigem chaves secretas.
- Fase posterior: se os testes estiverem estáveis, exigir status verde antes do deploy e unificar deploys, sem alterar a hospedagem oficial.

## 9. Resultados medidos: Lighthouse de laboratório (01/11/2026)
**Fonte:** execução GitHub Actions `41343815986`, navegador Chrome headless, emulação mobile, build React servido localmente. São números de **simulação local**, não Core Web Vitals de usuários reais nem PageSpeed do domínio oficial.

| Métrica | Resultado | Interpretação |
| --- | --- | --- |
| Performance | **77/100** | Abaixo do limite desejado de 85 |
| Acessibilidade | **94/100** | Boa base, mas há falhas concretas |
| Boas práticas | **96/100** | Boa base; há alerta de console |
| SEO | **63/100** | Prévia bloqueada por `noindex` de propósito, portanto não usar a nota como avaliação do SEO final |
| FCP | **1,7 s** | Inicial satisfatório no teste |
| LCP | **3,8 s** | Acima da meta de 2,5 s |
| TBT | **110 ms** | Bom resultado para bloqueio de thread principal |
| CLS | **0,214** | Acima da meta de 0,1 |
| Render blocking | Aproximadamente **450 ms** de economia potencial apontada | CSS e fontes atrasam a renderização |
| Entrega de imagens | Aproximadamente **263 KiB** de economia potencial | Imagem hero e retratos com resoluções maiores do que o necessário |

**Causas apontadas pelo Lighthouse:**
- **CLS:** o carregamento de `Plus Jakarta Sans` desloca conteúdo da Home, gerando o deslocamento registrado. Usar fallback metricamente compatível, ajustar quebras do H1 e considerar distribuição de fontes de forma otimizada.
- **LCP:** elemento principal é a imagem `lifestyle-corrida.webp`, com cerca de 3,8 s; a requisição não é descoberta diretamente no HTML inicial porque a imagem é criada pelo React. Incluir preload do recurso correto e versões responsivas, sem carregar imagem inutilmente.
- **Imagens:** hero de 1300×1152 exibido em tamanho inferior no mobile, com economia potencial calculada em ~220 KiB no item específico; retratos de ambos os médicos também podem ser reduzidos.
- **Contraste:** rótulo `ALPHAVILLE · BARUERI` foi medido em ~4,45:1 (mínimo 4,5:1); rótulo dos médicos em ~3,85:1; escurecer o ciano dos textos menores.
- **Acessibilidade:** botões numéricos 01/02/03 do atlas têm nome acessível sem os números visíveis; ajustar `aria-label` para incluir o texto visível ou usar `aria-labelledby`.
- **Hierarquia:** títulos do footer aparecem em `h4` após estruturas anteriores sem nível hierárquico adequado; corrigir sequência de headings.
- **Console:** `/favicon.ico` retorna 404; adicionar favicon real e link no `index.html`.
- **CSS:** Lighthouse estima ~11 KiB de CSS não utilizado na navegação analisada; remover regras legadas com atenção às páginas internas.

Esses são **achados medidos**, mais confiáveis que suposições baseadas apenas no código, mas dependem do ambiente de testes.

[Execução GitHub Actions e relatório Lighthouse](https://github.com/Lizveigab/ortho-alpha-site/actions/runs/41343815986)

## 10. Fontes de padrões e normas
- CFM 2.336/2023: https://publicidademedica.cfm.org.br/manual/
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Web Vitals: https://web.dev/explore/learn-core-web-vitals
- Vite GitHub Pages: https://vite.dev/guide/static-deploy
- GitHub Actions: https://docs.github.com/en/actions
