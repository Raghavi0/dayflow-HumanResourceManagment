import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function EmployeeDashboard() {

  const { user } = useAuth();
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    attendance: null,
    leaveBalance: 0,
    pendingLeave: 0,
    salary: 0,
  });

  useEffect(() => {

    if (!user) return;

    api.getEmployeeDashboard()
      .then((data) => {
        setDashboard(data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, [user]);

  return (

    <div className="dashboard-page">

      <div className="dashboard-header">

        <div>
          <h1>
            Welcome, {user?.name}
          </h1>

          <p>
            Here's your Dayflow overview.
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/profile")
          }
        >
          View Profile
        </button>

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h3>Today's Attendance</h3>

          <strong>
            {dashboard.attendance
              ?.status || "Not marked"}
          </strong>
        </div>

        <div className="dashboard-card">
          <h3>Leave Balance</h3>

          <strong>
            {dashboard.leaveBalance}
          </strong>
        </div>

        <div className="dashboard-card">
          <h3>Pending Leave</h3>

          <strong>
            {dashboard.pendingLeave}
          </strong>
        </div>

        <div className="dashboard-card">
          <h3>Current Salary</h3>

          <strong>
            ₹{dashboard.salary}
          </strong>
        </div>

      </div>

      <div className="quick-actions">

        <button
          onClick={() =>
            navigate("/attendance")
          }
        >
          Attendance
        </button>

        <button
          onClick={() =>
            navigate("/leave")
          }
        >
          Apply Leave
        </button>

        <button
          onClick={() =>
            navigate("/payroll")
          }
        >
          Payroll
        </button>

      </div>

    </div>
  );
}
