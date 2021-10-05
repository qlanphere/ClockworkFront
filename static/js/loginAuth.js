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
