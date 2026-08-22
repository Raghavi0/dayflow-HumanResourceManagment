const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../db/db");

exports.register = async (req, res) => {

  try {

    const {
      employeeId,
      name,
      email,
      password,
      role = "EMPLOYEE",
    } = req.body;

    if (
      !employeeId ||
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message:
          "All required fields are required",
      });
    }

    const [existing] = await db.query(
      "SELECT id FROM users WHERE email = ? OR employee_id = ?",
      [email, employeeId]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        message:
          "Employee ID or email already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users
       (employee_id, name, email, password, role)
       VALUES (?, ?, ?, ?, ?)`,
      [
        employeeId,
        name,
        email,
        hashedPassword,
        role,
      ]
    );

    await db.query(
      `INSERT INTO employees
       (user_id, employee_id, name, email)
       VALUES (?, ?, ?, ?)`,
      [
        result.insertId,
        employeeId,
        name,
        email,
      ]
    );

    res.status(201).json({
      success: true,
      message:
        "Registration successful",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Registration failed",
    });
  }
};


exports.login = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

    const user = rows[0];

    const valid =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!valid) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

    const token =
      jwt.sign(
        {
          id: user.id,
          employeeId:
            user.employee_id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

    res.json({
      success: true,

      token,

      user: {
        id: user.id,
        employeeId:
          user.employee_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Login failed",
    });
  }
};


exports.me = async (req, res) => {

  try {

    const [rows] = await db.query(
      `SELECT
        id,
        employee_id,
        name,
        email,
        role
       FROM users
       WHERE id = ?`,
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message:
          "User not found",
      });
    }

    const user = rows[0];

    res.json({
      user: {
        id: user.id,
        employeeId:
          user.employee_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    res.status(500).json({
      message:
        "Unable to fetch user",
    });
  }
};
