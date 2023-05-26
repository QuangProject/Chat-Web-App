const db = require("../../config/db");

// EMPTY OBJECT
const Participant = {};

// CREATE PARTICIPANT
Participant.create = (conversationId, userId) => {
    return db.query(`INSERT INTO participants (conversation_id, user_id, created_at, updated_at) VALUES($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
        [conversationId, userId]);
};

module.exports = { Participant };