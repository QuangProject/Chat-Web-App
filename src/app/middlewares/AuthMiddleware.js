class AuthMiddleware {
    // User login to access
    isAuth(req, res, next) {
        if (req.session.user) {
            res.locals.user = req.session.user
            next()
        } else {
            res.redirect('/login')
        }
    }

    // User or admin can access
    freedom(req, res, next) {
        if (req.session.user) {
            res.locals.user = req.session.user
            next()
        } else {
            next()
        }
    }

    // Only admin can access
    isAdmin(req, res, next) {
        if (req.session.user && req.session.user.isAdmin) {
            res.locals.user = req.session.user
            next()
        } else if (req.session.user && !req.session.user.role) {
            res.locals.user = req.session.user
            res.redirect('/')
        } else {
            res.redirect('/login')
        }
    }
}
module.exports = new AuthMiddleware