const db = require("../db/db");

exports.getAllEmployees =
  async (req, res) => {

    try {

      const [rows] =
        await db.query(
          `SELECT
            id,
            employee_id AS employeeId,
            name,
            email,
            phone,
            address,
            department,
            designation,
            joining_date AS joiningDate
           FROM employees
           ORDER BY name`
        );

      res.json(rows);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Unable to fetch employees",
      });
    }
  };


exports.getEmployee =
  async (req, res) => {

    try {

      const [rows] =
        await db.query(
          `SELECT
            id,
            employee_id AS employeeId,
            name,
            email,
            phone,
            address,
            department,
            designation,
            joining_date AS joiningDate
           FROM employees
           WHERE user_id = ?`,
          [req.params.id]
        );

      if (rows.length === 0) {
        return res.status(404).json({
          message:
            "Employee not found",
        });
      }

      res.json(rows[0]);

    } catch (error) {

      res.status(500).json({
        message:
          "Unable to fetch employee",
      });
    }
  };


exports.updateEmployee =
  async (req, res) => {

    try {

      const {
        phone,
        address,
      } = req.body;

      await db.query(
        `UPDATE employees
         SET phone = ?,
             address = ?
         WHERE user_id = ?`,
        [
          phone,
          address,
          req.params.id,
        ]
      );

      const [rows] =
        await db.query(
          `SELECT
            id,
            employee_id AS employeeId,
            name,
            email,
            phone,
            address,
            department,
            designation,
            joining_date AS joiningDate
           FROM employees
           WHERE user_id = ?`,
          [req.params.id]
        );

      res.json(rows[0]);

    } catch (error) {

      res.status(500).json({
        message:
          "Unable to update employee",
      });
    }
  };
