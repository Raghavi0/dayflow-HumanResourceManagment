const db = require("../db/db");

exports.getNotifications =
  async (req, res) => {

    try {

      const [rows] =
        await db.query(
          `SELECT
            id,
            title,
            message,
            is_read AS isRead,
            created_at AS createdAt
           FROM notifications
           WHERE user_id = ?
           ORDER BY created_at DESC`,
          [req.params.userId]
        );

      res.json(rows);

    } catch (error) {

      res.status(500).json({
        message:
          "Unable to fetch notifications",
      });
    }
  };
