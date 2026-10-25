/* Ortho Alpha — foto original com fallback e hero sem falha de imagem */
(()=>{"use strict";
const hero=document.querySelector(".oa6-hero");
if(!hero)return;
const img=hero.querySelector(".oa6-photo img[data-oa7-hd]");
if(!img)return;
const remote=img.getAttribute("data-oa7-hd");
if(!remote)return;
const check=new Image();
check.decoding="async";
check.onload=()=>{
 if(check.naturalWidth>=1800){
   img.src=remote;
   img.width=check.naturalWidth;
   img.height=check.naturalHeight;
   img.removeAttribute("data-oa7-hd");
 }
};
check.onerror=()=>{img.removeAttribute("data-oa7-hd");};
check.src=remote;
})();