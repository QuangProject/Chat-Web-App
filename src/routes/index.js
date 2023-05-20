const messageRouter = require('./message')
const inboxRouter = require('./inbox')

function route(app) {
    app.use('/inbox', inboxRouter)
    app.use('/message', messageRouter)
}

module.exports = route;