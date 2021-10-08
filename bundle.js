(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;


},{}],2:[function(require,module,exports){
const currentId = localStorage.getItem('id')
const usersname = localStorage.getItem('username')
console.log(localStorage)
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

// function show() {
//     console.log('clicked')
//     document.getElementById('habitAddPage').classList.toggle('active')
// }




function showEdit(habitId) {
    document.getElementById('habitEditPage').classList.toggle('active2')
    const editHabitCheck =  document.getElementById('habitEditPage')
    const editSubmit = document.getElementById('editSubmit')
    const addHabit = document.getElementById('habitAddPage')
    if (addHabit.classList.contains('active')){
        show()
    }



    
    editSubmit.addEventListener('click', () => {
        const newFrequency = document.getElementById('frequencyEdit').value
        const newTargetDate = document.getElementById('targetDateEdit').value.toString()
       
        editHabit(habitId, newFrequency, newTargetDate)
    })

 

}

// const checkPositive = document.getElementById('positive')
// const frequency = document.querySelector('.frequency')

// checkPositive.addEventListener('click', getHabits)



function show() {
        // console.log('clicked')
        const habito = document.getElementById('habitAddPage')
        const editHabit = document.getElementById('habitEditPage')
        if (editHabit.classList.contains('active2') && !habito.classList.contains('active')) {
            showEdit()
        }
        document.getElementById('habitAddPage').classList.toggle('active')
        
    

    }

function postHabit(e) {
    e.preventDefault();
    let habitName = document.getElementById('habitName').value
    let frequency = document.getElementById('frequency').value
    let targetDate = document.getElementById('targetDate').value
    let negative = document.getElementById('negative')
    let frequencyType = document.querySelector('input[name="frequency"]:checked').value;
    
    let negValue 
    let habitData

    //console.log(negative.checked)
    
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
            userId: currentId,
            lastDoneDate: new Date()
        }
    } else {
        habitData = {
            habitName: habitName,
            frequency: frequency,
            targetDate: targetDate,
            habitType: negValue,
            userId: currentId,
            frequencyType: frequencyType,
            lastDoneDate: new Date()
        }
    }

        
     
    console.log(habitData)
    console.log(localStorage.getItem('token'))
    const url = `https://${host}/habits`
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
    document.getElementById('insertUsername').textContent = ` ${usersname}`;
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
            let streak = data[i].streak

           displayHabits(habitId, habitName, frequency, startDate, targetDate, habitType, streak)
        }
    })
}

function displayHabits(habitId, habitName, frequency, startDate, targetDate, habitType, streak) {
    const habitBox = document.getElementById('habit-container')
    const newHabit = document.createElement('div')
    
    const editNameStreak = document.createElement('div')
    const editDiv = document.createElement('div')
    const dots = document.createElement('h2')
    const editDel = document.createElement('div')
    const edit = document.createElement('a')
    const delet = document.createElement('a')
    const streakDisplay = document.createElement('p')
    
    const habitTitle = document.createElement('h2')
    const typeBtn = document.createElement('div')
    const plus = document.createElement('h1')

    dots.textContent = "..."
    habitTitle.textContent = habitName
    edit.textContent = "edit";
    delet.textContent = "delete"
    streakDisplay.textContent = `Current streak:   ${streak}🔥`
    
    if(habitType === true) {
        plus.textContent = '+'
    } else {
        plus.textContent = '-'
    }

    newHabit.classList.add(`habit-card`)
    dots.classList.add('edit')
    typeBtn.classList.add('typeBtn')
    habitTitle.classList.add('habitTitle')
    editDiv.classList.add('dropdown')
    editNameStreak.classList.add('editNameStreak')
    plus.classList.add('plusTings')
    streakDisplay.classList.add('streakDisplay')
    editDel.classList.add('editDel')
    delet.classList.add('delet')



    editDel.classList.add('dropdown-content')
    editDel.setAttribute('id','myDropdown')
    edit.setAttribute('id', 'showEditForm')
    typeBtn.setAttribute('id', 'typeButton')
    
    habitBox.appendChild(newHabit)
   
    newHabit.appendChild(editNameStreak)
    
    
    
    editNameStreak.appendChild(editDiv)
    editNameStreak.appendChild(habitTitle)
    editNameStreak.appendChild(streakDisplay)
    
    editDiv.appendChild(dots)
    editDiv.appendChild(editDel)
    editDel.appendChild(edit)
    editDel.appendChild(delet)
    
    
    
    newHabit.appendChild(typeBtn)
    typeBtn.appendChild(plus)
    
   
   // function for dropdown box showing edit and delete
  
    dots.addEventListener('click', (e) => showDrop(e))
    delet.addEventListener('click',() => deleteHabit(habitId))
    edit.addEventListener('click', () => showEdit(habitId))


    progressBar(habitId)

    
    
    // typeBtn.addEventListener('click', () => {
        if (typeBtn) {
            let count = 0;
        
              typeBtn.addEventListener("click",(e) => {
                if(count === 0) {
                  count ++;
              
                  addBadgepoint(e)
                  //addLastDoneDate(habitId)
                    let currentDate = new Date()
                    let updateInfo = {
                        freqStreak: 1,
                        lastDoneDate: currentDate
                    }
                    updateStreak(habitId, updateInfo)

                } else {
                  console.log('stop pressing')
                }
              } );
            }
  //  }
    //)
 

   
}

