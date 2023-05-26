const db = require("../../config/db");

// EMPTY OBJECT
const FriendRequest = {};

// CREATE FRIEND REQUEST
FriendRequest.create = (senderId, receiverId, message) => {
    return db.query(`INSERT INTO friend_requests (sender_id, receiver_id, message) 
                    VALUES($1, $2, $3) RETURNING *`,
        [senderId, receiverId, message]);
};

// GET ALL FRIEND REQUESTS OF USER BY USER ID
FriendRequest.getAll = (userId) => {
    return db.query(`SELECT * FROM friend_requests WHERE receiver_id = $1`, [userId]);
};

// GET ONE FRIEND REQUEST
FriendRequest.getOne = (requestId) => {
    return db.query(`SELECT * FROM friend_requests WHERE request_id = $1`, [requestId]);
};

// Check if user already send request to friend
FriendRequest.checkRequestWasSend = (senderId, receiverId) => {
    return db.query(`SELECT * FROM friend_requests WHERE sender_id = $1 AND receiver_id = $2`, [senderId, receiverId]);
};

// Check if friend already send request to user
FriendRequest.checkRequestWasReceive = (senderId, receiverId) => {
    return db.query(`SELECT * FROM friend_requests WHERE sender_id = $1 AND receiver_id = $2`, [receiverId, senderId]);
};

// DELETE FRIEND REQUEST
FriendRequest.delete = (request_id) => {
    return db.query(`DELETE FROM friend_requests WHERE request_id = $1 RETURNING *`, [request_id]);
};

module.exports = { FriendRequest };