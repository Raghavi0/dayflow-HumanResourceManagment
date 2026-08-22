import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Attendance() {

  const { user } = useAuth();

  const [attendance, setAttendance] =
    useState([]);

  const loadAttendance = async () => {

    const response = await fetch(
      `/api/attendance/${user.id}`
    );

    const data =
      await response.json();

    setAttendance(data);
  };

  useEffect(() => {

    if (user) {
      loadAttendance();
    }

  }, [user]);

  const checkIn = async () => {

    const response = await fetch(
      "/api/attendance/check-in",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          employeeId: user.id,
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    loadAttendance();
  };

  const checkOut = async () => {

    const response = await fetch(
      "/api/attendance/check-out",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          employeeId: user.id,
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    loadAttendance();
  };

  return (

    <div className="attendance-page">

      <h1>Attendance</h1>

      <div className="attendance-actions">

        <button onClick={checkIn}>
          Check In
        </button>

        <button onClick={checkOut}>
          Check Out
        </button>

      </div>

      <table>

        <thead>

          <tr>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Working Hours</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {attendance.map(
            (record) => (

              <tr key={record.id}>

                <td>
                  {record.date}
                </td>

                <td>
                  {record.checkIn || "-"}
                </td>

                <td>
                  {record.checkOut || "-"}
                </td>

                <td>
                  {record.workingHours || "-"}
                </td>

                <td>
                  {record.status}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}