function showDrop (e) {
    const target = e.target.closest('div')
    let child = target.querySelector('.dropdown-content')
    console.log(target)
    child.style.display = "block"
    
}


  // Close the dropdown if the user clicks outside of it
  function close_dropdown(myDropdown) {
    // console.log('I am closing dropdown:',myDropdown)
    myDropdown.style.display = 'none'
  }
  
  // Close all dropdowns.
  function close_all_dropdowns() {
    var dropdowns = document.getElementsByClassName('dropdown-content')
    for (var i = 0; i < dropdowns.length; i++) {
      close_dropdown(dropdowns[i]);
    }
  }
  
  // Close all dropdowns when clicking outside.
  window.onclick = function (e) {
    if (!e.target.matches('.edit')) {
      close_all_dropdowns()
    }
  }



// function addLastDoneDate(id){
//     let url = `https://${host}/frequency/${id}`
//     const currentDate = new Date()
    

//     data = {
//         lastDoneDate: currentDate
//     }
//     console.log(data)

//     let options = {
//         method: "PATCH",
//         mode: 'cors',
//         headers: { "Content-Type": "application/json",
//                     "authorization": localStorage.getItem('token')
//                 },
//         body: JSON.stringify(data)
//     }
//     fetch(url,options)
//     .then(console.log('fetch succesful'))

// }

function addBadgepoint(e){
    e.preventDefault()
    let url = `https://${host}/users/${currentId}/`
    console.log('badge points increased')
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
        console.log((currentBadgePoints / 50) + "%")
        const badgeIcon = document.getElementById("badgeImage")
        const badgeTxt = document.getElementById('badgeId')
        const proBar = document.getElementById('myBar')
        if (currentBadgePoints > 150) {
            badgeIcon.src = "../badges/Gold.png"
            badgeTxt.textContent = "Gold 🍾"
            proBar.style.width = 100 + '%'
            proBar.style.backgroundColor = "#e9d310"
        } else if (currentBadgePoints >= 100) {
            badgeIcon.src = "../badges/Silver.png"
            badgeTxt.textContent = "Silver✨"
            proBar.style.width = (((currentBadgePoints-100) / 50)*100) + "%"
        } else if (currentBadgePoints >= 50) {
            badgeIcon.src = "../badges/Bronze.png"
            badgeTxt.textContent = "Bronze 👏"
            proBar.style.width = (((currentBadgePoints-50) / 50)*100) + "%"
        } else if (currentBadgePoints < 50) {
            badgeIcon.src = "../badges/no-badge.png"
            badgeTxt.textContent = "No badge, level up more! 🏃‍♂️"
            proBar.style.width = ((currentBadgePoints / 50)*100) + "%"
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

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

function progressBar(habitId) {
     let period
     let todaysDate = new Date()

     let url = `https://${host}/frequency/${habitId}`
     let options = {
        method: "GET",
        mode: 'cors',
        headers: { "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                }
    }

    fetch(url,options)
    .then(r=>r.json())
    .then(data => {

        console.log(data.freqStreak)

        let period
    if (data.frequencyType == 'daily') {
          period = 1
    } if (data.frequencyType == 'weekly') {
         period = 7
    } if (data.frequencyType == 'Monthly') {
         period = 30
    }
        let difference = addDays(data.lastDoneDate,period)
        console.log(difference<todaysDate)
        if (difference > todaysDate && data.freqStreak >= data.frequency) {
            let freqStreak = 0
            let streak = 1

            updatedFreqInfo = {
                streak: streak,
                freqStreak: freqStreak
            }

            updateStreak(habitId, updatedFreqInfo)

        } 
        
        else if (difference < todaysDate && data.freqStreak < data.frequency) {
            let freqStreak = 0
            let streak = 0

            updatedFreqInfo = {
                streak: streak,
                freqStreak: freqStreak
            }
    
            updateStreak(habitId, updatedFreqInfo)
        }
        
    })
}

function updateStreak(habitId, updatedFreqInfo) {
    console.log('Will it go through')
    let url = `https://${host}/frequency/${habitId}`
    let options = {
        method: "PATCH",
        mode: 'cors',
        headers: { "Content-Type": "application/json",
                    "authorization": localStorage.getItem('token')
                },
        body: JSON.stringify(updatedFreqInfo)
    }
    console.log('It has gone through')

    fetch(url,options)
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
const { addBadgepoint, postHabit, show, getHabits,  } = require("./dashboard");


const options = {
  linkSelector: "a",
  debugMode: true,
};


// var swup = new Swup(options);





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

const posCircle = document.getElementById('posCircle')
const negCircle = document.getElementById('negCircle')
posCircle.addEventListener('click', selectPos)
negCircle.addEventListener('click', selectPos)

function selectPos () {
  
  const isPositive = document.getElementById('positive')
  console.log(isPositive.checked)
  
  const plusIcon = document.querySelector('.plusIcon')
  const minusIcon = document.querySelector('.minusIcon')
  setTimeout(() => {
    if(isPositive.checked) {
    posCircle.classList.add('selectedCircle')
    negCircle.classList.remove('selectedCircle')
    plusIcon.classList.add('selectedIcon')
    minusIcon.classList.remove('selectedIcon')

}else {
    negCircle.classList.add('selectedCircle')
    posCircle.classList.remove('selectedCircle')
    minusIcon.classList.add('selectedIcon')
    plusIcon.classList.remove('selectedIcon')
}}, 10)
  
}

const logoutButton = document.getElementById("logOut");
  if(logoutButton) {
    logoutButton.addEventListener('click', logout);
  }

  function logout(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.replace('index.html');
}

const cancel = document.getElementById('cancel')

if(cancel) {
  cancel.addEventListener('click', () => {
    console.log('cancelled')
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
  if(posOrNeg) {posOrNeg.addEventListener('click', ()=>{
    console.log('hibiidy bidbioid')
    if(!checkPositive.checked) {
      hide()
    }
    else {
      unhide()
    }
  })}
  
  
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
    //confirmPassword.focus();
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

},{"./dashboard":2,"./loginAuth":3}]},{},[4,3,2]);
