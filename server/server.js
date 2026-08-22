require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT =
  process.env.PORT || 5000;

app.use(
  cors({
    origin:
      "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  express.json()
);


/* HEALTH */

app.get(
  "/api/health",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Dayflow backend is running",
    });
  }
);


/* ROUTES */

const authRoutes =
  require("./routes/authRoutes");

const employeeRoutes =
  require("./routes/employeeRoutes");

const attendanceRoutes =
  require("./routes/attendanceRoutes");

const leaveRoutes =
  require("./routes/leaveRoutes");

const payrollRoutes =
  require("./routes/payrollRoutes");

const hrRoutes =
  require("./routes/hrRoutes");

const reportRoutes =
  require("./routes/reportRoutes");

const notificationRoutes =
  require("./routes/notificationRoutes");


app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/employees",
  employeeRoutes
);

app.use(
  "/api/attendance",
  attendanceRoutes
);

app.use(
  "/api/leaves",
  leaveRoutes
);

app.use(
  "/api/payroll",
  payrollRoutes
);

app.use(
  "/api/hr",
  hrRoutes
);

app.use(
  "/api/reports",
  reportRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);


app.listen(
  PORT,
  () => {
    console.log(
      `Dayflow backend running on http://localhost:${PORT}`
    );
  }
);
