class SendRequestController {
    async index(req, res) {
        res.render('send-request/index')
    }
}

module.exports = new SendRequestController