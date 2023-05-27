const db = require("../../config/db");

// EMPTY OBJECT
const Receipt = {};

// CREATE RECEIPT
Receipt.create = (messageId, userId) => {
    return db.query(`INSERT INTO receipts (message_id, user_id, created_at) VALUES($1, $2, CURRENT_TIMESTAMP) RETURNING *`,
        [messageId, userId]);
};

// GET ALL RECEIPTS IN A MESSAGE BY USER ID ORDER BY CREATED_AT
Receipt.getAll = (messageId, userId) => {
    return db.query(`SELECT * FROM receipts WHERE message_id = $1 AND user_id != $2 ORDER BY created_at`, [messageId, userId]);
};

module.exports = { Receipt };