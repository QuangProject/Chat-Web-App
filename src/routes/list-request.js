const express = require("express")
const router = express.Router()
const friendRequestController = require('../app/controllers/FriendRequestController')

// accept friend request
router.post('/accept', friendRequestController.acceptRequest)
// reject friend request
router.post('/reject', friendRequestController.rejectRequest)
// get all friend request
router.get('/', friendRequestController.index)

module.exports = router