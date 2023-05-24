class SendRequestController {
    index(req, res) {
        res.render('send-request/index', {
            title: "Send Request",
            style: "send-request.css"
        })
    }
}

module.exports = new SendRequestController