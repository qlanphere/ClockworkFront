// const { requestLogin } = require("../js/loginAuth");
// const { requestRegistration } = require("../js/registerAuth");


const loginForm = document.getElementById('loginForm')
const registerForm =  document.getElementById('registrationForm')


// Hiding the registration form when the page loads
document.addEventListener('DOMContenLoaded',(e)=>{
    e.preventDefault();
    hideRegistrationForm();
});

// Shows the registration form when the sign up link is clicked
const signUp = document.querySelector('a')
signUp.addEventListener('click',(e)=>{
    e.preventDefault();
    showRegistration();
});


function hideRegistrationForm(){
    registerForm.classList.add('hideForm')
}   

function showRegistration(){
    registerForm.classList.remove('hideForm')
    loginForm.classList.add('hideForm')
}

//Eventlisteners on submit buttons
// loginForm.addEventListener('submit',requestLogin);
// registerForm.addEventListener('submit',requestRegistration)