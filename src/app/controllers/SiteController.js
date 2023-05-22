class SiteController {
    async index(req, res) {
        res.render('home')
    }

    logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = new SiteController