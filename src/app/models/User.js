const db = require("../../config/db");

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const User = {};

// CREATE USER
User.create = (username, password, firstName, lastName, gender, birthday, email, telephone, address, avatar, status, isAdmin) => {
    return db.query(`INSERT INTO users (username, password, first_name, last_name, gender, birthday, email, telephone, address, avatar, status, is_admin) 
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
    [username, password, firstName, lastName, gender, birthday, email, telephone, address, avatar, status, isAdmin]);
};

// GET USER BY USERNAME
User.getOne = (username) => {
    return db.query(`SELECT * FROM users WHERE username = $1`, [username]);
};

// GET USER BY ID
User.getOneById = (userId) => {
    return db.query(`SELECT * FROM users WHERE user_id = $1`, [userId]);
};

// UPDATE AN USER
User.editProfile = (username, firstName, lastName, gender, birthday, telephone, address, avatar) => {
    return db.query(`UPDATE users SET first_name = $2, last_name = $3, gender = $4, birthday = $5, telephone = $6, address = $7, avatar = $8 WHERE username = $1 RETURNING *`, [
        username, firstName, lastName, gender, birthday, telephone, address, avatar
    ]);
};

// CHANGE PASSWORD
User.changePassword = (username, newPassword) => {
    return db.query(`UPDATE users SET password = $2 WHERE username = $1 RETURNING *`, [username, newPassword]);
};

// SEARCH USER BY NAME
User.searchByName = (searchValue) => {
    const keywords = searchValue.split(" ")
    const searchTermKeywords = [];

    keywords.forEach(word => {
        searchTermKeywords.push("first_name ILIKE '%" + word + "%'")
    });

    const value = searchTermKeywords.join(" AND ")
    return db.query(`SELECT * FROM users WHERE ${value}`);
};

module.exports = { User };