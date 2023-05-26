const db = require("../../config/db");

// EMPTY OBJECT
const FriendShip = {};

// CREATE FRIEND SHIP
FriendShip.create = (userId, friendId) => {
    return db.query(`INSERT INTO friendships (user_id, friend_id) VALUES($1, $2) RETURNING *`,
        [userId, friendId]
    );
};

// GET ALL FRIENDS
FriendShip.getAll = (userId) => {
    return db.query(`SELECT * FROM friendships WHERE user_id = $1`, [userId]);
};

// CHECK IF USER AND FRIEND ALREADY FRIEND
FriendShip.getOne = (userId, friendId) => {
    return db.query(`SELECT * FROM friendships WHERE user_id = $1 AND friend_id = $2`, [userId, friendId]);
};

// UNFRIEND
FriendShip.unfriend = (userId, friendId) => {
    return db.query(`DELETE FROM friendships WHERE user_id = $1 AND friend_id = $2`, [userId, friendId]);
};

module.exports = { FriendShip };