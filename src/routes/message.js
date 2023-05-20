const express = require("express")
const router = express.Router()
const messageController = require('../app/controllers/MessageController')
// const authMiddleware = require('../app/middlewares/AuthMiddleware')

router.get('/', messageController.index)

module.exports = router