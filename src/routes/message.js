const express = require("express")
const router = express.Router()
const messageController = require('../app/controllers/MessageController')


// create a new message
router.post('/create', messageController.create)
router.get('/:conversationId', messageController.conversation)

module.exports = router