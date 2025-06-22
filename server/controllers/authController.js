const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');

const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  createUser(name, email, hashed, role, function (err) {
    if (err) return res.status(400).json({ message: 'User already exists.' });
    res.status(201).json({ message: 'Signup successful' });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, async (err, user) => {
    if (err || !user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign({ id: user.id, role: user.role }, 'secret_key', { expiresIn: '2h' });
    res.json({ token, role: user.role });
  });
};

module.exports = { signup, login };
