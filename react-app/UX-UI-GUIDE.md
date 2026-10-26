# Ortho Alpha — Sistema de UX/UI para a prévia React

Atualizado em 26/10/2026. Fonte da versão ativa: `react-app/src/reference.jsx` (referenciada por `react-app/index.html`). Não alterar `main.jsx` esperando que mude a prévia: não é a entrada ativa.

## Objetivo
Identidade editorial premium, clínica e legível, mantendo a escrita e a informação médica aprovadas no site oficial. Preservar a igualdade de destaque entre os dois especialistas. Não publicar esta prévia no domínio oficial antes da aprovação.

## Tokens de design
- Fonte: Plus Jakarta Sans, com fallback `system-ui, sans-serif`.
- Cor de texto principal: `#08273e`; azul profundo: `#05243d`; destaque: `#098cbd`.
- Contraste: verificar mínimo 4,5:1 para texto normal e 3:1 para texto grande (WCAG AA).
- Corpo do texto: 18 px desktop quando introdutório, 16 px para leitura, line-height 1.6–1.7.
- Texto secundário e notas: nunca abaixo de 14 px.
- H1: 64–78 px desktop, 39–50 px mobile; line-height 1.03–1.08.
- H2: 44–60 px desktop, 34–43 px mobile; line-height ~1.08.
- H3: 28–38 px desktop, 24–30 px mobile.
- Eyebrow: 14 px, peso 700–800, tracking 0.1–0.14em.
- CTA: 16 px e peso ~700, altura 52–56 px. Alvos de toque idealmente >=44x44 px.
- Container máximo: ~1290 px, com respiro nas laterais de ~22 px no mobile.
- Espaçamento de seções: 76–114 px no desktop; ~72–78 px no mobile.

## Navegação
- Cabeçalho incorporado à hero, não fixo, sem faixa branca inicial.
- Mobile: menu sobreposto em tela cheia, sem rolagem do conteúdo de fundo, fechamento no botão, em Escape ou ao navegar; conteúdo por trás não deve receber foco enquanto aberto.
- Setas e ícones vetoriais coerentes.

## Conteúdo
- Priorizar títulos e informações técnicas já aprovados em orthoalpha.com.br. Revisar somente duplicações, CTAs e clareza.
- Home: narrativa da clínica e equipe, hero editorial, anatomia, segunda opinião, especialidades, galeria, processo, FAQ e CTA.
- Sobre: história real dos sócios, fotos reais da clínica, diferenciais e FAQ.
- Médicos: hierarquia de informações equivalente e credenciais verdadeiras; não inventar RQE.
- Tratamentos: explicação anatômica, indicação, antes/durante/depois, limitações, FAQ específico e CTA.
- Blog: artigos navegáveis e informativos; não afirmar autoria médica ou revisão sem comprovação.
- Contato: WhatsApp, endereço, horários e acesso ao mapa.
- Convênios: não divulgar planos ou cobertura sem confirmação; a rota antiga redireciona para contato nesta prévia.

## Hero: direção de mídia futura
- Fotografia atual preservada na versão de testes. Não alegar que uma imagem ilustrativa genérica foi filmada em Alphaville.
- Se houver filmagem real aprovada: corrida em cenário reconhecível de Alphaville/Barueri, céu azul claro, luz natural e cores próximas à paleta da Ortho Alpha.
- Vídeo opcional de ~5–8 s, sem áudio, loop discreto; fazer poster WebP/AVIF, reduzir peso e oferecer alternativa estática e `prefers-reduced-motion`.
- Nunca sacrificar o LCP nem a legibilidade por efeito visual. Testar PageSpeed e dispositivos reais antes do lançamento.

## Validação
- Conferir 320, 360, 390, 430, 768, 1024 e 1440 px, além de zoom 200%.
- Validar menu, foco, teclas, todas as rotas, FAQ, artigos, links externos, contraste, CLS, LCP, recursos pesados e ausência de overflow horizontal.
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Prévia mantém `noindex,nofollow`; SEO final e URLs limpas pertencem à migração oficial.
