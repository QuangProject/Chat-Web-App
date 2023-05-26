const siteRouter = require('./site')
const messageRouter = require('./message')
const inboxRouter = require('./inbox')
const listRequestRouter = require('./list-request')
const listFriendRouter = require('./list-friend')
const sendRequestRouter = require('./send-request')
const loginRouter = require('./login')
const registerRouter = require('./register')
const conversationRouter = require('./conversation')
const userRouter = require('./user')

const authMiddleware = require('../app/middlewares/AuthMiddleware')

function route(app) {
    app.use('/register', registerRouter)
    app.use('/login', loginRouter)
    app.use('/conversation', authMiddleware.isAuth, conversationRouter)
    app.use('/user', authMiddleware.isAuth, userRouter)
    app.use('/send-request', authMiddleware.isAuth, sendRequestRouter)
    app.use('/list-friend', authMiddleware.isAuth, listFriendRouter)
    app.use('/list-request', authMiddleware.isAuth, listRequestRouter)
    app.use('/inbox', authMiddleware.isAuth, inboxRouter)
    app.use('/message', authMiddleware.isAuth, messageRouter)
    app.use('/', siteRouter)
}

module.exports = route;