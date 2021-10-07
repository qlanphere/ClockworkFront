
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
  function hide() {
    frequency.classList.add('hidden')

}


const cancel = document.getElementById('cancel')

if(cancel) {
  cancel.addEventListener('click', () => {
  let habitName = document.getElementById('habitName')
  let frequency = document.getElementById('frequency')
  let targetDate = document.getElementById('targetDate')
  document.getElementById('habitAddPage').classList.toggle('active')
  habitName.value = ""
  frequency.value = ""
  targetDate.value = ""

}) 
}

const cancelEdit = document.getElementById('editCancel')
if (cancelEdit) {
  cancelEdit.addEventListener('click', () => {
    let editFrequency = document.getElementById('frequencyEdit')
    let editTargetDate = document.getElementById('targetDateEdit')
    document.getElementById('habitEditPage').classList.toggle('active2')
    editFrequency.value = ""
    editTargetDate.value = ""
  })
}




function unhide(){
  frequency.classList.remove('hidden')
}
  const posOrNeg = document.getElementById('posOrNeg')
  const checkPositive = document.getElementById('positive');
  const frequency = document.querySelector(".frequency");
  
  posOrNeg.addEventListener('click', ()=>{
    console.log('hibiidy bidbioid')
    if(!checkPositive.checked) {
      hide()
    }
    else {
      unhide()
    }
  })
  
  // const typeButton = document.getElementById('typeButton')
  // const badgeButton = document.getElementById("badgePoint");
  
  });

// Hiding the registration form when the page loads
document.addEventListener("DOMContentLoaded", (e) => {
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



// // event listener for badgepoint
// const badgeButton  = document.getElementById("badgePoint")
// badgeButton.addEventListener("click",addBadgepoint);

// event listener for badgepoint

module.exports = passwordMatch;
