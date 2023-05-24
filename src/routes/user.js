const express = require("express")
const router = express.Router()
const userController = require('../app/controllers/UserController')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/public/avatars/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: storage })

router.post('/edit/save', upload.single('img-profile'), userController.editProfile)
router.get('/profile', userController.profile)

module.exports = router