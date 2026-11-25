import {useEffect} from 'react';
const ROOT='https://lizveigab.github.io/ortho-alpha-site/react/';
const DESCRIPTIONS={
 '/':'Ortopedistas especialistas em joelho em Alphaville: LCA, menisco, artroscopia, prótese e PRP. Atendimento particular com reembolso. Agende pelo WhatsApp.',
 '/sobre':'Conheça os ambientes reais da Ortho Alpha, nossa abordagem e os profissionais de cirurgia do joelho em Alphaville.',
 '/medicos':'Conheça Dr. Gabriel Lins Abib e Dr. Ricardo Gomes da Silva Queiroz, equipe médica da Ortho Alpha.',
 '/especialidades':'Artroscopia, reconstrução ligamentar, menisco, prótese de joelho e opções não cirúrgicas em Alphaville.',
 '/cirurgias':'Conheça as cirurgias do joelho realizadas pelos médicos da Ortho Alpha. A indicação depende de avaliação.',
 '/blog':'Informações e conteúdos educativos sobre saúde e cirurgia do joelho.',
 '/orientacoes':'Orientações gerais para preparo, avaliação e acompanhamento em tratamentos do joelho.',
 '/contato':'Contato, localização e WhatsApp da Ortho Alpha em Alphaville, Barueri.'
};
const LABELS={
 '/':'Ortopedia especializada em joelho',
 '/sobre':'A clínica',
 '/medicos':'Equipe médica',
 '/especialidades':'Especialidades',
 '/cirurgias':'Cirurgias do joelho',
 '/blog':'Blog de ortopedia',
 '/orientacoes':'Orientações ao paciente',
 '/contato':'Agende sua avaliação'
};
const SPECIAL={
 'protese-joelho':'Prótese de joelho',
 'reconstrucao-ligamentar':'Reconstrução do LCA',
 'cirurgia-menisco':'Cirurgia de menisco',
 'artroscopia':'Artroscopia de joelho',
 'medicina-regenerativa':'Medicina regenerativa',
 'bloqueios-infiltracoes':'Bloqueios e infiltrações',
 'prp':'PRP no joelho'
};
const ARTICLE_TITLES={
 'dor-no-joelho-quando-procurar':'Dor no joelho: quando procurar um especialista?',
 'lca-quando-definir-tratamento':'Lesão do LCA: como definir o tratamento?',
 'lesao-menisco-cirurgia':'Lesão de menisco: cirurgia é sempre necessária?',
 'protese-joelho-duvidas':'Prótese de joelho: principais dúvidas'
};
const ensure=(selector,tag,attributes)=>{
 let el=document.head.querySelector(selector);
 if(!el){el=document.createElement(tag);Object.entries(attributes).forEach(([k,v])=>el.setAttribute(k,v));document.head.appendChild(el);}
 return el;
};
export default function RouteSeo({route}){
 useEffect(()=>{
  let title=LABELS[route]||ARTICLE_TITLES[route.split('/').pop()]||SPECIAL[route.split('/').pop()]||(/\/medicos\/gabriel/.test(route)?'Dr. Gabriel Lins Abib':/\/medicos\/ricardo/.test(route)?'Dr. Ricardo Queiroz':'Ortho Alpha');
  const SPECIAL_DESC={
   'artroscopia':'Artroscopia do joelho em Alphaville com cirurgiões especialistas em joelho. Entenda indicação, recuperação e agende sua avaliação.',
   'reconstrucao-ligamentar':'Reconstrução do LCA em Alphaville e Barueri: avaliação da instabilidade, cirurgia quando indicada e retorno seguro ao esporte.',
   'cirurgia-menisco':'Lesão de menisco em Alphaville: avaliação, tratamento sem cirurgia quando possível e cirurgia com foco em preservar o menisco.',
   'protese-joelho':'Prótese de joelho em Alphaville: prótese total ou parcial para artrose avançada, com planejamento individual e treinamento internacional.',
   'medicina-regenerativa':'Medicina regenerativa no joelho em Alphaville: PRP, BMA e ácido hialurônico com indicação individual e conversa clara sobre limites.',
   'prp':'PRP no joelho em Alphaville: quando é indicado, como funciona e o que esperar. Avaliação com especialista em joelho.',
   'bloqueios-infiltracoes':'Infiltração e bloqueio no joelho em Alphaville para controle da dor e da inflamação, com indicação após avaliação médica.'
  };
  let desc=(route.startsWith('/especialidades/')&&SPECIAL_DESC[route.split('/').pop()])||DESCRIPTIONS[route]||(route.startsWith('/blog/')?'Conteúdo educativo sobre diagnóstico, tratamentos e saúde do joelho em Alphaville.':'Atendimento especializado em ortopedia do joelho, diagnóstico e tratamentos individualizados em Alphaville.');
  const slug=route.split('/').pop();
  const seoTitle=route==='/'?'Ortopedista especialista em joelho em Alphaville':SPECIAL[slug]&&route.startsWith('/especialidades/')?SPECIAL[slug]+' em Alphaville e Barueri':route.startsWith('/medicos/')?title+' — cirurgião de joelho em Alphaville':route==='/contato'?'Agende sua consulta com especialista em joelho em Alphaville':title;
  document.title=seoTitle+' | Ortho Alpha';
  document.documentElement.lang='pt-BR';
  ensure('meta[name="description"]','meta',{name:'description'}).setAttribute('content',desc);
  ensure('meta[property="og:title"]','meta',{property:'og:title'}).setAttribute('content',title+' | Ortho Alpha');
  ensure('meta[property="og:description"]','meta',{property:'og:description'}).setAttribute('content',desc);
  ensure('meta[property="og:type"]','meta',{property:'og:type'}).setAttribute('content','website');
  ensure('meta[name="twitter:card"]','meta',{name:'twitter:card'}).setAttribute('content','summary_large_image');
  const official=/(^|\.)orthoalpha\.com\.br$/.test(location.hostname);
  const base=official?location.origin+'/':ROOT;
  ensure('meta[property="og:image"]','meta',{property:'og:image'}).setAttribute('content',base+'assets/og-ortho-alpha.jpg');
  ensure('meta[property="og:locale"]','meta',{property:'og:locale'}).setAttribute('content','pt_BR');
  ensure('meta[property="og:site_name"]','meta',{property:'og:site_name'}).setAttribute('content','Ortho Alpha');
  /* Only the official domain may be indexed; the GitHub Pages prototype stays out of Google to avoid duplicate content. */
  ensure('meta[name="robots"]','meta',{name:'robots'}).setAttribute('content',official?'index,follow':'noindex,nofollow');
 },[route]);
 return null;
}
