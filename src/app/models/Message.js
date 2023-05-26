const db = require("../../config/db");

// EMPTY OBJECT
const Message = {};

// CREATE MESSAGE
Message.create = (conversationId, userId, message) => {
    return db.query(`INSERT INTO messages (conversation_id, sender_id, content, created_at) VALUES($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *`,
        [conversationId, userId, message]);
};

// GET ALL MESSAGES IN A CONVERSATION
Message.getAll = (conversationId) => {
    return db.query(`SELECT mes.sender_id, mes.conversation_id, mes.content, mes.created_at, u.user_id, u.username, u.first_name, u.last_name, u.avatar, u.status FROM messages as mes INNER JOIN users as u ON mes.sender_id = u.user_id WHERE conversation_id = $1 ORDER BY mes.created_at`, [conversationId]);
};

// GET LAST MESSAGE IN A CONVERSATION
Message.getLast = (conversationId) => {
    return db.query(`SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at DESC LIMIT 1`, [conversationId]);
};

// GET 20 MESSAGES IN A CONVERSATION
Message.getTwenty = (conversationId) => {
    return db.query(`SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at DESC LIMIT 20`, [conversationId]);
};

module.exports = { Message };