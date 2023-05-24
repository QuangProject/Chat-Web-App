const db = require("../../config/db");

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const User = {};

// CREATE USER
User.create = (username, password, firstName, lastName, gender, birthday, email, telephone, address, status, isAdmin) => {
    return db.query(`INSERT INTO users (username, password, first_name, last_name, gender, birthday, email, telephone, address, status, is_admin) 
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
    [username, password, firstName, lastName, gender, birthday, email, telephone, address, status, isAdmin]);
};

// REGISTER USER
User.getOne = (username) => {
    return db.query(`SELECT * FROM users WHERE username = $1`, [username]);
};

// UPDATE AN USER
User.editProfile = (username, firstName, lastName, gender, birthday, telephone, address, avatar) => {
    return db.query(`UPDATE users SET first_name = $2, last_name = $3, gender = $4, birthday = $5, telephone = $6, address = $7, avatar = $8 WHERE username = $1 RETURNING *`, [
        username, firstName, lastName, gender, birthday, telephone, address, avatar
    ]);
};

module.exports = { User };