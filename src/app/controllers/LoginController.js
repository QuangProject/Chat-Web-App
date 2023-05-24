const bcrypt = require('bcrypt')
const { User } = require('../models/User')

class LoginController {
    async index(req, res) {
        if (req.session.user) {
            res.redirect('/')
        } else {
            res.render('login/index', {
                title: "Login",
                style: "login.css"
            })
        }
    }

    async auth(req, res) {
        const { username, password } = req.body
        try {
            var user = await User.getOne(username)
            if (user.rowCount == 1) {
                const validPass = await bcrypt.compare(
                    password,
                    user.rows[0].password
                )
                if (validPass) {
                    req.session.user = {
                        username: user.rows[0].username,
                        status: user.rows[0].status,
                        isAdmin: user.rows[0].is_admin
                    }
                    res.status(200).json({
                        status: "success"
                    })
                } else {
                    const conflicError = "Password is not correct"
                    res.status(200).json({
                        status: "fail",
                        msg: conflicError
                    })
                }
            } else {
                const conflicError = "User is not exist"
                res.status(200).json({
                    status: "fail",
                    msg: conflicError
                })
            }
        } catch (err) {
            return res.status(500).json({ error: 'Error logging in' });
        }
    }
}

module.exports = new LoginController