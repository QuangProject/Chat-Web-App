const bcrypt = require('bcrypt')
const { User } = require('../models/User')

class LoginController {
    async index(req, res) {
        res.render('login/index')
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
                    req.session.user = { username: user.rows[0].username, role: user.rows[0].status }
                    res.json({
                        status: "success"
                    })
                } else {
                    const conflicError = "Password is not correct"
                    res.json({
                        status: "fail",
                        msg: conflicError
                    })
                }
            } else {
                const conflicError = "User is not exist"
                res.json({
                    status: "fail",
                    msg: conflicError
                })
            }
        } catch (err) {
            const conflicError = "Something is error"
            res.json({
                status: "fail",
                msg: conflicError
            })
        }
    }
}

module.exports = new LoginController