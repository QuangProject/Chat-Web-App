const { Conversation } = require('../models/Conversation')

class InboxController {
    async index(req, res) {
        // get user id from session
        const userId = req.session.user.user_id
        // Get all conversations of user from database
        const conversations = await Conversation.findAll(userId)
        // Render inbox page
        res.render('inbox/index', {
            title: "Inboxes",
            style: "inbox.css",
            conversations: conversations.rows
        })
    }
}

module.exports = new InboxController