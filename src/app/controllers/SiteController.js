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
            res.render('login/index', {
                title: "Login",
                style: "login.css",
                script: "login.js"
            })
        }
    }
}

module.exports = new SiteController