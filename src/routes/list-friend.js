const express = require("express")
const router = express.Router()
const listFriendController = require('../app/controllers/ListFriendController')
// const authMiddleware = require('../app/middlewares/AuthMiddleware')

router.get('/', listFriendController.index)

module.exports = router