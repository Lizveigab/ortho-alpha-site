/* ORTHO ALPHA — navegação única em todas as páginas (v5) */
(()=>{"use strict";
document.documentElement.classList.add("js");
const url=location.pathname;
const prefix=/\/(blog|especialidades|medicos)\//.test(url)?"../":"";
const img=prefix+"assets/logo-alpha-original.png";
const whatsapp="https://wa.me/5511922966734?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20na%20Ortho%20Alpha.";
const treatments=[
["Artroscopia de joelho","artroscopia.html"],
["Reconstrução ligamentar (LCA)","reconstrucao-ligamentar.html"],
["Cirurgia de menisco","cirurgia-menisco.html"],
["Prótese de joelho","protese-joelho.html"],
["Medicina regenerativa","medicina-regenerativa.html"],
["Bloqueios e infiltrações","bloqueios-infiltracoes.html"]
];
const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const chev='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg>';
const links=[
["A Clínica","sobre.html","sobre"],
["Convênios","convenios.html","convenios"],
["Blog","blog/index.html","blog"],
["Contato","contato.html","contato"]
];
const treatmentLinks=(a)=>a.map(([name,slug])=>'<a href="'+prefix+'especialidades/'+slug+'">'+name+' <span aria-hidden="true">↗</span></a>').join("");
const nav='<a data-oa-path="sobre" href="'+prefix+'sobre.html">A Clínica</a>'+
'<div class="oa-nav-mega"><button type="button" id="oa-specialties-toggle" class="oa-nav-subject" data-oa-path="especialidades" aria-expanded="false" aria-controls="oa-mega-panel">Especialidades '+chev+'</button>'+
'<div class="oa-mega-panel" id="oa-mega-panel"><div class="oa-mega-inner">'+
'<div><span class="oa-mega-label">Cirurgia do joelho</span><div class="oa-mega-links">'+treatmentLinks(treatments.slice(0,3))+'</div></div>'+
'<div><span class="oa-mega-label">Tratamentos e cuidado</span><div class="oa-mega-links">'+treatmentLinks(treatments.slice(3))+'</div></div>'+
'<div class="oa-mega-feature"><small>Especialização em joelho</small><strong>O movimento é parte da sua vida.</strong><a href="'+prefix+'especialidades/index.html">Ver todas as especialidades ↗</a></div></div></div></div>'+
links.slice(1).map(([text,path,key])=>'<a data-oa-path="'+key+'" href="'+prefix+path+'">'+text+'</a>').join("");
const mobile='<a class="oa-mobile-link" data-oa-path="sobre" href="'+prefix+'sobre.html">A Clínica <span aria-hidden="true">↗</span></a>'+
'<div class="oa-mobile-link"><a class="oa-mobile-subject" data-oa-path="especialidades" href="'+prefix+'especialidades/index.html">Especialidades</a><button class="oa-mobile-sub-toggle" type="button" aria-controls="oa-mobile-specialties" aria-expanded="false" id="oa-mobile-specialties-toggle" aria-label="Expandir especialidades">+</button></div>'+
'<div class="oa-mobile-subnav" id="oa-mobile-specialties">'+treatmentLinks(treatments)+'</div>'+
links.slice(1).map(([text,path,key])=>'<a class="oa-mobile-link" data-oa-path="'+key+'" href="'+prefix+path+'">'+text+' <span aria-hidden="true">↗</span></a>').join("");
const markup='<header class="oa-header" id="oa-header">'+
'<div class="oa-progress" aria-hidden="true"><span></span></div>'+
'<div class="oa-header-inner">'+
'<a class="oa-brand" href="'+prefix+'index.html" aria-label="Ortho Alpha — página inicial"><img class="oa-brand-icon" src="'+img+'" alt=""><span class="oa-brand-copy"><strong>ORTHO <span>ALPHA</span></strong><small>ORTOPEDIA ESPECIALIZADA</small></span></a>'+
'<nav class="oa-nav" aria-label="Navegação principal">'+nav+'</nav>'+
'<a class="oa-header-cta" href="'+whatsapp+'" target="_blank" rel="noopener noreferrer">Agendar avaliação <span class="oa-cta-arrow">'+arrow+'</span></a>'+
'<button type="button" class="oa-menu-button" id="oa-menu-button" aria-label="Abrir menu" aria-expanded="false" aria-controls="oa-mobile-panel"><span></span><span></span></button>'+
'</div><nav class="oa-mobile-panel" id="oa-mobile-panel" aria-label="Navegação para celular" aria-hidden="true"><div class="oa-mobile-kicker">ORTHO ALPHA · ALPHAVILLE</div>'+mobile+
'<a class="oa-mobile-contact" href="'+whatsapp+'" target="_blank" rel="noopener noreferrer">Agendar avaliação <span>↗</span></a><p class="oa-mobile-note">Av. Copacabana, 112 · Alphaville, Barueri/SP</p></nav></header>';
const header=document.querySelector("body > header, body > .header");
if(header)header.outerHTML=markup;
const cssHref=prefix+"assets/oa-experience-v5.css?v=5";
if(!document.querySelector('link[data-oa-experience]')){
 const style=document.createElement("link");style.rel="stylesheet";style.href=cssHref;style.dataset.oaExperience="v5";document.head.appendChild(style);
}
const js=document.createElement("script");
js.src=prefix+"assets/oa-interactions-v5.js?v=5";js.async=false;
document.body.appendChild(js);
})();