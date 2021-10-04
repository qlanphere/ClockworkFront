const options = {
    linkSelector: 'a',
    debugMode: true,
};


var swup = new Swup(options);


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
// const signUp = document.querySelector('a')
// signUp.addEventListener('click',(e)=>{
//     e.preventDefault();
//     showRegistration();
// });


//Validations for the input fields
const usernameRegister = document.getElementById("usernameRegister")
const passwordRegister = document.getElementById("passwordRegister")
const confirmPassword = document.getElementById("confirmPassword")

confirmPassword.addEventListener("focusout",(e)=>{
    if (passwordRegister.value !== confirmPassword.value){
        

    }
})

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