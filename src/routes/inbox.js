const express = require("express")
const router = express.Router()
const inboxController = require('../app/controllers/InboxController')
// const authMiddleware = require('../app/middlewares/AuthMiddleware')

router.get('/', inboxController.index)

module.exports = router