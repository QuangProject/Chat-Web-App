class InboxController {
    async index(req, res) {
        res.render('inbox/index')
    }
}

module.exports = new InboxController