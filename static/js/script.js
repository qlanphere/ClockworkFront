const { requestLogin, requestRegistration } = require("./loginAuth");
const { addBadgepoint, postHabit, show, getHabits } = require("./dashboard");

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
    loginForm.addEventListener("submit", requestLogin);
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      console.log("e" + e);
      const pass = passwordMatch();
      if (pass) {
        // console.log("hello hi")
        e.preventDefault();
        requestRegistration(e);
      } else {
        e.preventDefault();
        passwordMatch(e);
      }
    });
  }
  const submitButton = document.getElementById("habitSubmit");
  if (submitButton) {
    submitButton.addEventListener("click", postHabit);
  }

  const showForm = document.getElementById("add-habit");
  if (showForm) {
    showForm.addEventListener("click", show);
  }

  const checkPositive = document.getElementById("positive");
  const frequency = document.querySelector(".frequency");
  if (checkPositive) {
    checkPositive.addEventListener("click", getHabits);
  }

  const badgeButton = document.getElementById("badgePoint");
  if (badgeButton) {
    let count = 0;
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    let todaysDate = `${year}-${month}-${day}`;

      badgeButton.addEventListener("click",(e) => {
        let currentDate = new Date();
        let currentTime = currentDate.getTime();
        let firstClick = currentTime;
        let secondsDay = 86400000;
        let timeDiff = secondsDay - currentTime;
        if(count === 0) {
          count ++;
          
          addBadgepoint(e)
        } else {
          console.log('stop pressing')
        }
      } );
    }});

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
const registerSubmit = document.getElementById("registrationSubmit");

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
  } else {
    return true;
  }
}
function hideRegistrationForm() {
  registerForm.classList.add("hideForm");
}

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

// event listener for badgepoint

module.exports = passwordMatch;
