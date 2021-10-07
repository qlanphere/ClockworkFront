(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;


},{}],2:[function(require,module,exports){
const currentId = localStorage.getItem('id')
console.log(localStorage);
const host = 'clockworkback.herokuapp.com'//'localhost'
//const port = 3000
// const submitButton = document.getElementById('habitSubmit')
// submitButton.addEventListener('click', postHabit)

window.addEventListener('DOMContentLoaded', getHabits)



const bronze = "../badges/Bronze.png"
const silver = "../badges/Silver.png"
const gold = "../badges/Gold.png"

// const showForm = document.getElementById('add-habit')
// showForm.addEventListener('click', show)


function show() {
    console.log('clicked')
    document.getElementById('habitAddPage').classList.toggle('active')
}

function showEdit(habitId) {
    document.getElementById('habitEditPage').classList.toggle('active2')
    const editSubmit = document.getElementById('editSubmit')
    
    editSubmit.addEventListener('click', () => {
        const newFrequency = document.getElementById('frequencyEdit').value
        const newTargetDate = document.getElementById('targetDateEdit').value.toString()
       
        editHabit(habitId, newFrequency, newTargetDate)
    })



}

// const checkPositive = document.getElementById('positive')
// const frequency = document.querySelector('.frequency')

// checkPositive.addEventListener('click', getHabits)



function postHabit(e) {
    e.preventDefault();
    let habitName = document.getElementById('habitName').value
    let frequency = document.getElementById('frequency').value
    let targetDate = document.getElementById('targetDate').value
    let negative = document.getElementById('negative')
    let negValue 
    let habitData

    console.log(negative.checked)
    
    if(negative.checked) {
        negValue = false 
    } else {
        negValue = true
    }

    if(frequency === "") {
        habitData = {
            habitName: habitName,
            targetDate: targetDate,
            habitType: negValue,
            userId: currentId
        }
    } else {
        habitData = {
            habitName: habitName,
            frequency: frequency,
            targetDate: targetDate,
            habitType: negValue,
            userId: currentId
        }
    }

        
     
    console.log(habitData)
    console.log(localStorage.getItem('token'))
    const url = `https://${host}/habits `
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            "authorization":localStorage.getItem('token')
        },
        body: JSON.stringify(habitData)
    }
    console.log(options.body)
    fetch(url, options)
    .then(() => location.reload())
}

