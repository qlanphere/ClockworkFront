const options = {
    linkSelector: 'a',
    debugMode: true,
};

//animation library
var swup = new Swup(options);


// Hiding the registration form when the page loads
document.addEventListener('DOMContenLoaded', (e) => {
    e.preventDefault();
    hideRegistrationForm();
});


//Validations for the input fields
const usernameRegister = document.getElementById("usernameRegister")
const passwordRegister = document.getElementById("passwordRegister")
const confirmPassword = document.getElementById("confirmPassword")
const popUp = document.getElementById("passwordPopup");

confirmPassword.addEventListener("blur", (e) => {
    passwordMatch();
})


function passwordMatch() {
    console.log(passwordRegister.value)
    console.log(confirmPassword.value)
    if (passwordRegister.value !== confirmPassword.value) {
        popUp.classList.toggle("show")
        confirmPassword.focus();
    }
}
function hideRegistrationForm() {
    registerForm.classList.add('hideForm')
}


//Eventlisteners on submit buttons
window.addEventListener("load",()=> {
    const loginForm = document.getElementById('loginForm')
    const registerForm = document.getElementById('registrationForm')
    loginForm.addEventListener('submit', requestLogin);
    registerForm.addEventListener('submit', requestRegistration);
})








// Shows the registration form when the sign up link is clicked
// const signUp = document.querySelector('a')
// signUp.addEventListener('click',(e)=>{
//     e.preventDefault();
//     showRegistration();
// });
// function showRegistration(){
//     registerForm.classList.remove('hideForm')
//     loginForm.classList.add('hideForm')
// }