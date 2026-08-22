const express = require('express'); const router = express.Router();
router.get('/', async (req, res) => { const db = req.app.get('db'); const [rows] = await db.execute('SELECT p.*, e.full_name FROM payroll p JOIN employees e ON p.employee_id = e.id'); res.json(rows); });
router.post('/', async (req, res) => { const db = req.app.get('db'); const { employee_id, month, year, basic_pay, allowances, deductions, net_pay } = req.body; const [r] = await db.execute('INSERT INTO payroll (employee_id, month, year, basic_pay, allowances, deductions, net_pay) VALUES (?,?,?,?,?,?,?)', [employee_id, month, year, basic_pay, allowances, deductions, net_pay]); res.json({ id: r.insertId }); });
module.exports = router;
