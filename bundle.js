(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
async function requestLogin(e) {
	e.preventDefault();
	console.log("hello")
	console.log(e.target.usernameLogin.value)
	console.log(e.target.passwordLogin.value)
// 	try {
// 		const options = {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify({
// 				username: e.target.usernameLogin.value,
// 				password: e.target.passwordLogin.value
// 			})
// 		};
// 		const r = await fetch(
// 			`http://localhost:3000/auth`,
// 			options
// 		);
// 		const data = await r.json();
// 		console.log("data", data);
// 		if (!data.success) {
// 			throw new Error("Login not authorised");
// 		}
// 		login(data.token);
// 	} catch (err) {
// 		console.warn(err);
// 	}
// }

// function login(token) {
// 	const user = jwt_decode(token);
// 	localStorage.setItem("token", token);
// 	localStorage.setItem("username", user.username);
// 	localStorage.setItem("id", user.id);
// 	window.location.href = "../html/dashboard.html";
}

// function requestRegistration(){
// 	alert("Hello");
// }

async function requestRegistration(e) {
	e.preventDefault();
	console.log("hello")	
	console.log(e.target.usernameRegister.value);
	console.log(e.target.passwordRegister.value);
	// try {
	// 	const options = {
	// 		method: "POST",
	// 		headers: { "Content-Type": "application/json" },
	// 		body: JSON.stringify({
	// 			username: e.target.usernameRegister.value,
	// 			password: e.target.passwordRegister.value
	// 		})
	// 	};
		
	// 	const r = await fetch(
	// 		`https://localhost:3000/auth/register`,
	// 		options
	// 	);
	// 	const data = await r.json();
	// 	if (data.err) {
	// 		throw Error(data.err);
	// 		return;
	// 	}
	// 	window.location.href = "../html/index.html";
	// } catch (err) {
	// 	console.warn(err);
	// }
}


module.exports = {requestLogin: requestLogin,
requestRegistration:requestRegistration};

},{}],2:[function(require,module,exports){
// async function requestRegistration(e) {
// 	e.preventDefault();
// 	console.log("hello")	
// 	try {
// 		const options = {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify({
// 				username: e.target.username.value,
// 				email: e.target.email.value,
// 				password: e.target.password.value
// 			})
// 		};
// 		console.log(e.target.username.value);
// 		console.log(e.target.email.value);
// 		console.log(e.target.password.value);
// 		const r = await fetch(
// 			`https://localhost:3000/auth/register`,
// 			options
// 		);
// 		const data = await r.json();
// 		if (data.err) {
// 			throw Error(data.err);
// 			return;
// 		}
// 		window.location.href = "../html/index.html";
// 	} catch (err) {
// 		console.warn(err);
// 	}
// }



// module.exports =  {requestRegistration: requestRegistration} ;
},{}],3:[function(require,module,exports){
const { requestRegistration, requestLogin } = require("./loginAuth");

const options = {
  linkSelector: "a",
  debugMode: true,
};

//animation library
var swup = new Swup(options);

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
        console.log("hello hi")
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
},{"./loginAuth":1}]},{},[3,1,2]);
