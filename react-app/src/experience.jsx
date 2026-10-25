import React,{useEffect,useState} from 'react';

/* All movement is progressive: disabled when user requests reduced motion. */
export function ExperienceEngine({path}){
  useEffect(()=>{
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktop=window.matchMedia('(min-width: 871px)').matches;
    const progress=document.querySelector('.navprogress span');
    const picture=document.querySelector('.home-hero .heromedia img');
    const hero=document.querySelector('.home-hero');
    let raf=0;
    const scroll=()=>{
      if(raf)return;
      raf=window.requestAnimationFrame(()=>{
        const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
        if(progress)progress.style.transform='scaleX('+Math.min(1,window.scrollY/max)+')';
        if(!reduced&&desktop&&picture&&window.scrollY<1000){
          picture.style.transform='translate3d(0,'+Math.min(23,window.scrollY*.045).toFixed(1)+'px,0) scale(1.055)';
        }
        raf=0;
      });
    };
    window.addEventListener('scroll',scroll,{passive:true});scroll();
    const cleanup=[];
    if(!reduced&&desktop){
      document.querySelectorAll('main .dark').forEach(panel=>{
        let pointerRaf=0;
        const move=e=>{
          if(pointerRaf)return;
          const box=panel.getBoundingClientRect();
          const x=(100*(e.clientX-box.left)/box.width).toFixed(1)+'%';
          const y=(100*(e.clientY-box.top)/box.height).toFixed(1)+'%';
          pointerRaf=window.requestAnimationFrame(()=>{
            panel.style.setProperty('--ambient-x',x);
            panel.style.setProperty('--ambient-y',y);
            pointerRaf=0;
          });
        };
        panel.addEventListener('pointermove',move,{passive:true});
        cleanup.push(()=>{panel.removeEventListener('pointermove',move);window.cancelAnimationFrame(pointerRaf)});
      });
      if(hero){
        let pointerRaf=0;
        const move=e=>{
          if(pointerRaf)return;
          const box=hero.getBoundingClientRect();
          const x=(100*(e.clientX-box.left)/box.width).toFixed(1)+'%';
          const y=(100*(e.clientY-box.top)/box.height).toFixed(1)+'%';
          pointerRaf=window.requestAnimationFrame(()=>{
            hero.style.setProperty('--hero-x',x);
            hero.style.setProperty('--hero-y',y);
            pointerRaf=0;
          });
        };
        hero.addEventListener('pointermove',move,{passive:true});
        cleanup.push(()=>{hero.removeEventListener('pointermove',move);window.cancelAnimationFrame(pointerRaf)});
      }
    }
    return()=>{window.removeEventListener('scroll',scroll);window.cancelAnimationFrame(raf);cleanup.forEach(fn=>fn())};
  },[path]);
  return null;
}

export function ClinicGallery({A,I}){
  const imgs=[
    {src:I.structure,label:'Estrutura da clínica'},
    {src:I.room,label:'Consultórios'},
    {src:I.detail,label:'Detalhes do ambiente'},
    {src:I.exam,label:'Ambiente de atendimento'},
  ];
  const [active,setActive]=useState(0);
  return <div className="clinic-gallery" aria-label="Galeria interativa de fotos da Ortho Alpha">
    <button className="gallery-feature" type="button" onClick={()=>setActive((active+1)%imgs.length)} aria-label="Ver próxima fotografia">
      <img key={active} src={A(imgs[active].src)} alt={imgs[active].label+' — Ortho Alpha'} loading="lazy"/>
      <span className="gallery-caption">{imgs[active].label}<span className="gallery-indicators" aria-hidden="true">{imgs.map((_,i)=><i key={i} className={active===i?'active':''}/>)}</span></span>
    </button>
    <div className="gallery-thumbs">{imgs.filter((_,i)=>i!==active).map(item=>{
       const i=imgs.indexOf(item);
       return <button key={item.src} type="button" className={i===active?'active':''} onClick={()=>setActive(i)} aria-label={'Ver foto: '+item.label}><img src={A(item.src)} alt="" loading="lazy"/><span>{String(i+1).padStart(2,'0')}</span></button>
    })}</div>
  </div>
}

export function TreatmentShowcase({A,T,link,Btn}){
  const[active,setActive]=useState(0);
  const item=T[active];
  return <div className="treatment-showcase" aria-label="Explorar especialidades do joelho">
    <div className="treatment-selector" role="group" aria-label="Selecione um tratamento">
      {T.map((t,i)=><button className="treatment-option" type="button" key={t.slug} aria-pressed={active===i} onClick={()=>setActive(i)}>
        <span className="num">{String(i+1).padStart(2,'0')}</span><span className="name">{t.name}</span><span className="arrow" aria-hidden="true">↗</span>
      </button>)}
    </div>
    <div className="treatment-scene" aria-live="polite" aria-atomic="true">
      <img key={item.slug} src={A(item.img)} alt={'Ambiente da Ortho Alpha ilustrando '+item.name} loading="lazy"/>
      <img className="scene-watermark" src={A('knee-anatomy-premium.svg')} alt="" aria-hidden="true"/>
      <div className="scene-text"><small>TRATAMENTO {String(active+1).padStart(2,'0')} / {String(T.length).padStart(2,'0')}</small>
       <h3>{item.name}</h3><p>{item.desc}</p>
       <Btn to={link('/especialidades/'+item.slug)}>Entenda o procedimento</Btn>
      </div>
    </div>
  </div>
}

export function MovementPanel({A,I,Btn,Eyebrow,Reveal}){
  return <section className="movement-panel">
    <div className="movement-photo" aria-hidden="true"><img src={A(I.exam)} alt="" loading="lazy"/></div>
    <div className="movement-shade" aria-hidden="true"/>
    <div className="movement-rings" aria-hidden="true"/>
    <div className="container">
      <Reveal className="copy movement-copy">
        <Eyebrow>MOVIMENTO É VIDA</Eyebrow>
        <h2>Voltar a se mover começa com o <em>cuidado certo.</em></h2>
        <p>Um diagnóstico bem conduzido é o primeiro passo para planejar seu retorno às atividades com segurança.</p>
        <div className="actions"><Btn>Agendar avaliação</Btn></div>
      </Reveal>
    </div>
    <span className="movement-signature">ORTHO ALPHA · ALPHAVILLE</span>
  </section>
}

export function ReviewLink(){
  return <a className="review-link" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=Ortho+Alpha+Ortopedia+Alphaville">
    <span><strong>Avaliações e localização da clínica</strong><br/>Consulte as informações públicas da Ortho Alpha no Google Maps</span>
    <span className="arrow" aria-hidden="true">↗</span>
  </a>
}
