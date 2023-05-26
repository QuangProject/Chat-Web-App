class MessageController {
    index(req, res) {
        res.render('message/index', {
            title: "Messages",
            style: "message.css",
            script: "message.js"
        })
    }
}

module.exports = new MessageController