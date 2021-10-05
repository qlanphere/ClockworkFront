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
        `http://localhost:3000/auth/login/`,
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
			`http://localhost:3000/auth/register/`,
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
