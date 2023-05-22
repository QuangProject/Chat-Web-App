const db = require("../../config/db");

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const User = {};

// CREATE USER
User.create = (username, password, firstName, lastName, email, status) => {
    return db.query(`INSERT INTO users (username, password, first_name, last_name, email, status) 
                    VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    [username, password, firstName, lastName, email, status]);
};

// REGISTER USER
User.getOne = (username) => {
    return db.query(`SELECT * FROM users WHERE username = $1`, [username]);
};

module.exports = { User };