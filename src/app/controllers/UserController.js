const { User } = require('../models/User')

class UserController {
    async profile(req, res) {
        const username = req.session.user.username
        var user = await User.getOne(username)
        res.render('user/profile', {
            user: user.rows[0],
            title: "Profile",
            style: "profile.css"
        })
    }

    editProfile(req, res) {
        const { first_name, last_name, gender, birthday, address, telephone } = req.body
        if (req.file) {
            const avatar = req.file.filename
            console.log(avatar)
        }
        console.log({ first_name, last_name, gender, birthday, address, telephone })
        res.json({
            status: "successfully"
        })
    }
}

module.exports = new UserController