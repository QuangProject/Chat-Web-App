const express = require("express")
const router = express.Router()
const friendRequestController = require('../app/controllers/FriendRequestController')
// const authMiddleware = require('../app/middlewares/AuthMiddleware')

router.get('/', friendRequestController.index)

module.exports = router