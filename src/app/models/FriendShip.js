const db = require("../../config/db");

// EMPTY OBJECT
const FriendShip = {};

// CREATE FRIEND SHIP
FriendShip.create = (userId, friendId) => {
    return db.query(`INSERT INTO friendships (user_id, friend_id) VALUES($1, $2) RETURNING *`,
        [userId, friendId]
    );
};

module.exports = { FriendShip };