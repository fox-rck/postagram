const express = require("express"),
	db = require('../models/auth');

// Create a router for these stubs
let router = express.Router();

const sendErrorResponse = (res, code, message) =>{
	res
	.status(code)
	.send({
		message: message,
		status: "error",
	});
}

//
// Create a register stub
//
router.post("/register", async (req, res, next) => {
	let password_hash, salt;
	// Pull vars from the body
	const { email, password, firstname, lastname } = req.body;

	console.log(email, password, req.body);

	// generate password_hash
	try {
		salt = await bcrypt.genSalt(10);
		password_hash = await bcrypt.hash(password, salt);
	} catch (e) {
		console.error(e);
		return sendErrorResponse(res, 401, "Username or password is invalid.")
	}

	// TODO: We should be creating an email flow for verifying
	// the users email before activating the account
	try {
		// Create the user in the DB
		const newUser = await db.createUser({
			email: email,
			password: password_hash,
			salt: salt,
			firstname: firstname,
			lastname: lastname,
		});

	} catch (e) {
		return sendErrorResponse(res, 409, "Unable to create user.")
	}
	// Return a success
	res.send({ status: "success" });
});

//
// Login
//
router.post("/login", async (req, res, next) => {
	
	// Return a success
	res.send({ status: "success" });
});



module.exports = router;
