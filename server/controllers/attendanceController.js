const db = require("../db/db");

exports.getAttendance =
  async (req, res) => {

    try {

      const [rows] =
        await db.query(
          `SELECT
            id,
            attendance_date AS date,
            check_in AS checkIn,
            check_out AS checkOut,
            working_hours AS workingHours,
            status
           FROM attendance
           WHERE employee_id = ?
           ORDER BY attendance_date DESC`,
          [req.params.employeeId]
        );

      res.json(rows);

    } catch (error) {

      res.status(500).json({
        message:
          "Unable to fetch attendance",
      });
    }
  };


exports.checkIn =
  async (req, res) => {

    try {

      const {
        employeeId,
      } = req.body;

      const [existing] =
        await db.query(
          `SELECT id
           FROM attendance
           WHERE employee_id = ?
           AND attendance_date = CURDATE()`,
          [employeeId]
        );

      if (existing.length > 0) {
        return res.status(400).json({
          message:
            "Already checked in today",
        });
      }

      await db.query(
        `INSERT INTO attendance
         (
           employee_id,
           attendance_date,
           check_in,
           status
         )
         VALUES (
           ?,
           CURDATE(),
           CURTIME(),
           'Present'
         )`,
        [employeeId]
      );

      res.json({
        success: true,
        message:
          "Check-in successful",
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Check-in failed",
      });
    }
  };


exports.checkOut =
  async (req, res) => {

    try {

      const {
        employeeId,
      } = req.body;

      const [rows] =
        await db.query(
          `SELECT
            id,
            check_in
           FROM attendance
           WHERE employee_id = ?
           AND attendance_date = CURDATE()`,
          [employeeId]
        );

      if (rows.length === 0) {
        return res.status(404).json({
          message:
            "Check-in not found",
        });
      }

      await db.query(
        `UPDATE attendance
         SET
           check_out = CURTIME(),
           working_hours =
             ROUND(
               TIME_TO_SEC(
                 TIMEDIFF(
                   CURTIME(),
                   check_in
                 )
               ) / 3600,
               2
             )
         WHERE id = ?`,
        [rows[0].id]
      );

      res.json({
        success: true,
        message:
          "Check-out successful",
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Check-out failed",
      });
    }
  };
