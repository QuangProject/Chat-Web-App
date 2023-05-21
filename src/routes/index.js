const messageRouter = require('./message')
const inboxRouter = require('./inbox')
const friendRequestRouter = require('./friend-request')
const listFriendRouter = require('./list-friend')
const loginRouter = require('./login')
const registerRouter = require('./register')

function route(app) {
    app.use('/register', registerRouter)
    app.use('/login', loginRouter)
    app.use('/list-friend', listFriendRouter)
    app.use('/friend-request', friendRequestRouter)
    app.use('/inbox', inboxRouter)
    app.use('/message', messageRouter)
}

module.exports = route;