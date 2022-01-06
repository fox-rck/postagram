module.exports = {
	generateToken: ()=>{

	}
	, validateUserToken: (req, res, next)=>{
		console.log('validateUserToken')
		next()
	}
}