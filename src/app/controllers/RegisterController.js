class RegisterController {
    async index(req, res) {
        res.render('register/index')
    }
}

module.exports = new RegisterController