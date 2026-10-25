/* Ortho Alpha v5: navegação, microinterações, parallax e scroll, JS puro */
(()=>{"use strict";
const header=document.querySelector("#oa-header");
if(!header)return;
document.body.classList.add("oa-experience");
const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine=window.matchMedia("(pointer:fine)").matches;
const desktop=window.matchMedia("(min-width:921px)");
const mobilePanel=document.querySelector("#oa-mobile-panel");
const toggle=document.querySelector("#oa-menu-button");
const mega=document.querySelector(".oa-nav-mega");
const megaButton=document.querySelector("#oa-specialties-toggle");
const mobileSub=document.querySelector("#oa-mobile-specialties");
const mobileSubButton=document.querySelector("#oa-mobile-specialties-toggle");
const progress=document.querySelector(".oa-progress > span");
let frame=0;
function menuOpen(on){
 if(!toggle||!mobilePanel)return;
 toggle.setAttribute("aria-expanded",String(on));
 toggle.setAttribute("aria-label",on?"Fechar menu":"Abrir menu");
 mobilePanel.classList.toggle("is-open",on);
 mobilePanel.setAttribute("aria-hidden",String(!on));
 document.body.classList.toggle("oa-menu-open",on);
 if(on){const link=mobilePanel.querySelector(".oa-mobile-link");if(link)link.focus({preventScroll:true})}
}
toggle?.addEventListener("click",()=>menuOpen(toggle.getAttribute("aria-expanded")!=="true"));
mobilePanel?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>menuOpen(false)));
function megaOpen(on){
 if(!mega)return;
 mega.classList.toggle("is-open",on);
 megaButton?.setAttribute("aria-expanded",String(on));
}
megaButton?.addEventListener("click",e=>{e.stopPropagation();megaOpen(!mega.classList.contains("is-open"))});
mega?.addEventListener("mouseleave",()=>megaOpen(false));
mega?.addEventListener("focusout",e=>{if(!mega.contains(e.relatedTarget))megaOpen(false)});
mobileSubButton?.addEventListener("click",()=>{
 const open=!mobileSub.classList.contains("is-open");
 mobileSub.classList.toggle("is-open",open);
 mobileSubButton.setAttribute("aria-expanded",String(open));
});
document.addEventListener("click",e=>{if(mega&&!mega.contains(e.target))megaOpen(false)});
document.addEventListener("keydown",e=>{
 if(e.key!=="Escape")return;
 megaOpen(false);
 if(toggle?.getAttribute("aria-expanded")==="true"){menuOpen(false);toggle.focus()}
});
const path=location.pathname.replace(/\/index\.html$/,"/").replace(/\/$/,"")||"/";
document.querySelectorAll(".oa-nav a[data-oa-path],.oa-nav button[data-oa-path],.oa-mobile-link[data-oa-path]").forEach(el=>{
 const dest=el.dataset.oaPath;
 if(dest==="sobre"&&path.endsWith("/sobre.html")||dest==="especialidades"&&path.includes("/especialidades")||dest==="convenios"&&path.endsWith("/convenios.html")||dest==="blog"&&path.includes("/blog")||dest==="contato"&&path.endsWith("/contato.html"))el.setAttribute("aria-current","page");
});
function onScroll(){
 frame=0;
 const y=window.scrollY, max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
 header.classList.toggle("is-scrolled",y>24);
 if(progress)progress.style.transform="scaleX("+Math.min(1,y/max)+")";
 if(!reduce&&desktop.matches){
  const pic=document.querySelector(".home-premium .p-hero-image img");
  if(pic&&y<1200)pic.style.transform="translate3d(0,"+Math.min(27,y*.08).toFixed(1)+"px,0) scale(1.06)";
 }
}
window.addEventListener("scroll",()=>{if(!frame)frame=requestAnimationFrame(onScroll)},{passive:true});
onScroll();
desktop.addEventListener?.("change",ev=>{if(ev.matches)menuOpen(false);megaOpen(false)});
if("IntersectionObserver"in window&&!reduce){
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("oa-revealed");observer.unobserve(entry.target)}})},{threshold:.1,rootMargin:"0px 0px -5% 0px"});
 document.querySelectorAll("main h1,main h2,main .gallery,main .doctor-cards,main .p-people,main .p-image-mosaic,main .hubgrid,main .p-treatment-grid,main .section .hero-visual,main .footergrid").forEach(el=>{el.setAttribute("data-oa-reveal","");observer.observe(el)});
 document.body.classList.add("oa-motion-ready");
}
if(fine&&!reduce){
 const magnet=[...document.querySelectorAll(".oa-header-cta,main a.btn,main button.btn,main .p-primary")];
 magnet.forEach(el=>{
  let raf=0;
  el.addEventListener("pointermove",ev=>{
   if(raf)return;
   const r=el.getBoundingClientRect(),x=Math.max(-5,Math.min(5,(ev.clientX-r.left-r.width/2)*.11)),y=Math.max(-4,Math.min(4,(ev.clientY-r.top-r.height/2)*.12));
   raf=requestAnimationFrame(()=>{el.style.setProperty("--shiftX",x+"px");el.style.setProperty("--shiftY",y+"px");el.style.setProperty("--oa-move-x",x+"px");el.style.setProperty("--oa-move-y",y+"px");raf=0});
  },{passive:true});
  el.addEventListener("pointerleave",()=>{el.style.setProperty("--shiftX","0px");el.style.setProperty("--shiftY","0px");el.style.setProperty("--oa-move-x","0px");el.style.setProperty("--oa-move-y","0px")});
 });
 document.querySelectorAll("main .panel.dark,main .section.dark,main .pband.p-dark").forEach(panel=>{
  const glow=document.createElement("span");
  glow.className="oa-hover-glow";glow.setAttribute("aria-hidden","true");
  panel.insertBefore(glow,panel.firstChild);
  let raf=0;
  panel.addEventListener("pointerenter",()=>glow.classList.add("is-active"));
  panel.addEventListener("pointerleave",()=>glow.classList.remove("is-active"));
  panel.addEventListener("pointermove",e=>{
   if(raf)return;
   const r=panel.getBoundingClientRect();const x=((e.clientX-r.left)/r.width*100).toFixed(1),y=((e.clientY-r.top)/r.height*100).toFixed(1);
   raf=requestAnimationFrame(()=>{glow.style.setProperty("--oa-px",x+"%");glow.style.setProperty("--oa-py",y+"%");raf=0});
  },{passive:true});
 });
 document.querySelectorAll("main .doctor-card,main .p-person,main .hubitem").forEach(card=>{
  let raf=0;
  card.addEventListener("pointermove",e=>{
   if(raf)return;
   const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
   raf=requestAnimationFrame(()=>{card.style.transform="perspective(1100px) rotateX("+(-y*2).toFixed(2)+"deg) rotateY("+(x*2).toFixed(2)+"deg) translateY(-3px)";raf=0});
  },{passive:true});
  card.addEventListener("pointerleave",()=>card.style.removeProperty("transform"));
 });
}
})();
