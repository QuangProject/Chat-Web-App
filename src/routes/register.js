const express = require("express")
const router = express.Router()
const registerController = require('../app/controllers/RegisterController')
// const authMiddleware = require('../app/middlewares/AuthMiddleware')

router.post('/save', registerController.save)
router.get('/', registerController.index)

module.exports = router