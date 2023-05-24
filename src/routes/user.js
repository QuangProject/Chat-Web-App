const express = require("express")
const router = express.Router()
const userController = require('../app/controllers/UserController')

router.post('/edit/save', userController.editProfile)
router.get('/profile', userController.profile)

module.exports = router