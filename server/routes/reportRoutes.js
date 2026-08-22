const express = require('express'); const router = express.Router();
router.get('/', async (req, res) => { const db = req.app.get('db'); const [rows] = await db.execute('SELECT * FROM reports ORDER BY created_at DESC'); res.json(rows); });
router.post('/', async (req, res) => { const db = req.app.get('db'); const { report_type, generated_by } = req.body; const [r] = await db.execute('INSERT INTO reports (report_type, generated_by) VALUES (?,?)', [report_type, generated_by]); res.json({ id: r.insertId }); });
module.exports = router;
