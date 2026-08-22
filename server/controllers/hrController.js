const db = require("../db/db");

exports.dashboard =
  async (req, res) => {

    try {

      const [
        employeeCount
      ] = await db.query(
        "SELECT COUNT(*) AS count FROM employees"
      );

      const [
        presentCount
      ] = await db.query(
        `SELECT COUNT(*) AS count
         FROM attendance
         WHERE attendance_date = CURDATE()
         AND status = 'Present'`
      );

      const [
        leaveCount
      ] = await db.query(
        `SELECT COUNT(*) AS count
         FROM attendance
         WHERE attendance_date = CURDATE()
         AND status = 'Leave'`
      );

      const [
        pendingLeaves
      ] = await db.query(
        `SELECT COUNT(*) AS count
         FROM leave_requests
         WHERE status = 'Pending'`
      );

      const employees =
        employeeCount[0].count;

      const present =
        presentCount[0].count;

      const leave =
        leaveCount[0].count;

      res.json({
        employees,
        present,
        absent:
          Math.max(
            employees -
            present -
            leave,
            0
          ),
        leave,
        pendingLeaves:
          pendingLeaves[0].count,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Unable to load HR dashboard",
      });
    }
  };const db = require("../db/db");

exports.dashboard =
  async (req, res) => {

    try {

      const [
        employeeCount
      ] = await db.query(
        "SELECT COUNT(*) AS count FROM employees"
      );

      const [
        presentCount
      ] = await db.query(
        `SELECT COUNT(*) AS count
         FROM attendance
         WHERE attendance_date = CURDATE()
         AND status = 'Present'`
      );

      const [
        leaveCount
      ] = await db.query(
        `SELECT COUNT(*) AS count
         FROM attendance
         WHERE attendance_date = CURDATE()
         AND status = 'Leave'`
      );

      const [
        pendingLeaves
      ] = await db.query(
        `SELECT COUNT(*) AS count
         FROM leave_requests
         WHERE status = 'Pending'`
      );

      const employees =
        employeeCount[0].count;

      const present =
        presentCount[0].count;

      const leave =
        leaveCount[0].count;

      res.json({
        employees,
        present,
        absent:
          Math.max(
            employees -
            present -
            leave,
            0
          ),
        leave,
        pendingLeaves:
          pendingLeaves[0].count,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Unable to load HR dashboard",
      });
    }
  };
