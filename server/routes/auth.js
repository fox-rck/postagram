/*
/ Rick Fox
/ 01-06-22
/ Auth route handlers
*/

const express = require("express"),
	bcrypt = require('bcryptjs'),
	db = require("../models/auth"),
	utils = require("../token-utils");

// Create a router for these stubs
let router = express.Router();

const sendErrorResponse = (res, code, message) => {
	res.status(code).send({
		message: message,
		status: "error",
	});
};

//
// Create a register stub
//
router.post("/register", async (req, res, next) => {
	let password_hash, salt;
	// Pull vars from the body
	const { email, password, firstname, lastname } = req.body;

	console.log(email, password, req.body);

	// ensure the user doesnt exist
	try {
		let user = await db.getUserByEmail(email)
		if (user.id) {
			// a user with that email exists
			return sendErrorResponse(res, 400, "User already exists");
		}
	} catch (e) {
		console.error(e);
		return sendErrorResponse(res, 400, "User already exists");
	}

	// generate password_hash
	try {
		salt = await bcrypt.genSalt(10);
		password_hash = await bcrypt.hash(password, salt);
	} catch (e) {
		console.error(e);
		return sendErrorResponse(res, 401, "Username or password is invalid.");
	}

	/*
	/ TODO: We should be creating an email flow for verifying
	/ the users email before activating the account
	/ instead for demo purposes we will auto login the user
	*/
	let newUser;
	try {
		// Create the user in the DB
		newUser = await db.createUser({
			email: email,
			password: password_hash,
			salt: salt,
			firstname: firstname,
			lastname: lastname,
		});
	} catch (e) {
		return sendErrorResponse(res, 409, "Unable to create user.");
	}

	// Make a JWT for the user to auto log them in
	const jwt_token = utils.generateJwtToken(newUser.id);

	// return jwt token and user_id
	res.send({ status: "success", token: jwt_token, user_id: newUser.id });
});

//
// Login
//
router.post("/login", async (req, res, next) => {
	// Pull vars from the body
	const { email, password } = req.body;

	let user;
	try {
		// get the user from the DB
		user = await db.getUserByEmail(email);
	} catch (e) {
		console.error(e);
		return sendErrorResponse(res, 401, "Username or password is invalid.");
	}
	console.log("user", user);
	// ensure there is a user
	if (!user) {
		return sendErrorResponse(res, 401, "Username or password is invalid.");
	}

	// see if password hashes matches
	const match = await bcrypt.compare(password, user.password_hash);

	if (!match) {
		console.error("Password does not match");
		return sendErrorResponse(res, 401, "Username or password is invalid.");
	}

	const jwt_token = utils.generateJwtToken(user.id);

	/* 
    /  TODO: We should be using a refresh token here with an expiring JWT token
    /  for this demo we are going to ignore any JWT expiration in the api
	*/

	// return jwt token and user_id
	res.send({ status: "success", token: jwt_token, user_id: user.id });
});

module.exports = router;
