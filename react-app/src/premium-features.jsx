import React,{useState,useRef,useEffect} from 'react';
const topics=[
{key:'ligaments',label:'Ligamentos',subtitle:'Estabilidade do movimento',explain:'Lesões ligamentares podem provocar instabilidade. A necessidade de reconstrução depende do exame físico, da lesão e dos objetivos de cada pessoa.',link:'/especialidades/reconstrucao-ligamentar',spot:[59,29]},
{key:'meniscus',label:'Menisco',subtitle:'Amortecimento e proteção articular',explain:'Nem toda lesão meniscal precisa de cirurgia. A localização, os sintomas e a preservação do tecido orientam a conduta.',link:'/especialidades/cirurgia-menisco',spot:[39,60]},
{key:'joint',label:'Articulação',subtitle:'Mobilidade e qualidade de vida',explain:'Dor, rigidez e desgaste articular pedem uma avaliação cuidadosa para definir medidas conservadoras ou opções cirúrgicas.',link:'/especialidades/protese-joelho',spot:[60,74]}
];
const Arrow=()=> <span className="px-arr" aria-hidden="true">↗</span>;
const reviews='https://www.google.com/maps/search/?api=1&query=Ortho+Alpha+Ortopedia+Av+Copacabana+112+Barueri';
export function KneeAtlas({img}){
 const [sel,setSel]=useState(0),ref=useRef(null),tiltRef=useRef(null),frame=useRef(0);const item=topics[sel];
 useEffect(()=>()=>cancelAnimationFrame(frame.current),[]);
 const move=e=>{
  if(window.matchMedia('(prefers-reduced-motion:reduce)').matches||window.matchMedia('(pointer:coarse)').matches)return;
  const r=ref.current?.getBoundingClientRect();if(!r||frame.current)return;const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  frame.current=requestAnimationFrame(()=>{if(tiltRef.current)tiltRef.current.style.transform='perspective(1150px) rotateX('+(-y*5)+'deg) rotateY('+(x*7)+'deg)';frame.current=0});
 };
 return <section className="px-knee" aria-labelledby="px-knee-title"><div className="px-container">
  <div className="px-head"><span className="px-eyebrow">ATLAS INTERATIVO DO JOELHO</span><h2 id="px-knee-title">Entender o joelho é o primeiro passo para <em>cuidar dele.</em></h2><p>Explore estruturas importantes para compreender melhor queixas comuns e possibilidades de tratamento.</p></div>
  <div className="px-knee-grid">
   <div className="px-visual" ref={ref} onPointerMove={move} onPointerLeave={()=>{cancelAnimationFrame(frame.current);frame.current=0;if(tiltRef.current)tiltRef.current.style.transform='none'}}>
    <div className="px-knee-orbits" aria-hidden="true"/>
    <div className="px-tilt" ref={tiltRef}>
      <img src={img('knee-anatomy-premium.svg')} alt="Representação ilustrativa de um joelho" loading="lazy"/>
      {topics.map((t,i)=><button type="button" key={t.key} className={'px-hotspot'+(sel===i?' active':'')} style={{left:t.spot[0]+'%',top:t.spot[1]+'%'}} aria-label={'Explorar '+t.label} aria-pressed={sel===i} onClick={()=>setSel(i)}>{String(i+1).padStart(2,'0')}</button>)}
    </div>
    <span className="px-axis">ATLAS INTERATIVO / 03 PONTOS</span>
   </div>
   <div className="px-atlas-side">
    <div className="px-atlas-tabs" role="group" aria-label="Temas do joelho">{topics.map((t,i)=><button type="button" key={t.key} className={sel===i?'active':''} aria-pressed={sel===i} onClick={()=>setSel(i)}><small>{String(i+1).padStart(2,'0')}</small>{t.label}<Arrow/></button>)}</div>
    <div className="px-atlas-detail" key={item.key} aria-live="polite" aria-atomic="true"><span>{String(sel+1).padStart(2,'0')} / 03 · EM FOCO</span><h3>{item.subtitle}</h3><p>{item.explain}</p><a href={'#'+item.link}>Conhecer tratamento <Arrow/></a></div>
    <p className="px-disclaimer">Visualização ilustrativa e educativa. Não constitui diagnóstico nem modelo anatômico 3D de precisão.</p>
   </div>
  </div>
 </div></section>;
}
export function TrustProof({docs,wa,img}){
 return <section className="px-trust" aria-labelledby="px-trust-title"><div className="px-container">
  <div className="px-head px-trust-heading"><div><span className="px-eyebrow">CONFIANÇA E TRANSPARÊNCIA</span><h2 id="px-trust-title">Conheça quem cuida. <em>Decida com clareza.</em></h2></div><p>Credenciais profissionais e referências públicas para conhecer a clínica antes de agendar.</p></div>
  <div className="px-trust-grid"><div className="px-doctor-list">{docs.map(d=><a className="px-doctor-item" href={'#/medicos/'+d.slug} key={d.slug}><img src={img(d.photo)} alt={'Retrato de '+d.name} loading="lazy"/><span><strong>{d.name}</strong><small>{d.crm}</small></span><Arrow/></a>)}</div>
  <div className="px-trust-panels"><div className="px-trust-card"><span className="px-eyebrow">AVALIAÇÕES E LOCALIZAÇÃO</span><h3>Consulte informações da clínica em fontes públicas.</h3><p>Confira avaliações disponíveis no Google Maps. Elas podem mudar e não exibimos nota ou quantidade sem verificação.</p><a href={reviews} target="_blank" rel="noopener noreferrer">Pesquisar Ortho Alpha no Google <Arrow/></a></div>
  <div className="px-trust-address"><span className="px-eyebrow">NOSSA LOCALIZAÇÃO</span><p>Av. Copacabana, 112, sala 1507 · Alphaville, Barueri/SP.</p><a href={wa} rel="noopener noreferrer" target="_blank">Conversar sobre uma avaliação ↗</a></div></div></div>
 </div></section>;
}
export function ProfileOpening({doctor,img,wa}){
 const url=wa.split('?')[0]+'?text='+encodeURIComponent('Olá, gostaria de agendar uma consulta com o '+doctor.short+' na Ortho Alpha.');
 return <section className="px-profile" aria-labelledby="px-profile-name"><div className="px-container px-profile-grid">
   <div className="px-profile-copy"><span className="px-eyebrow">ORTHO ALPHA / CIRURGIA DO JOELHO</span><span className="px-profile-index">EQUIPE MÉDICA · {doctor.slug==='gabriel-abib'?'01':'02'} / 02</span><h1 id="px-profile-name">{doctor.name}</h1><p className="px-profile-crm">{doctor.crm}</p><p className="px-profile-bio">{doctor.bio}</p><div className="px-profile-actions"><a className="px-primary" href={url} target="_blank" rel="noopener noreferrer">Agendar com {doctor.short}<Arrow/></a><button className="px-profile-link" type="button" onClick={()=>document.getElementById("trajetoria-medica")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth"})}>Ver formação ↓</button></div></div>
   <div className="px-profile-photo"><img src={img(doctor.photo)} alt={'Fotografia original de '+doctor.name} fetchPriority="high"/><span>ORTHO ALPHA · ALPHAVILLE</span></div>
 </div></section>;
}
export function PhysicianCTA({doctor,wa}){
 const url=wa.split('?')[0]+'?text='+encodeURIComponent('Olá, quero agendar uma consulta com o '+doctor.short+'.');
 return <section className="px-physician-cta"><div className="px-container"><div><span className="px-eyebrow">AGENDE SUA AVALIAÇÃO</span><h2>Cuidado individualizado, <em>do diagnóstico ao próximo passo.</em></h2></div><a className="px-primary" href={url} target="_blank" rel="noopener noreferrer">Agendar com {doctor.short}<Arrow/></a></div></section>;
}