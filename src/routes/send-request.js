const express = require("express")
const router = express.Router()
const sendRequestController = require('../app/controllers/SendRequestController')
// const authMiddleware = require('../app/middlewares/AuthMiddleware')

router.get('/', sendRequestController.index)

module.exports = router