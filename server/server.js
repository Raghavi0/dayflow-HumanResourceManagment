require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Dayflow backend is running",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const authRoutes =
  require("./routes/authRoutes");

app.use(
  "/api/auth",
  authRoutes
);

app.listen(PORT, () => {
  console.log(
    `Dayflow backend running on http://localhost:${PORT}`
  );
});
