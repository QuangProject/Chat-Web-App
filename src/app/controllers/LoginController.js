class LoginController {
    async index(req, res) {
        res.render('login/index')
    }
}

module.exports = new LoginController