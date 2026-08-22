const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const db = req.app.get('db');
  const { email, password } = req.body;
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  if (!rows.length) return res.status(401).json({ message: 'Invalid credentials' });
  const user = rows[0];
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET || 'hackathon_secret_key_2026', { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, department: user.department } });
});

router.post('/register', async (req, res) => {
  const db = req.app.get('db');
  const { name, email, password, role, department } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const [r] = await db.execute('INSERT INTO users (name, email, password, role, department) VALUES (?, ?, ?, ?, ?)', [name, email, hash, role || 'Employee', department || 'General']);
    res.json({ message: 'Registered', userId: r.insertId });
  } catch (e) { res.status(400).json({ message: 'Email exists or error' }); }
});

module.exports = router;
