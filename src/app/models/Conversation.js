const db = require("../../config/db");

// EMPTY OBJECT
const Conversation = {};

// GET ALL CONVERSATIONS OF USER
Conversation.findAll = (user_id) => {
    return db.query(`SELECT temp1.conversation_id, temp1.user_id, temp1.username, temp1.first_name, temp1.last_name, temp1.avatar, temp2.message_id, temp2.sender_id, temp2.content, temp2.created_at
                    FROM 
                        (SELECT c.conversation_id, u.user_id, u.username, u.first_name, u.last_name, u.avatar
                        FROM conversations c
                        INNER JOIN participants p ON c.conversation_id = p.conversation_id
                        INNER JOIN users u ON p.user_id = u.user_id
                        WHERE p.user_id != $1
                        AND c.conversation_id IN (
                            SELECT conversation_id
                            FROM participants
                            WHERE user_id = $1
                        )) AS temp1
                    INNER JOIN (
                        SELECT DISTINCT ON (c.conversation_id) c.conversation_id, m.sender_id, m.message_id, m.content, m.created_at
                        FROM conversations c
                        JOIN messages m ON c.conversation_id = m.conversation_id
                        JOIN participants p ON c.conversation_id = p.conversation_id
                        WHERE p.user_id = $1
                        ORDER BY c.conversation_id, m.created_at DESC
                    ) AS temp2 ON temp1.conversation_id = temp2.conversation_id ORDER BY created_at DESC;`,
        [user_id]);
};

// CREATE CONVERSATION
Conversation.create = () => {
    return db.query(`INSERT INTO conversations (created_at) VALUES(CURRENT_TIMESTAMP) RETURNING *`);
};

// HOW TO CHECK IF CONVERSATION EXIST?
Conversation.isExist = (friendId, userId) => {
    return db.query(`SELECT * FROM participants WHERE user_id = $1 AND conversation_id IN (SELECT conversation_id FROM participants WHERE user_id = $2)`, [friendId, userId]);
};

module.exports = { Conversation };