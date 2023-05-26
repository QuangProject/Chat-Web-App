const bcrypt = require('bcrypt')
const { User } = require('../models/User')

class RegisterController {
    async index(req, res) {
        if (req.session.user) {
            res.redirect('/')
        } else {
            res.render('register/index', {
                title: "Register",
                style: "register.css",
                script: "register.js"
            })
        }
    }

    async save(req, res) {
        try {
            const { username, password, firstName, lastName, gender, birthday, email, telephone, address } = req.body
            const user = await User.getOne(username)
            if (user.rowCount == 1) {
                return res.status(400).json({ error: "Username already exists" })
            } else {
                const salt = await bcrypt.genSalt(10)
                const hashed = await bcrypt.hash(password, salt)

                User.create(username, hashed, firstName, lastName, gender, birthday, email, telephone, address, null, 'active', false)
                    .then(data => {
                        return res.status(200).json({ message: "You have successfully registered a new account" })
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