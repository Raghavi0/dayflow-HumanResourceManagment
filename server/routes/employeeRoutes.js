const express = require('express'); const router = express.Router();
router.get('/', async (req, res) => { const db = req.app.get('db'); const [rows] = await db.execute('SELECT * FROM employees'); res.json(rows); });
router.post('/', async (req, res) => { const db = req.app.get('db'); const { full_name, email, position, department, salary, hire_date, status } = req.body; const [r] = await db.execute('INSERT INTO employees (full_name, email, position, department, salary, hire_date, status) VALUES (?,?,?,?,?,?,?)', [full_name, email, position, department, salary, hire_date, status || 'Active']); res.json({ id: r.insertId }); });
router.put('/:id', async (req, res) => { const db = req.app.get('db'); await db.execute('UPDATE employees SET ? WHERE id = ?', [req.body, req.params.id]); res.json({ updated: true }); });
router.delete('/:id', async (req, res) => { const db = req.app.get('db'); await db.execute('DELETE FROM employees WHERE id = ?', [req.params.id]); res.json({ deleted: true }); });
module.exports = router;
