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


module.exports = {requestRegistration:requestRegistration};