const { Conversation } = require('../models/Conversation')

class ConversationController {
    create(req, res) {
        // get freightId from req.body
        const { freightId } = req.body
        // get userId from session
        const userId = req.session.user.user_id
        // Check if conversation already exists
        Conversation.isExist(freightId, userId)
            .then(conversationObj => {
                // Check if conversation exists
                if (conversationObj.rowCount > 0) {
                    // Conversation already exists
                    const conversation = conversationObj.rows[0]
                    return res.status(200).json({ message: "Conversation already exists", conversation })
                }

                // Create conversation
                Conversation.create(null)
                    .then(conversationObj => {
                        // Create conversation successfully
                        const conversation = conversationObj.rows[0]
                        return res.status(200).json({ message: "Create conversation successfully", conversation })
                    })
                    .catch(err => {
                        // Create conversation failed
                        return res.status(400).json({ error: "Create conversation failed" })
                    })
            })
    }
}

module.exports = new ConversationController