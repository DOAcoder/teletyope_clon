// ------------------BISMILLAHIR ROHMANIR ROHIYM-------------

import utilis from "./assets/utilis.js";
import api from "./assets/auth.js";

let { $, $$ } = utilis;
let { signIn, signUp } = api;

/////------------ BTN CHANGE ACTION

$$(".change-btn").forEach((button, index) => {
  button.addEventListener("click", () => {
    localStorage.setItem("tabNumber", index);
    showContent(index);
  });
});
////------------- TAB ACTIVATION ACTIONS

function hideContent() {
  $$(".tab-item").forEach((tab) => {
    tab.style.display = "none";
  });
}

function showContent(index = 1) {
  hideContent();
  $$(".tab-item")[index].style.display = "block";
}
hideContent();
showContent(localStorage.getItem("tabNumber") || 1);

///--------------- MODAL ACTIONS------------

$("#openModal").addEventListener("click", () => {
  $(".modal-wrapper").classList.add("grid");
  $(".modal-wrapper").classList.remove("hidden");
});

$("#closeModal").addEventListener("click", () => {
  $(".modal-wrapper").classList.add("hidden");
  $(".modal-wrapper").classList.remove("grid");
});
///--------------- MODAL ACTIONS END------------

//------------- authorization action---------------

$("#signup").addEventListener("click", (e) => {
  e.preventDefault();
  const singUpForm = {
    full_name: $("#full_name").value,
    password: $("#password").value,
    username: $("#user_name").value,
  };
  if ($("#confirm_password").value.trim() === singUpForm.password.trim()) {
    $("#password").classList.add("border", "border-2", "border-green-500");
    $("#confirm_password").classList.add(
      "border",
      "border-2",
      "border-green-500"
    );

    signUp(singUpForm)
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode == "400") {
          alert(result.message);
        } else {
          alert("Success!");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  } else {
    $("#password").classList.add("border", "border-2", "border-red-500");
    $("#confirm_password").classList.add(
      "border",
      "border-2",
      "border-red-500"
    );
  }
});



$("#signin").addEventListener("click", (e) => {
  e.preventDefault();
  const singInForm = {
   
    password: $("#login_password").value,
    username: $("#login_user").value,
  };
  if (singInForm.password.trim().length === 0 || singInForm.username.trim().length === 0){
    alert("Please enter your password or username");
    $("#login_password").classList.add("border", "border-2", "border-red-500");
    $("#login_user").classList.add("border", "border-2", "border-red-500");
    
  } else {
    
    signIn(singInForm)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        localStorage.setItem('token', result.token);
        localStorage.setItem('user',result.user.id);
        localStorage.setItem('usernam',result?.user?.fuul_name);
        window.location.href ="./profile.html"
        if (result.statusCode == "400") {
          alert(result.message);
          $("#login_password").classList.add("border", "border-2", "border-red-500");
          $("#login_user").classList.add("border", "border-2", "border-red-500");

        } else {
          alert("Success!");
          $("#login_password").classList.add("border", "border-2", "border-green-500");
          $("#login_user").classList.add("border", "border-2", "border-green-500");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
     
      
   
  }
});

//------------- authorization action end---------------
