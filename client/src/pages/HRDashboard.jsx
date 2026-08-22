import { useEffect, useState } from "react";

export default function HRDashboard() {

  const [stats, setStats] =
    useState({
      employees: 0,
      present: 0,
      absent: 0,
      leave: 0,
      pendingLeaves: 0,
    });

  useEffect(() => {

    fetch(
      "/api/hr/dashboard"
    )
      .then((response) =>
        response.json()
      )
      .then(setStats)
      .catch(console.error);

  }, []);

  return (

    <div className="hr-dashboard">

      <h1>HR Dashboard</h1>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h3>Total Employees</h3>
          <strong>
            {stats.employees}
          </strong>
        </div>

        <div className="dashboard-card">
          <h3>Present Today</h3>
          <strong>
            {stats.present}
          </strong>
        </div>

        <div className="dashboard-card">
          <h3>Absent Today</h3>
          <strong>
            {stats.absent}
          </strong>
        </div>

        <div className="dashboard-card">
          <h3>On Leave</h3>
          <strong>
            {stats.leave}
          </strong>
        </div>

        <div className="dashboard-card">
          <h3>Pending Leave Requests</h3>
          <strong>
            {stats.pendingLeaves}
          </strong>
        </div>

      </div>

    </div>
  );
}
