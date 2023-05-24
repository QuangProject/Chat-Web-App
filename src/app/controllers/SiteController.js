class SiteController {
    index(req, res) {
        res.render('home', {
            title: "Chat App",
            style: "home.css"
        })
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