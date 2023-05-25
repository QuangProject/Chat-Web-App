const bcrypt = require('bcrypt');
const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config()
const { User } = require('../models/User');
var userGoogle;

/*  Google AUTH  */
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/login/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        userGoogle = profile;
        return done(null, userGoogle);
    }
));

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
                        user_id: user.rows[0].user_id,
                        username: user.rows[0].username,
                        avatar: user.rows[0].avatar,
                        status: user.rows[0].status,
                        isAdmin: user.rows[0].is_admin
                    }
                    res.status(200).json({
                        message: "You have successfully logged in"
                    })
                } else {
                    res.status(400).json({ error: "Password is not correct" })
                }
            } else {
                res.status(400).json({ error: "Username is not correct" })
            }
        } catch (err) {
            return res.status(500).json({ error: 'Error logging in' });
        }
    }

    async googleCallback(req, res) {
        // console.log(userGoogle)
        const firstName = userGoogle.name.givenName
        const lastName = userGoogle.name.familyName
        const email = userGoogle.emails[0].value
        const avatar = userGoogle.photos[0].value
        const username = email.substr(0, email.indexOf('@'))

        const user = await User.getOne(username)
        if (user.rowCount == 1) {
            req.session.user = {
                user_id: user.rows[0].user_id,
                username: user.rows[0].username,
                avatar: user.rows[0].avatar,
                status: user.rows[0].status,
                isAdmin: user.rows[0].is_admin
            }
            res.redirect('/')
        } else {
            const password = "123456"
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(password, salt)

            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            // This arrangement can be altered based on how we want the date's format to appear.
            const currentDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

            User.create(username, hashed, firstName, lastName, true, currentDate, email, "", "", avatar, 'active', false)
                .then(user => {
                    req.session.user = {
                        user_id: user.rows[0].user_id,
                        username: user.rows[0].username,
                        avatar: user.rows[0].avatar,
                        status: user.rows[0].status,
                        isAdmin: user.rows[0].is_admin
                    }
                    res.redirect('/')
                })
                .catch(err => {
                    const conflicError = "Something is error"
                    res.render('login/index', {
                        title: "Login",
                        style: "login.css",
                        error: conflicError
                    })
                });
        }
    }

    error(req, res) {
        const conflicError = "Something is error"
        res.render('login/index', {
            title: "Login",
            style: "login.css",
            error: conflicError
        })
    }
}

module.exports = new LoginController