async function requestLogin(e) {
	e.preventDefault();
	try {
		const options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: e.target.username.value,
				password: e.target.password.value
			})
		};
		const r = await fetch(
			`http://localhost:3000/auth`,
			options
		);
		const data = await r.json();
		console.log("data", data);
		if (!data.success) {
			throw new Error("Login not authorised");
		}
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
	window.location.href = "../html/dashboard.html";
}


module.exports = { requestLogin };