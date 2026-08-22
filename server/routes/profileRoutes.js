const express = require('express'); const router = express.Router();
router.get('/:id', async (req, res) => { const db = req.app.get('db'); const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [req.params.id]); res.json(rows[0]||{}); });
router.put('/:id', async (req, res) => { const db = req.app.get('db'); await db.execute('UPDATE users SET ? WHERE id = ?', [req.body, req.params.id]); res.json({updated:true}); });
module.exports = router;
