const db = require('../db/database');

const createUser = (name, email, hashedPassword, role, callback) => {
  const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
  db.run(sql, [name, email, hashedPassword, role], callback);
};

const findUserByEmail = (email, callback) => {
  const sql = `SELECT * FROM users WHERE email = ?`;
  db.get(sql, [email], callback);
};

module.exports = { createUser, findUserByEmail };
