const db = require("../../config/db");

// EMPTY OBJECT
const Conversation = {};

// CREATE CONVERSATION
Conversation.create = (name) => {
    return db.query(`INSERT INTO conversations (name, created_at, updated_at) VALUES($1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
        [name]);
};

// CHECK IF CONVERSATION EXISTS
Conversation.isExist = (freightId, userId) => {
    return db.query(`SELECT * FROM conversations WHERE freight_id = $1 AND user_id = $2`, [freightId, userId]);
};

module.exports = { Conversation };