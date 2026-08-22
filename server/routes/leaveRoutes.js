const express = require('express'); const router = express.Router();
router.get('/', async (req, res) => { const db = req.app.get('db'); const [rows] = await db.execute('SELECT l.*, e.full_name FROM leave_requests l JOIN employees e ON l.employee_id = e.id'); res.json(rows); });
router.post('/', async (req, res) => { const db = req.app.get('db'); const { employee_id, leave_type, start_date, end_date, reason } = req.body; const [r] = await db.execute('INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, reason) VALUES (?,?,?,?,?)', [employee_id, leave_type, start_date, end_date, reason]); res.json({ id: r.insertId }); });
router.put('/:id', async (req, res) => {
  const db = req.app.get('db');
  const { status, approved_by } = req.body;
  await db.execute('UPDATE leave_requests SET status = ?, approved_by = ? WHERE id = ?', [status, approved_by || null, req.params.id]);
  // create notification
  const [leave] = await db.execute('SELECT employee_id FROM leave_requests WHERE id = ?', [req.params.id]);
  if (leave.length && status) {
    await db.execute('INSERT INTO notifications (user_id, title, message) VALUES (?, ?, ?)', [leave[0].employee_id, 'Leave '+status, 'Your leave request has been '+status.toLowerCase()+'.']);
  }
  res.json({ updated: true });
});
module.exports = router;
