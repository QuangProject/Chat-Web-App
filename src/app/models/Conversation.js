const db = require("../../config/db");

// EMPTY OBJECT
const Conversation = {};

// CREATE CONVERSATION
Conversation.create = () => {
    return db.query(`INSERT INTO conversations (created_at) VALUES(CURRENT_TIMESTAMP) RETURNING *`);
};

// HOW TO CHECK IF CONVERSATION EXIST?
Conversation.isExist = (friendId, userId) => {
    return db.query(`SELECT * FROM conversations as c INNER JOIN participants as p ON c.conversation_id = p.conversation_id WHERE p.user_id = $1 OR p.user_id = $2`, [friendId, userId]);
};

module.exports = { Conversation };