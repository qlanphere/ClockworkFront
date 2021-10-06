(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;


},{}],2:[function(require,module,exports){
const jwt_decode = require('jwt-decode');

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
        `https://clockworkback.herokuapp.com/auth/login/`,
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
			`https://clockworkback.herokuapp.com/auth/register/`,
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

},{"jwt-decode":1}],3:[function(require,module,exports){
// async function requestRegistration(e) {
// 	e.preventDefault();
// 	// console.log("hello")	
// 	// console.log(e.target.usernameRegister.value);
// 	// console.log(e.target.passwordRegister.value);
// 	try {
// 		const options = {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify({
// 				"userName": e.target.usernameRegister.value,
// 				"password": e.target.passwordRegister.value
// 			})
// 		};
		
// 		const r = await fetch(
// 			`http://localhost:3000/auth/register/`,
// 			options
// 		);
// 		const data = await r.json();
// 		if (data.err) {
// 			throw Error(data.err);
// 		}
// 		// window.location.replace("index.html");
// 	} catch (err) {
// 		console.warn(err);
// 	}
// }


// module.exports = {requestRegistration:requestRegistration};
},{}],4:[function(require,module,exports){
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

module.exports = passwordMatch;
},{"./loginAuth":2}]},{},[4,2,3]);
