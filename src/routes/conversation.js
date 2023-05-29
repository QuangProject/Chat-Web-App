const express = require("express")
const router = express.Router()
const conversationController = require('../app/controllers/ConversationController')
// const authMiddleware = require('../app/middlewares/AuthMiddleware')

// remove conversation
router.delete('/remove/:conversationId', conversationController.remove)
router.post('/create', conversationController.create)

module.exports = router