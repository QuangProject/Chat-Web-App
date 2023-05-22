const bcrypt = require('bcrypt')
const { User } = require('../models/User')

class RegisterController {
    async index(req, res) {
        res.render('register/index')
    }

    async save(req, res) {
        try {
            const { username, password, firstName, lastName, email } = req.body

            const user = await User.getOne(username)

            if (user.rowCount == 1) {
                const conflicError = "User already exists!"
                res.render('register/register', {
                    error: conflicError,
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                })
            } else {
                const salt = await bcrypt.genSalt(10)
                const hashed = await bcrypt.hash(password, salt)

                User.create(username, hashed, firstName, lastName, email, 'active')
                    .then(data => {
                        res.json({
                            status: "successfully"
                        })
                    })
                    .catch(err => {
                        const conflicError = "Something is error 1"
                        res.render('register/register', { error: conflicError })
                    });
            }
        } catch (error) {
            const conflicError = "Something is error"
            res.render('register/index', { error: conflicError })
        }
    }
}

module.exports = new RegisterController