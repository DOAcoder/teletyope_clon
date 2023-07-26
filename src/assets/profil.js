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

// --------------------auth guards----------------

window.addEventListener('DOMContentLoaded',()=>{
  if(!localStorage.getItem("token")){
    window.location.href="./index.html";
  }
})
// --------------------auth guards end----------------

// -------------------profile fetchi data-------

let id = localStorage.getItem("user");

async function getUser(){
  try{
    const response = await fetch('https"://nest-blog-qdsa.onrender.com/api/user/${id}');
    const result = await response.json();
    dataRender(result);
    listRender(result.blog,'posts');
    listRender(result.followers, 'follovers');
    listRender(result.followings, 'followings');
      
  }catch(err){
    console.log(err.message);
  }finally{
    console.log("tugadi");
  }
}
getUser();


// ----------------profile fetching data end

function dataRender(state){
  console.log(state);
  if(state){
    $('#user_name').textContent = state.username;
    $('#full_name').textContent = state.full_name;
  }
  
}


function listRender(state, selector){
  console.log(state);
  if(state.length){
    state?.forEach(()=>{
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `<img src="https://picsum.photos/id/12/300/300"<h1>lorem</h1>`
      $('#'+selector).append(card)
    })

  }else{
    $('#'+selector).innerHTML=`<h1 class="text-center">${selector.toUpperCase()} NOT FOUND</h1>`
  }
}

