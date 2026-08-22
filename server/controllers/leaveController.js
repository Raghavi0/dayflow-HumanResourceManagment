const db = require("../db/db");

exports.createLeave =
  async (req, res) => {

    try {

      const {
        employeeId,
        type,
        startDate,
        endDate,
        remarks,
      } = req.body;

      if (
        !employeeId ||
        !type ||
        !startDate ||
        !endDate
      ) {
        return res.status(400).json({
          message:
            "Required fields missing",
        });
      }

      if (endDate < startDate) {
        return res.status(400).json({
          message:
            "End date cannot be before start date",
        });
      }

      await db.query(
        `INSERT INTO leave_requests
         (
           employee_id,
           leave_type,
           start_date,
           end_date,
           remarks
         )
         VALUES (?, ?, ?, ?, ?)`,
        [
          employeeId,
          type,
          startDate,
          endDate,
          remarks || null,
        ]
      );

      res.status(201).json({
        success: true,
        message:
          "Leave request submitted",
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Unable to submit leave",
      });
    }
  };


exports.getEmployeeLeaves =
  async (req, res) => {

    try {

      const [rows] =
        await db.query(
          `SELECT
            id,
            leave_type AS type,
            start_date AS startDate,
            end_date AS endDate,
            remarks,
            status,
            admin_comment AS adminComment
           FROM leave_requests
           WHERE employee_id = ?
           ORDER BY created_at DESC`,
          [req.params.employeeId]
        );

      res.json(rows);

    } catch (error) {

      res.status(500).json({
        message:
          "Unable to fetch leaves",
      });
    }
  };


exports.getAllLeaves =
  async (req, res) => {

    try {

      const [rows] =
        await db.query(
          `SELECT
            lr.id,
            lr.employee_id AS employeeId,
            e.name AS employeeName,
            lr.leave_type AS type,
            lr.start_date AS startDate,
            lr.end_date AS endDate,
            lr.remarks,
            lr.status,
            lr.admin_comment AS adminComment
           FROM leave_requests lr
           JOIN employees e
             ON e.id = lr.employee_id
           ORDER BY lr.created_at DESC`
        );

      res.json(rows);

    } catch (error) {

      res.status(500).json({
        message:
          "Unable to fetch leave requests",
      });
    }
  };


exports.updateLeave =
  async (req, res) => {

    try {

      const status =
        req.params.action === "approve"
          ? "Approved"
          : "Rejected";

      await db.query(
        `UPDATE leave_requests
         SET
           status = ?,
           admin_comment = ?
         WHERE id = ?`,
        [
          status,
          req.body.comment || "",
          req.params.id,
        ]
      );

      res.json({
        success: true,
        message:
          `Leave ${status.toLowerCase()}`,
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Unable to update leave",
      });
    }
  };
