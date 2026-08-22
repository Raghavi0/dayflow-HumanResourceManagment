const express = require('express'); const router = express.Router();
router.get('/:userId', async (req, res) => { const db = req.app.get('db'); const [rows] = await db.execute('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC', [req.params.userId]); res.json(rows); });
router.put('/:id/read', async (req, res) => { const db = req.app.get('db'); await db.execute('UPDATE notifications SET is_read = 1 WHERE id = ?', [req.params.id]); res.json({updated:true}); });
router.put('/:userId/read-all', async (req, res) => { const db = req.app.get('db'); await db.execute('UPDATE notifications SET is_read = 1 WHERE user_id = ?', [req.params.userId]); res.json({updated:true}); });
router.post('/', async (req, res) => { const db = req.app.get('db'); const { user_id, title, message } = req.body; const [r] = await db.execute('INSERT INTO notifications (user_id, title, message) VALUES (?,?,?)', [user_id, title, message]); res.json({ id: r.insertId }); });
module.exports = router;
