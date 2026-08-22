const db = require("../db/db");

exports.getPayroll =
  async (req, res) => {

    try {

      const [rows] =
        await db.query(
          `SELECT
            id,
            employee_id AS employeeId,
            basic_salary AS basicSalary,
            allowances,
            deductions,
            net_salary AS netSalary,
            effective_from AS effectiveFrom
           FROM payroll
           WHERE employee_id = ?
           ORDER BY effective_from DESC
           LIMIT 1`,
          [req.params.employeeId]
        );

      if (rows.length === 0) {
        return res.status(404).json({
          message:
            "Payroll record not found",
        });
      }

      res.json(rows[0]);

    } catch (error) {

      res.status(500).json({
        message:
          "Unable to fetch payroll",
      });
    }
  };


exports.getAllPayroll =
  async (req, res) => {

    try {

      const [rows] =
        await db.query(
          `SELECT
            p.id,
            p.employee_id AS employeeId,
            e.name,
            p.basic_salary AS basicSalary,
            p.allowances,
            p.deductions,
            p.net_salary AS netSalary
           FROM payroll p
           JOIN employees e
             ON e.id = p.employee_id
           ORDER BY e.name`
        );

      res.json(rows);

    } catch (error) {

      res.status(500).json({
        message:
          "Unable to fetch payroll",
      });
    }
  };


exports.updatePayroll =
  async (req, res) => {

    try {

      const {
        basicSalary,
        allowances,
        deductions,
      } = req.body;

      const netSalary =
        Number(basicSalary || 0) +
        Number(allowances || 0) -
        Number(deductions || 0);

      await db.query(
        `UPDATE payroll
         SET
           basic_salary = ?,
           allowances = ?,
           deductions = ?,
           net_salary = ?
         WHERE employee_id = ?`,
        [
          basicSalary,
          allowances,
          deductions,
          netSalary,
          req.params.employeeId,
        ]
      );

      res.json({
        success: true,
        message:
          "Payroll updated",
        netSalary,
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Unable to update payroll",
      });
    }
  };
