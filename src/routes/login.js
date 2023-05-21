const express = require("express")
const router = express.Router()
const loginController = require('../app/controllers/LoginController')
// const authMiddleware = require('../app/middlewares/AuthMiddleware')

router.get('/', loginController.index)

module.exports = router