async function getHabits(e) {
    loadBadge()
    e.preventDefault()

    let url = `https://${host}/habits/user/${currentId}`
    let options = {
        method: "GET",
        mode: 'cors',
        headers: { "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                }
    }

    fetch(url, options)
    .then(r => r.json())

    .then(data => {
        console.log(data)
        for(let i=0;i<data.length;i++) {
            
            let habitId = data[i].habitid
            let habitName = data[i].habitName
            let frequency = data[i].frequency
            let startDate = data[i].startDate
            let targetDate = data[i].targetDate
            let habitType = data[i].habitType

           displayHabits(habitId, habitName, frequency, startDate, targetDate, habitType)
        }
    })
}

function displayHabits(habitId, habitName, frequency, startDate, targetDate, habitType) {
    const habitBox = document.getElementById('habit-container')
    const newHabit = document.createElement('div')
    
    const editDiv = document.createElement('div')
    const dots = document.createElement('h2')
    const editDel = document.createElement('div')
    const edit = document.createElement('a')
    const delet = document.createElement('a')
    
    const habitTitle = document.createElement('h2')
    const typeBtn = document.createElement('h2')

    dots.textContent = "..."
    habitTitle.textContent = habitName
    edit.textContent = "edit";
    delet.textContent = "delete"
    
    if(habitType === true) {
        typeBtn.textContent = '+'
    } else {
        typeBtn.textContent = '-'
    }

    newHabit.classList.add(`habit-card`)
    dots.classList.add('edit')
    typeBtn.classList.add('typeBtn')
    habitTitle.classList.add('habitTitle')
    editDiv.classList.add('dropdown')

    editDel.classList.add('dropdown-content')
    editDel.setAttribute('id','myDropdown')
    edit.setAttribute('id', 'showEditForm')
    typeBtn.setAttribute('id', 'typeButton')
    
    habitBox.appendChild(newHabit)
   
    newHabit.appendChild(editDiv)
    editDiv.appendChild(dots)
    editDiv.appendChild(editDel)
    editDel.appendChild(edit)
    editDel.appendChild(delet)
    
    newHabit.appendChild(habitTitle)
    newHabit.appendChild(typeBtn)
    
   
   // function for dropdown box showing edit and delete
  
    dots.addEventListener('click', (e) => showDrop(e))
    delet.addEventListener('click',() => deleteHabit(habitId))
    edit.addEventListener('click', () => showEdit(habitId))
    
    typeBtn.addEventListener('click', () => {
        if (typeBtn) {
            let count = 0;
            let today = new Date();
            let day = today.getDate();
            let month = today.getMonth();
            let year = today.getFullYear();
            let todaysDate = `${year}-${month}-${day}`;
        
              typeBtn.addEventListener("click",(e) => {
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
            }
    })
 

   
}

function showDrop (e) {
    const target = e.target.closest('div')
    let child = target.querySelector('.dropdown-content')
    console.log(target)
    child.classList.toggle('show')
}







function addBadgepoint(e){
    e.preventDefault()
    let url = `https://${host}/users/${currentId}/`
    let options = {
        method: "PATCH",
        mode: 'cors',
        headers: { "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                }
    }
    fetch(url,options)
  
    
}

function loadBadge() {
    let url = `https://${host}/users/${currentId}/`
    let optionsBadge = {
        method: "GET",
        mode: 'cors',
        headers: { "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                }
    }
    fetch(url, optionsBadge)
    .then(r => r.json())
    .then(data => {
        const currentBadgePoints = data.badgePoints;
        console.log(currentBadgePoints)
        const badgeIcon = document.getElementById("badgeImage")
        if (currentBadgePoints > 150) {
            badgeIcon.src = "../../badges/Gold.png"
        } else if (currentBadgePoints > 100) {
            badgeIcon.src = "../../badges/Silver.png"
        } else if (currentBadgePoints > 50) {
            badgeIcon.src = "../../badges/Bronze.png"
        }
    })
}



function deleteHabit(id) {
    let url = `https://${host}/habits/${id}`
    let options = {
        method: 'DELETE',
        mode: 'cors',
        headers: { "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                }
    }
    fetch(url,options)
    .then(() => location.reload())
}

function editHabit(id, frequency, targetDate) {
    console.log(id)
    console.log(frequency)
    console.log(targetDate)

    let url = `https://${host}/habits/${id}`

    updatedHabitInfo = {
        frequency: frequency,
        targetDate: targetDate
    }

    let options = {
        method: "PATCH",
        mode: 'cors',
        headers: { "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                },
        body: JSON.stringify(updatedHabitInfo)
    }
    fetch(url,options)
    .then(() => location.reload())
}

module.exports = { displayHabits, getHabits, postHabit, show, addBadgepoint, editHabit, loadBadge}



},{}],3:[function(require,module,exports){
const jwt_decode = require('jwt-decode');
host = 'clockworkback.herokuapp.com'
async function requestLogin(e) {
    e.preventDefault();
    // console.log("hello")
    // console.log(e.target.usernameLogin.value)
    // console.log(e.target.passwordLogin.value)
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "userName": e.target.usernameLogin.value,
          "password": e.target.passwordLogin.value
        })
      };
      console.log('i made it')
      const r = await fetch(
        `https://${host}/auth/login/`,
        options
      );
      console.log('im here too')
      const data = await r.json();
      if (!data.success) {
        throw new Error("Login not authorised");
      }
	  console.log(data)
      login(data.token);
    } catch (err) {
      console.warn(err);
    }
  }
  
  function login(token) {
    const user = jwt_decode(token);
    localStorage.setItem("token", token);
    localStorage.setItem("username", user.username);
    localStorage.setItem("id", user.id);
	console.log(localStorage.getItem("token"))
	console.log(user.id)
    window.location.replace("dashboard.html");
  }


  async function requestRegistration(e) {
	e.preventDefault();
	// console.log("hello")	
	// console.log(e.target.usernameRegister.value);
	// console.log(e.target.passwordRegister.value);
	try {
		const options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				"userName": e.target.usernameRegister.value,
				"password": e.target.passwordRegister.value
			})
		};
		
		const r = await fetch(
			`https://${host}/auth/register/`,
			options
		);
		const data = await r.json();
		if (data.err) {
			throw Error(data.err);
		}
		window.location.replace("index.html");
	} catch (err) {
		console.warn(err);
	}
}


module.exports = {requestLogin: requestLogin, requestRegistration: requestRegistration};

},{"jwt-decode":1}],4:[function(require,module,exports){
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

},{"./dashboard":2,"./loginAuth":3}]},{},[4,3,2]);
