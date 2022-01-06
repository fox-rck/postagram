/*
/ Rick Fox
/ 01-06-22
/ JSON Web Token utils
*/

const fs = require("fs");
(path = require("path")),
	(jwt = require("jsonwebtoken")),
	(cert = fs.readFileSync(path.join(__dirname, "private.key"), "utf8")); // get private key

module.exports = {
	generateJwtToken: (user_id) => {
		const scope = "api";
		return jwt.sign({ user_id: user_id, scope: scope }, cert);
	},
	validateUserToken: (req, res, next) => {
		// get the authorization header from the request
		const { authorization } = req.headers;

		// ensure it exists
		if (!authorization) {
			res.sendStatus(401);
		}

		try {
			// Decode the authorization header
			const token = jwt.verify(
				authorization.replace("Bearer ", ""),
				cert
			);

			// ensure this token is for this user
			if (token.user_id != req.params.userId) {
				return res.sendStatus(401);
			}
			// set the token to the request
			req.token = token;
			// allow the next handler to process
			next();
		} catch (e) {
			console.log("error", e);
			// err
			res.sendStatus(401);
		}
	},
};
