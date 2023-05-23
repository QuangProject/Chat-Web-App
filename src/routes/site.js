const express = require("express")
const router = express.Router()
const siteController = require('../app/controllers/SiteController')
const authMiddleware = require('../app/middlewares/AuthMiddleware')

router.get('/logout', siteController.logout)
router.get('/profile', authMiddleware.isAuth, siteController.profile)
router.get('/', authMiddleware.freedom, siteController.index)

module.exports = router