const express = require("express")
const router = express.Router()
const passport = require('passport');
const loginController = require('../app/controllers/LoginController')

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login/error' }), loginController.googleCallback)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/error', loginController.error);
router.post('/auth', loginController.auth)
router.get('/', loginController.index)

module.exports = router