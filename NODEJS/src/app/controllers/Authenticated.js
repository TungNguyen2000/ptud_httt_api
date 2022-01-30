
class Authenticated {
	checkAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			return next()
		}
		res.redirect('/login')
	}


	// checkAuthenticatedShipper(req, res, next) {
	// 	if (req.isAuthenticated()) {
	// 		if(req.user.shipper.userId != 0){
	// 			return res.redirect('/shipper')
	// 		}
	// 		return res.redirect('/')
	// 	}
	// 	res.redirect('/login')
	// }

	checkNotAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			return res.redirect('/')
		}
		next()
	}
}
module.exports = new Authenticated()