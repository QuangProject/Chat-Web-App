class SiteController {
    index(req, res) {
        res.render('home')
    }

    profile(req, res) {
        res.render('site/profile')
    }

    logout(req, res) {
        if (req.session.user) {
            req.session.destroy();
            res.redirect('/');
        } else {
            res.render('login/index')
        }
    }
}

module.exports = new SiteController