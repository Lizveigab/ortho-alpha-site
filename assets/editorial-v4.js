/* Ortho Alpha — interações acessíveis e leves para as páginas internas */
(()=>{"use strict";if(!document.body.classList.contains("oa-v4"))return;
 const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(!reduce&&"IntersectionObserver" in window){
   const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("oa-reached");observer.unobserve(entry.target)}})},{threshold:.08,rootMargin:"0px 0px -5% 0px"});
   document.querySelectorAll("main .panel, main .section").forEach(el=>observer.observe(el));
 }
 if(!reduce&&matchMedia("(pointer:fine)").matches){
  document.querySelectorAll("main .btn, main .hubitem").forEach(btn=>{
   btn.addEventListener("pointermove",e=>{const r=btn.getBoundingClientRect();btn.style.setProperty("--shiftX",(((e.clientX-r.left-r.width/2)/r.width)*5).toFixed(1)+"px");btn.style.setProperty("--shiftY",(((e.clientY-r.top-r.height/2)/r.height)*5).toFixed(1)+"px")},{passive:true});
   btn.addEventListener("pointerleave",()=>{btn.style.setProperty("--shiftX","0px");btn.style.setProperty("--shiftY","0px")});
  });
 }
})();
