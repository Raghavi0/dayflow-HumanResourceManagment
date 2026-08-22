const express = require("express");

const {
  getAllEmployees,
  getEmployee,
  updateEmployee,
} = require("../controllers/employeeController");

const authMiddleware =
  require("../middleware/authMiddleware");

const router =
  express.Router();

router.get(
  "/",
  authMiddleware,
  getAllEmployees
);

router.get(
  "/:id",
  authMiddleware,
  getEmployee
);

router.put(
  "/:id",
  authMiddleware,
  updateEmployee
);

module.exports = router;
