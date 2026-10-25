/* Ortho Alpha — animações leves da home (sem bloquear conteúdo) */
(()=>{
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(reduce)return;
 const home=document.querySelector('.home-premium');
 if(!home)return;
 const sections=[...home.querySelectorAll('.pband')];
 const obs=new IntersectionObserver(entries=>{for(const item of entries){if(item.isIntersecting){item.target.classList.add('oa-inview');obs.unobserve(item.target)}}},{rootMargin:'0px 0px -8% 0px',threshold:.08});
 sections.forEach(s=>obs.observe(s));
 const buttons=home.querySelectorAll('.p-primary,.p-textlink');
 if(window.matchMedia('(pointer:fine)').matches){buttons.forEach(el=>{
   el.addEventListener('pointermove',ev=>{const r=el.getBoundingClientRect();const x=(ev.clientX-r.left-r.width/2)/r.width;const y=(ev.clientY-r.top-r.height/2)/r.height;el.style.setProperty('--oa-mx',(x*4).toFixed(1)+'px');el.style.setProperty('--oa-my',(y*3).toFixed(1)+'px')},{passive:true});
   el.addEventListener('pointerleave',()=>{el.style.setProperty('--oa-mx','0px');el.style.setProperty('--oa-my','0px')});
 });}
})();