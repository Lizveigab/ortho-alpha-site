import React,{useEffect,useRef,useState} from 'react';
import {KneeAtlas} from './premium-features.jsx';

function Reveal({children,className='',delay=0}){
 const ref=useRef(null);
 useEffect(()=>{
  const node=ref.current;if(!node)return;
  if(window.matchMedia('(prefers-reduced-motion:reduce)').matches||!('IntersectionObserver'in window)){node.classList.add('at-visible');return;}
  const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){e.target.classList.add('at-visible');obs.unobserve(node)}},{threshold:.1,rootMargin:'0px 0px -28px 0px'});
  obs.observe(node);return()=>obs.disconnect();
 },[]);
 return <div ref={ref} className={'at-reveal '+className} style={{'--at-delay':delay+'ms'}}>{children}</div>
}
const Tag=({children})=><div className="at-tag"><i/>{children}</div>;
function Button({children,href,light=false,quiet=false}){
 const external=/^https?:/.test(href);
 return <a href={href} className={'at-button'+(light?' at-button-light':'')+(quiet?' at-button-quiet':'')} target={external?'_blank':undefined} rel={external?'noopener noreferrer':undefined}>{children}<span aria-hidden="true">↗</span></a>
}
function Intro({img,wa,docs}){
 return <section className="at-intro" aria-labelledby="at-intro-head">
   <div className="at-intro-photo"><img src={img('lifestyle-corrida.webp')} fetchPriority="high" decoding="async" alt="Pessoa praticando corrida ao ar livre, imagem ilustrativa de estilo de vida ativo"/><div className="at-intro-wash"/></div>
   <div className="wrap at-intro-inner">
    <Reveal className="at-intro-copy">
      <Tag>ALPHAVILLE · BARUERI</Tag>
      <h1 id="at-intro-head">Clínica Ortopédica especializada, <em>com a técnica e o cuidado que você merece.</em></h1>
      <p>Atendimento especializado em joelho, com avaliação individualizada, precisão técnica e cuidado em cada etapa do tratamento.</p>
      <div className="at-actions"><Button href={wa}>Agendar avaliação</Button><Button href="#/sobre" quiet>Conhecer a clínica</Button></div>
    </Reveal>
    <div className="at-intro-brandmark" aria-hidden="true"><img src={img("logo-alpha-original.png")} alt=""/></div>
    <div className="at-intro-physicians"><span>CONHEÇA NOSSA EQUIPE</span>{docs.map(d=><a key={d.slug} href={"#/medicos/"+d.slug}><img src={img(d.photo)} alt={d.short} loading="eager"/><div className="at-physician-copy"><strong>{d.short}</strong><span className="at-physician-crm">{d.slug==="gabriel-abib"?"CRM-SP 208621 · RQE 112944":"CRM-SP 196887"}</span><span className="at-physician-area">{d.slug==="gabriel-abib"?"Cirurgia do joelho":"Reconstruções ligamentares e prótese de joelho"}</span></div><b aria-hidden="true">↗</b></a>)}</div>
   </div>
   <div className="at-intro-bottom"><div className="wrap">
     <span><b>01</b> Especialistas em joelho</span><span><b>02</b> Avaliação individualizada</span><span><b>03</b> Alphaville · Barueri</span>
     <a href="#at-filosofia" onClick={e=>{e.preventDefault();document.querySelector('#at-filosofia')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})}} aria-label="Explorar nossa abordagem">↓</a>
   </div></div>
 </section>
}
function Philosophy({img,wa}){
 return <section className="at-philosophy" id="at-filosofia">
  <div className="at-orbits" aria-hidden="true"><i/><i/><i/></div>
  <div className="wrap at-philosophy-grid">
   <Reveal className="at-philosophy-copy">
     <Tag>NOSSA ABORDAGEM</Tag>
     <h2>A dor é um sinal. <em>O cuidado começa pela causa.</em></h2>
     <p>Antes de recomendar qualquer intervenção, entendemos seu histórico, seus exames e o que o movimento significa na sua vida.</p>
     <div className="at-philosophy-divider"/>
     <div className="at-proof-points"><span><strong>01</strong> Diagnóstico</span><span><strong>02</strong> Planejamento</span><span><strong>03</strong> Acompanhamento</span></div>
     <Button href="#/sobre" light>Nosso jeito de cuidar</Button>
   </Reveal>
   <Reveal className="at-philosophy-art"><img src={img('knee-anatomy-premium.svg')} alt="Ilustração tecnológica da anatomia do joelho" loading="lazy"/><span className="at-philosophy-art-label">JOELHO · ANATOMIA ARTICULAR</span></Reveal>
  </div>
 </section>
}
function People({docs,img}){
 return <section className="at-people"><div className="wrap">
  <Reveal className="at-widehead"><Tag>QUEM ESTÁ AO SEU LADO</Tag><div className="at-widehead-row"><h2>Experiência que se traduz em <em>cuidado próximo.</em></h2><p>Duas trajetórias na cirurgia do joelho. Uma visão compartilhada: ouvir antes de decidir.</p></div></Reveal>
  <div className="at-people-grid">{docs.map((doc,i)=><Reveal className="at-people-card" key={doc.slug} delay={i*120}>
   <a href={'#/medicos/'+doc.slug} className="at-people-photo"><img src={img(doc.photo)} alt={'Retrato original de '+doc.name} loading="lazy"/><span className="at-photo-count">0{i+1} / EQUIPE</span><span className="at-photo-action">↗</span></a>
   <div className="at-people-info"><div><small>ORTOPEDIA · CIRURGIA DO JOELHO</small><h3>{doc.name}</h3><p>{'Lesões ligamentares, menisco e prótese de joelho.'}</p></div><a href={'#/medicos/'+doc.slug}>Ver formação e atuação <span>↗</span></a></div>
  </Reveal>)}</div>
  
  </div></section>
}
function Procedures({treatments,img}){
 const [active,setActive]=useState(0),t=treatments[active];
 return <section className="at-procedures"><div className="wrap">
 <Reveal className="at-widehead"><Tag>ESPECIALIDADES</Tag><div className="at-widehead-row"><h2>Um joelho. <em>Diferentes possibilidades.</em></h2><p>A indicação depende de uma avaliação médica cuidadosa. Explore nossas áreas de atuação.</p></div></Reveal>
 <div className="at-procedures-content">
  <div className="at-proc-list" role="group" aria-label="Selecione um tratamento">{treatments.map((it,i)=><button type="button" key={it.slug} className={'at-proc-row'+(active===i?' selected':'')} aria-pressed={active===i} onClick={()=>setActive(i)}><span className="at-proc-index">{String(i+1).padStart(2,'0')}</span><span className="at-proc-title">{it.name}</span><span className="at-proc-arrow">↗</span></button>)}</div>
  <article className="at-proc-stage" aria-live="polite" aria-atomic="true">
   <img key={t.visual} className="at-proc-image" src={img(t.visual)} alt={'Imagem de estilo de vida relacionada a '+t.name} loading="lazy"/>
   <div className="at-proc-stage-body">
    <span>PROCEDIMENTO {String(active+1).padStart(2,'0')} / {String(treatments.length).padStart(2,'0')}</span>
    <h3>{t.name}</h3><p>{t.desc}</p>
    <Button href={'#/especialidades/'+t.slug} light>Conhecer tratamento</Button>
   </div>
  </article>
 </div><div className="at-proc-bottom"><span>Cirurgia · Tratamento conservador · Controle da dor</span><a href="#/especialidades">Todas as especialidades ↗</a></div>
 </div></section>
}
function SecondOpinion({img,wa}){
 return <section className="at-opinion">
  <div className="at-opinion-media"><img src={img('lifestyle-dor.webp')} alt="Pessoa com desconforto no joelho, fotografia ilustrativa" loading="lazy"/></div>
  <div className="wrap at-opinion-container"><Reveal>
   <Tag>SEGUNDA OPINIÃO</Tag>
   <h2>Recebeu uma indicação cirúrgica? <em>Entenda suas opções.</em></h2>
   <p>O diagnóstico, a indicação e as alternativas merecem uma conversa clara.</p><Button href={wa}>Agendar segunda opinião</Button>
  </Reveal></div>
  <div className="at-opinion-aside"><span>UMA DECISÃO MAIS CONSCIENTE</span><b>↗</b></div>
 </section>
}
function Spaces({img,clinic}){
 const [active,setActive]=useState(0);
 return <section className="at-spaces"><div className="wrap">
  <Reveal className="at-widehead"><Tag>NOSSA CLÍNICA</Tag><div className="at-widehead-row"><h2>O ambiente também faz parte <em>do cuidado.</em></h2><p>Conheça os espaços reais da Ortho Alpha, em Alphaville.</p></div></Reveal>
  <div className="at-spaces-gallery">
   <button type="button" className="at-space-main" onClick={()=>setActive((active+1)%clinic.length)} aria-label="Avançar na galeria da clínica"><img key={active} src={img(clinic[active])} alt={'Espaço real da clínica — fotografia '+(active+1)} loading="lazy"/><span>ALPHAVILLE <b>{String(active+1).padStart(2,'0')} / 04</b></span></button>
   <div className="at-space-stack">{clinic.filter((_,i)=>i!==active).slice(0,2).map((file,i)=><button type="button" key={file} onClick={()=>setActive(clinic.indexOf(file))} aria-label={'Visualizar fotografia '+(clinic.indexOf(file)+1)}><img src={img(file)} alt={'Detalhe do ambiente Ortho Alpha '+(clinic.indexOf(file)+1)} loading="lazy"/></button>)}</div>
  </div>
  <div className="at-space-bottom"><p>Conforto e privacidade para acompanhar cada etapa da sua jornada.</p><div><button onClick={()=>setActive((active+clinic.length-1)%clinic.length)} aria-label="Foto anterior">←</button><button onClick={()=>setActive((active+1)%clinic.length)} aria-label="Próxima foto">→</button><Button href="#/sobre" light>Explorar a clínica</Button></div></div>
 </div></section>
}
function Journey(){
 const steps=[
  ['Avaliação','Escuta, exame clínico e entendimento das suas queixas e objetivos.'],
  ['Planejamento','Uma conversa clara sobre as possibilidades e a conduta mais adequada.'],
  ['Acompanhamento','Orientação e cuidado ao longo das etapas do tratamento.']
 ];
 return <section className="at-journey at-process" aria-labelledby="at-process-title">
  <div className="wrap">
   <Reveal className="at-process-heading">
    <Tag>COMO FUNCIONA</Tag>
    <div className="at-process-intro"><h2 id="at-process-title">Uma decisão bem <em>acompanhada.</em></h2><p>O cuidado começa com uma avaliação criteriosa. Cada etapa é construída considerando você e seus objetivos.</p></div>
   </Reveal>
   <div className="at-process-steps">{steps.map(([title,description],i)=><Reveal key={title} className="at-process-step" delay={i*80}>
    <span className="at-process-step-no">{String(i+1).padStart(2,'0')}</span>
    <div className="at-process-step-rule" aria-hidden="true"><i/></div>
    <h3>{title}</h3><p>{description}</p>
   </Reveal>)}</div>
   <Reveal className="at-process-bottom"><span>AVALIAÇÃO INDIVIDUALIZADA · CLAREZA · ACOMPANHAMENTO</span><a href="#/sobre">Conheça nossa forma de cuidar <span aria-hidden="true">↗</span></a></Reveal>
  </div>
 </section>
}
function FrequentlyAsked({wa}){
 const questions=[
  ['Toda dor no joelho precisa de cirurgia?','Não. Diversas condições podem ser tratadas sem cirurgia. A escolha depende do diagnóstico, da intensidade dos sintomas e de cada paciente.'],
  ['Posso levar meus exames?','Sim. Exames anteriores, relatórios e informações sobre os seus sintomas podem ajudar na avaliação.'],
  ['Quando buscar uma segunda opinião?','Quando houver dúvidas sobre o diagnóstico, a indicação de cirurgia ou as alternativas disponíveis.'],
  ['Medicina regenerativa e PRP servem para todos?','Não. As indicações são específicas, as evidências variam conforme a condição e não há garantia de regeneração da cartilagem. A avaliação médica é fundamental.']
 ];
 return <section className="at-faq" aria-labelledby="at-faq-title"><div className="wrap at-faq-layout">
  <Reveal className="at-faq-heading">
   <Tag>DÚVIDAS FREQUENTES</Tag>
   <h2 id="at-faq-title">Mais clareza. <em>Mais confiança.</em></h2>
   <p>Informações para ajudar você a chegar à consulta com mais tranquilidade.</p>
   <div className="at-faq-aside"><span aria-hidden="true">✳</span> Informação confiável é parte do cuidado.</div>
  </Reveal>
  <Reveal className="at-faq-content">
   <div className="at-journey-faq">{questions.map(([question,answer],i)=><details key={question}><summary><span className="at-faq-index">{String(i+1).padStart(2,'0')}</span><strong>{question}</strong><span className="at-faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
   <Button href={wa}>Conversar com a equipe</Button>
  </Reveal>
 </div></section>
}
function SignatureClose({img,wa}){
 return <section className="at-close">
  <div className="at-close-photo"><img src={img('lifestyle-trilha.webp')} alt="" loading="lazy"/></div>
  <div className="wrap at-close-content"><Reveal>
    <Tag>SEU PRÓXIMO PASSO</Tag>
    <h2>O movimento continua. <em>Com o cuidado certo.</em></h2>
    <p>Uma decisão mais tranquila começa com uma conversa.</p>
    <Button href={wa} light>Agendar minha avaliação</Button>
   </Reveal>
   <div className="at-close-watermark" aria-hidden="true">α</div>
  </div>
 </section>;
}
export function RegenerativeSpotlight({img}){
 return <section className="oa-regen" aria-labelledby="oa-regen-title">
   <div className="oa-regen-photo"><img src={img('lifestyle-alongamento.webp')} loading="lazy" alt="Mulher adulta fazendo exercícios leves em ambiente claro, imagem ilustrativa"/></div>
   <div className="oa-regen-wash"/>
   <div className="wrap oa-regen-inner">
    <Reveal className="oa-regen-copy">
     <Tag>MEDICINA REGENERATIVA · PRP</Tag>
     <h2 id="oa-regen-title">A cirurgia não é sempre <em>o primeiro caminho.</em></h2>
     <p>Conheça as possibilidades de tratamento não cirúrgico. O PRP e outras terapias são avaliados conforme o diagnóstico, as evidências disponíveis e os objetivos de cada pessoa.</p>
     <div className="oa-regen-buttons"><Button href="#/especialidades/medicina-regenerativa">Medicina regenerativa</Button><Button href="#/especialidades/prp" quiet>Entenda o PRP</Button></div>
     <small>Nem todo paciente tem indicação para PRP; os resultados variam. As terapias não garantem regeneração da cartilagem.</small>
    </Reveal>
   </div>
 </section>
}
export default function AtelierHome({img,wa,docs,treatments,clinic}){
 return <div className="at-home">
  <Intro img={img} wa={wa} docs={docs}/>
  <Philosophy img={img} wa={wa}/>
  <People docs={docs} img={img}/>
  <KneeAtlas img={img}/>
  <SecondOpinion img={img} wa={wa}/>
  <Procedures treatments={treatments} img={img}/>
  <RegenerativeSpotlight img={img}/>
  <Spaces img={img} clinic={clinic}/>
  <Journey/>
  <FrequentlyAsked wa={wa}/>
  <SignatureClose img={img} wa={wa}/>
 </div>;
}