const express = require("express")
const router = express.Router()
const conversationController = require('../app/controllers/ConversationController')
// const authMiddleware = require('../app/middlewares/AuthMiddleware')

router.post('/create', conversationController.create)

module.exports = router