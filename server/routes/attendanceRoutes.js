const express = require('express'); const router = express.Router();
router.get('/', async (req, res) => { const db = req.app.get('db'); const [rows] = await db.execute('SELECT a.*, e.full_name FROM attendance a JOIN employees e ON a.employee_id = e.id'); res.json(rows); });
router.post('/', async (req, res) => { const db = req.app.get('db'); const { employee_id, date, check_in, check_out, status } = req.body; const [r] = await db.execute('INSERT INTO attendance (employee_id, date, check_in, check_out, status) VALUES (?,?,?,?,?)', [employee_id, date, check_in, check_out, status || 'Present']); res.json({ id: r.insertId }); });
module.exports = router;
