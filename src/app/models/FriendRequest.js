const db = require("../../config/db");

// EMPTY OBJECT
const FriendRequest = {};

// CREATE FRIEND REQUEST
FriendRequest.create = (senderId, receiverId, message, status) => {
    return db.query(`INSERT INTO friend_requests (sender_id, receiver_id, message, status) 
                    VALUES($1, $2, $3, $4) RETURNING *`,
        [senderId, receiverId, message, status]);
};

// GET ALL FRIEND REQUESTS
FriendRequest.getAll = (userId) => {
    return db.query(`SELECT * FROM friend_requests WHERE receiver_id = $1`, [userId]);
};

// GET ALL FRIEND REQUESTS PENDING
FriendRequest.getAllPending = (userId) => {
    return db.query(`SELECT * FROM friend_requests WHERE receiver_id = $1 AND status = 'pending'`, [userId]);
};

// CHECK IF USER ALREADY SEND REQUEST TO FRIEND
FriendRequest.getOne = (senderId, receiverId) => {
    return db.query(`SELECT * FROM friend_requests WHERE sender_id = $1 AND receiver_id = $2`, [senderId, receiverId]);
};

// UPDATE FRIEND REQUEST
FriendRequest.update = (senderId, receiverId, status) => {
    return db.query(`UPDATE friend_requests SET status = $3 WHERE sender_id = $1 AND receiver_id = $2 RETURNING *`, [senderId, receiverId, status]);
};

// DELETE FRIEND REQUEST
FriendRequest.delete = (request_id) => {
    return db.query(`DELETE FROM friend_requests WHERE request_id = $1 RETURNING *`, [request_id]);
};

module.exports = { FriendRequest };