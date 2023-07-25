"use strict"
import utilis from "./utilis.js";
let{$$,$}=utilis;

function hideContent(){
  $$(".tab_content").forEach((item)=>{
    item.style.display="none"
  })
  $$(".active_tab").forEach((item)=>{
   
      item.classList.remove("active_tab")
  
    
  });
}


function showContent(index){
  $$(".tab_content")[index].style.display="block";
  $$(".tab_item")[index].classList.add("active_tab");
}

$$(".tab_item").forEach((item ,index)=>{
  item.addEventListener("click",()=>{
    
    hideContent();
    
    localStorage.setItem('active_index',index);
    showContent(index);
  })
})
hideContent();
showContent(localStorage.getItem('active_index') || 0);