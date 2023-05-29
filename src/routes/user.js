const express = require("express")
const router = express.Router()
const userController = require('../app/controllers/UserController')

router.put('/edit/password', userController.changePassword)
router.put('/edit/profile', userController.editProfile)
router.get('/profile', userController.profile)

module.exports = router