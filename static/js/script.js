const { addBadgepoint } = require("./dashboard");
const { requestLogin, requestRegistration } = require("./loginAuth");


const options = {
  linkSelector: "a",
  debugMode: true,
};

//animation library
//var swup = new Swup(options);

//Eventlisteners on submit buttons
window.addEventListener("load", () => {
  const loginForm = document.getElementById("loginForm");  
  const registerForm = document.getElementById("registrationForm");
  if (loginForm) {
    loginForm.addEventListener("submit",requestLogin);
  }

  if (registerForm){
  registerForm.addEventListener("submit", (e)=>{
    console.log("e" + e);  
    const pass = passwordMatch();
    if (pass){ 
        // console.log("hello hi")
        e.preventDefault();
        requestRegistration(e);
    }
    else {
        e.preventDefault(); 
        passwordMatch(e);
    }
    
  })
  }
})

// Hiding the registration form when the page loads
document.addEventListener("DOMContenLoaded", (e) => {
  e.preventDefault();
  hideRegistrationForm();
});

//Validations for the confirm passsword
const usernameRegister = document.getElementById("usernameRegister");
const passwordRegister = document.getElementById("passwordRegister");
const confirmPassword = document.getElementById("confirmPassword");
const popUp = document.getElementById("passwordPopup");
const registerSubmit = document.getElementById('registrationSubmit')

if (confirmPassword) {
    confirmPassword.addEventListener("blur", (e) => {
    passwordMatch();
  });
}


function passwordMatch() {
  console.log(passwordRegister.value);
  console.log(confirmPassword.value);
  if (passwordRegister.value !== confirmPassword.value) {
    popUp.classList.toggle("show");
    confirmPassword.focus();
    return false;
  }
  else {
      return true;
  }
}
function hideRegistrationForm() {
  registerForm.classList.add("hideForm");
}



// // event listener for badgepoint
// const badgeButton  = document.getElementById("badgePoint")
// badgeButton.addEventListener("click",addBadgepoint);

module.exports = passwordMatch;