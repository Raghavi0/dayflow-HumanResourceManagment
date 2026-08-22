const db = require("../db/db");

exports.attendance =
  async (req, res) => {

    const [rows] =
      await db.query(
        `SELECT
          e.employee_id AS employeeId,
          e.name,
          a.attendance_date AS date,
          a.check_in AS checkIn,
          a.check_out AS checkOut,
          a.working_hours AS workingHours,
          a.status
         FROM attendance a
         JOIN employees e
           ON e.id = a.employee_id
         ORDER BY a.attendance_date DESC`
      );

    res.json(rows);
  };


exports.leave =
  async (req, res) => {

    const [rows] =
      await db.query(
        `SELECT
          e.employee_id AS employeeId,
          e.name,
          lr.leave_type AS type,
          lr.start_date AS startDate,
          lr.end_date AS endDate,
          lr.status
         FROM leave_requests lr
         JOIN employees e
           ON e.id = lr.employee_id
         ORDER BY lr.created_at DESC`
      );

    res.json(rows);
  };


exports.payroll =
  async (req, res) => {

    const [rows] =
      await db.query(
        `SELECT
          e.employee_id AS employeeId,
          e.name,
          p.basic_salary AS basicSalary,
          p.allowances,
          p.deductions,
          p.net_salary AS netSalary
         FROM payroll p
         JOIN employees e
           ON e.id = p.employee_id`
      );

    res.json(rows);
  };


exports.employees =
  async (req, res) => {

    const [rows] =
      await db.query(
        `SELECT
          employee_id AS employeeId,
          name,
          email,
          department,
          designation,
          joining_date AS joiningDate
         FROM employees
         ORDER BY name`
      );

    res.json(rows);
  };
