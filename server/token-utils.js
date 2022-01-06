/*
/ Rick Fox
/ 01-06-22
/ JSON Web Token utils
*/

const fs = require('fs'),
	cert = fs.readFileSync( path.join(__dirname, 'private.key'), 'utf8');  // get private key

module.exports = {
	generateToken: (user_id) => {
      const scope = "api";
      return jwt.sign({ id: user_id, scope: scope}, cert);
	}
	, validateUserToken: (req, res, next)=>{
		console.log('validateUserToken')
		next()
	}
}