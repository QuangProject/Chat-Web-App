const db = require("../../config/db");

// EMPTY OBJECT
const Receipt = {};

// CREATE RECEIPT
Receipt.create = (messageId, userId) => {
    return db.query(`INSERT INTO receipts (message_id, user_id, is_read, created_at) VALUES($1, $2, false, CURRENT_TIMESTAMP) RETURNING *`,
        [messageId, userId]);
};

// GET RECEIPT OF USER
Receipt.getReceiptOfUser = (userId) => {
    return db.query(`SELECT r.receipt_id, r.is_read, r.created_at, m.conversation_id, m.message_id, m.content, u.user_id, u.username, u.first_name, u.last_name, u.avatar, u.status FROM receipts r INNER JOIN messages m ON r.message_id = m.message_id INNER JOIN users u ON r.user_id = u.user_id WHERE r.user_id IN
                    (
                        SELECT u.user_id
                        FROM conversations c
                        INNER JOIN participants p ON c.conversation_id = p.conversation_id
                        INNER JOIN users u ON p.user_id = u.user_id
                        WHERE p.user_id != $1
                        AND c.conversation_id IN (
                            SELECT conversation_id
                            FROM participants
                            WHERE user_id = $1
                        )
                    ) AND r.is_read = false ORDER BY r.created_at DESC`,
        [userId]);
};

// GET RECEIPT OF CONVERSATION
Receipt.getReceiptOfConversation = (userId, conversationId) => {
    return db.query(`SELECT r.receipt_id, r.is_read, r.created_at, m.conversation_id, m.message_id, m.content, u.user_id, u.username, u.first_name, u.last_name, u.avatar, u.status FROM receipts r INNER JOIN messages m ON r.message_id = m.message_id INNER JOIN users u ON r.user_id = u.user_id WHERE r.user_id IN
                    (
                        SELECT u.user_id
                        FROM conversations c
                        INNER JOIN participants p ON c.conversation_id = p.conversation_id
                        INNER JOIN users u ON p.user_id = u.user_id
                        WHERE p.user_id != $1
                        AND c.conversation_id IN (
                            SELECT conversation_id
                            FROM participants
                            WHERE user_id = $1
                        )
                    ) AND m.conversation_id = $2 ORDER BY r.created_at DESC`,
        [userId, conversationId]);
};

// CHECK RECEIPT IS READ
Receipt.update = (receiptId) => {
    return db.query(`UPDATE receipts SET is_read = true WHERE receipt_id = $1`, [receiptId]);
};

module.exports = { Receipt };