class MessageController {
    index(req, res) {
        res.render('message/index', {
            title: "Messages",
            style: "message.css"
        })
    }
}

module.exports = new MessageController