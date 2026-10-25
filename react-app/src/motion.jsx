import {useEffect} from 'react';
/* Progressive motion: optional decoration, never required for content or navigation. */
export default function MotionFX({route}){
useEffect(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const desktop=matchMedia('(pointer:fine)').matches && matchMedia('(min-width:901px)').matches;
 const bar=document.createElement('div');bar.className='oa3-read-progress';bar.setAttribute('aria-hidden','true');
 const inner=document.createElement('span');bar.appendChild(inner);document.querySelector('.oa3 .header')?.appendChild(bar);
 let raf=0;
 const media=document.querySelector('.oa3 .at-intro-photo img,.oa3 .home-bg img,.oa3 .page-photo img');
 function scroll(){
  if(raf)return;
  raf=requestAnimationFrame(()=>{
   const max=Math.max(1,document.documentElement.scrollHeight-innerHeight),y=scrollY;
   inner.style.transform='scaleX('+Math.min(1,y/max)+')';
   if(media&&!reduced&&desktop&&y<980)media.style.transform='translate3d(0,'+Math.min(30,y*.047).toFixed(1)+'px,0) scale(1.045)';
   raf=0;
  });
 }
 addEventListener('scroll',scroll,{passive:true});scroll();
 const disposers=[];
 if(!reduced&&desktop){
  document.querySelectorAll('.oa3 .dark,.oa3 .at-philosophy,.oa3 .at-procedures,.oa3 .at-spaces,.oa3 .at-close').forEach(el=>{
   let pending=0;
   function move(ev){
    if(pending)return;
    const r=el.getBoundingClientRect();
    const x=((ev.clientX-r.left)/r.width*100).toFixed(1)+'%';
    const y=((ev.clientY-r.top)/r.height*100).toFixed(1)+'%';
    pending=requestAnimationFrame(()=>{el.style.setProperty('--oa-light-x',x);el.style.setProperty('--oa-light-y',y);pending=0});
   }
   el.addEventListener('pointermove',move,{passive:true});disposers.push(()=>{el.removeEventListener('pointermove',move);cancelAnimationFrame(pending)});
  });
  document.querySelectorAll('.oa3 .btn').forEach(el=>{
   let pending=0;
   function move(ev){
    if(pending)return;
    const r=el.getBoundingClientRect();
    const x=Math.max(-5,Math.min(5,(ev.clientX-r.left-r.width/2)*.10));
    const y=Math.max(-4,Math.min(4,(ev.clientY-r.top-r.height/2)*.10));
    pending=requestAnimationFrame(()=>{el.style.setProperty('--mag-x',x+'px');el.style.setProperty('--mag-y',y+'px');pending=0});
   }
   function reset(){el.style.setProperty('--mag-x','0px');el.style.setProperty('--mag-y','0px')}
   el.addEventListener('pointermove',move,{passive:true});el.addEventListener('pointerleave',reset);
   disposers.push(()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',reset);cancelAnimationFrame(pending)});
  });
 }
 return()=>{removeEventListener('scroll',scroll);cancelAnimationFrame(raf);disposers.forEach(fn=>fn());bar.remove()};
},[route]);return null;
}