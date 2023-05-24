const bcrypt = require('bcrypt')
const { User } = require('../models/User')

class RegisterController {
    async index(req, res) {
        if (req.session.user) {
            res.redirect('/')
        } else {
            res.render('register/index', {
                title: "Register",
                style: "register.css"
            })
        }
    }

    async save(req, res) {
        try {
            const { username, password, firstName, lastName, gender, birthday, email, telephone, address } = req.body
            const user = await User.getOne(username)
            if (user.rowCount == 1) {
                const conflicError = "Username already exists"
                res.json({
                    status: "fail",
                    msg: conflicError
                })
            } else {
                const salt = await bcrypt.genSalt(10)
                const hashed = await bcrypt.hash(password, salt)

                User.create(username, hashed, firstName, lastName, gender, birthday, email, telephone, address, 'active', false)
                    .then(data => {
                        res.status(200).json({
                            status: "success",
                            msg: "You have successfully registered a new account"
                        })
                    })
                    .catch(err => {
                        return res.status(500).json({ error: 'Error registering a new account' });
                    });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Error registering a new account' });
        }
    }
}

module.exports = new RegisterController