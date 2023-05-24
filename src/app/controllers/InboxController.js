class InboxController {
    index(req, res) {
        res.render('inbox/index', {
            title: "Inboxes",
            style: "inbox.css"
        })
    }
}

module.exports = new InboxController