require('dotenv').config();
const { Message } = require('../models/Message')
const { Receipt } = require('../models/Receipt')

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

        // get baseURL from .env
        const baseURL = process.env.BASE_URL

        // render to client
        res.render('message/index', {
            title: "Messages",
            style: "message.css",
            script: "message.js",
            baseURL,
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
            .then(async (result) => {
                // get user information
                const { user_id, username, first_name, last_name, avatar, status } = req.session.user

                // create receipt
                const receipt = await Receipt.create(result.rows[0].message_id, user_id)
                if (receipt.rowCount == 0) {
                    return res.status(500).json({ error: 'Error creating receipt.' });
                }
                
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