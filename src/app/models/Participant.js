const db = require("../../config/db");

// EMPTY OBJECT
const Participant = {};

// CREATE PARTICIPANT
Participant.create = (userId, conversationId) => {
    return db.query(`INSERT INTO participants (user_id, conversation_id, created_at) VALUES($1, $2, CURRENT_TIMESTAMP) RETURNING *`,
        [userId, conversationId]);
};

// CHECK IF PARTICIPANT EXISTS
Participant.isExist = (friendId, userId) => {
    return db.query(`SELECT * FROM participants WHERE user_id = $1 AND user_id = $2`, [friendId, userId]);
};

module.exports = { Participant };