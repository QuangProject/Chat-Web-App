class MessageController {
    async index(req, res) {
        res.render('message/index')
    }
}

module.exports = new MessageController