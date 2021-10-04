async function requestRegistration(e) {
	e.preventDefault();
	passwordMatch();
	try {
		const options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: e.target.username.value,
				email: e.target.email.value,
				password: e.target.password.value
			})
		};
		console.log(e.target.username.value);
		console.log(e.target.email.value);
		console.log(e.target.password.value);
		const r = await fetch(
			`https://localhost:3000/auth/register`,
			options
		);
		const data = await r.json();
		if (data.err) {
			throw Error(data.err);
			return;
		}
		window.location.href = "../html/index.html";
	} catch (err) {
		console.warn(err);
	}
}

module.exports =  requestRegistration ;