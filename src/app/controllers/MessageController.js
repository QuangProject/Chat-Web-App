const { Message } = require('../models/Message')

class MessageController {
    async conversation(req, res) {
        // get conversationId from req.params
        const { conversationId } = req.params
        const userId = req.session.user.user_id
        // get all messages in a conversation
        const messages = await Message.getAll(conversationId)

        const messagesArr = messages.rows
        for (let i = 0; i < messagesArr.length; i++) {
            messagesArr[i].sender_id == userId ? messagesArr[i].isSender = true : messagesArr[i].isSender = false
        }

        res.render('message/index', {
            title: "Messages",
            style: "message.css",
            script: "message.js",
            userId,
            messages: messagesArr
        })
    }

    async create(req, res) {
        // get information from req.body
        const { conversationId, message } = req.body
        const userId = req.session.user.user_id
        // create a new message
        Message.create(conversationId, userId, message)
            .then((result) => {
                // get user information
                const { user_id, username, first_name, last_name, avatar, status } = req.session.user
                // send message to client
                const data = {
                    sender_id: user_id,
                    conversation_id: conversationId,
                    content: message,
                    created_at: result.rows[0].created_at,
                    username,
                    first_name,
                    last_name,
                    avatar,
                    status
                }
                // req.io.sockets.emit('newMessage', data)
                res.status(200).json({ message: "Message sent successfully!", data })
            }
            ).catch((err) => {
                res.status(500).json({ message: "Error sending message!" })
            })
    }
}

module.exports = new MessageController