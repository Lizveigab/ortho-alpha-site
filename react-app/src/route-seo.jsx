import {useEffect} from 'react';
const ROOT='https://lizveigab.github.io/ortho-alpha-site/react/';
const DESCRIPTIONS={
 '/':'Ortho Alpha: cirurgia do joelho, avaliação individualizada e atendimento especializado em Alphaville, Barueri.',
 '/sobre':'Conheça os ambientes reais da Ortho Alpha, nossa abordagem e os profissionais de cirurgia do joelho em Alphaville.',
 '/medicos':'Conheça Dr. Gabriel Lins Abib e Dr. Ricardo Gomes da Silva Queiroz, equipe médica da Ortho Alpha.',
 '/especialidades':'Artroscopia, reconstrução ligamentar, menisco, prótese de joelho e opções não cirúrgicas em Alphaville.',
 '/cirurgias':'Conheça as cirurgias do joelho realizadas pelos médicos da Ortho Alpha. A indicação depende de avaliação.',
 '/blog':'Informações e conteúdos educativos sobre saúde e cirurgia do joelho.',
 '/contato':'Contato, localização e WhatsApp da Ortho Alpha em Alphaville, Barueri.'
};
const LABELS={
 '/':'Ortopedia especializada em joelho',
 '/sobre':'A clínica',
 '/medicos':'Equipe médica',
 '/especialidades':'Especialidades',
 '/cirurgias':'Cirurgias do joelho',
 '/blog':'Blog de ortopedia',
 '/contato':'Agende sua avaliação'
};
const SPECIAL={
 'protese-joelho':'Prótese de joelho',
 'reconstrucao-ligamentar':'Reconstrução do LCA',
 'cirurgia-menisco':'Cirurgia de menisco',
 'artroscopia':'Artroscopia de joelho',
 'medicina-regenerativa':'Medicina regenerativa',
 'bloqueios-infiltracoes':'Bloqueios e infiltrações'
};
const ensure=(selector,tag,attributes)=>{
 let el=document.head.querySelector(selector);
 if(!el){el=document.createElement(tag);Object.entries(attributes).forEach(([k,v])=>el.setAttribute(k,v));document.head.appendChild(el);}
 return el;
};
export default function RouteSeo({route}){
 useEffect(()=>{
  let title=LABELS[route]||SPECIAL[route.split('/').pop()]||(/\/medicos\/gabriel/.test(route)?'Dr. Gabriel Lins Abib':/\/medicos\/ricardo/.test(route)?'Dr. Ricardo Queiroz':'Ortho Alpha');
  let desc=DESCRIPTIONS[route]||'Atendimento especializado em ortopedia do joelho, diagnóstico e tratamentos individualizados em Alphaville.';
  document.title=title+' | Ortho Alpha — Prévia React';
  document.documentElement.lang='pt-BR';
  ensure('meta[name="description"]','meta',{name:'description'}).setAttribute('content',desc);
  ensure('meta[property="og:title"]','meta',{property:'og:title'}).setAttribute('content',title+' | Ortho Alpha');
  ensure('meta[property="og:description"]','meta',{property:'og:description'}).setAttribute('content',desc);
  ensure('meta[property="og:type"]','meta',{property:'og:type'}).setAttribute('content','website');
  ensure('meta[name="twitter:card"]','meta',{name:'twitter:card'}).setAttribute('content','summary_large_image');
  /* GitHub Pages preview remains noindex. Clean URL routing and schema are tasks for the eventual official launch. */
  ensure('meta[name="robots"]','meta',{name:'robots'}).setAttribute('content','noindex,nofollow');
 },[route]);
 return null;
}