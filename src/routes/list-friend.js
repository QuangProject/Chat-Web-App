const express = require("express")
const router = express.Router()
const listFriendController = require('../app/controllers/ListFriendController')
// const authMiddleware = require('../app/middlewares/AuthMiddleware')

// Unfriend
router.post('/unfriend', listFriendController.unfriend)
router.get('/', listFriendController.index)

module.exports = router