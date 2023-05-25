const express = require("express")
const router = express.Router()
const sendRequestController = require('../app/controllers/SendRequestController')

// send friend request
router.post('/send', sendRequestController.sendRequest)
// get send request page
router.get('/', sendRequestController.index)

module.exports = router