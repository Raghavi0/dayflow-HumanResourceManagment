const express = require("express");

const {
  createLeave,
  getEmployeeLeaves,
  getAllLeaves,
  updateLeave,
} = require("../controllers/leaveController");

const authMiddleware =
  require("../middleware/authMiddleware");

const router =
  express.Router();

router.post(
  "/",
  authMiddleware,
  createLeave
);

router.get(
  "/employee/:employeeId",
  authMiddleware,
  getEmployeeLeaves
);

router.get(
  "/",
  authMiddleware,
  getAllLeaves
);

router.put(
  "/:id/:action",
  authMiddleware,
  updateLeave
);

module.exports = router;
