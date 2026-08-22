import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Leave() {

  const { user } = useAuth();

  const [form, setForm] = useState({
    type: "Paid Leave",
    startDate: "",
    endDate: "",
    remarks: "",
  });

  const [history, setHistory] =
    useState([]);

  const loadHistory = async () => {

    const response = await fetch(
      `/api/leaves/employee/${user.id}`
    );

    const data =
      await response.json();

    setHistory(data);
  };

  useEffect(() => {

    if (user) {
      loadHistory();
    }

  }, [user]);

  const handleChange = (event) => {

    setForm({
      ...form,
      [event.target.name]:
        event.target.value,
    });
  };

  const submit = async (event) => {

    event.preventDefault();

    const response = await fetch(
      "/api/leaves",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          employeeId: user.id,
          ...form,
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert(
      "Leave request submitted successfully"
    );

    setForm({
      type: "Paid Leave",
      startDate: "",
      endDate: "",
      remarks: "",
    });

    loadHistory();
  };

  return (

    <div className="leave-page">

      <h1>Leave Management</h1>

      <form onSubmit={submit}>

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option>
            Paid Leave
          </option>

          <option>
            Sick Leave
          </option>

          <option>
            Unpaid Leave
          </option>
        </select>

        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
        />

        <textarea
          name="remarks"
          placeholder="Remarks"
          value={form.remarks}
          onChange={handleChange}
        />

        <button type="submit">
          Apply Leave
        </button>

      </form>

      <h2>Leave History</h2>

      <table>

        <thead>

          <tr>
            <th>Type</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Remarks</th>
          </tr>

        </thead>

        <tbody>

          {history.map(
            (leave) => (

              <tr key={leave.id}>

                <td>
                  {leave.type}
                </td>

                <td>
                  {leave.startDate}
                </td>

                <td>
                  {leave.endDate}
                </td>

                <td>
                  {leave.status}
                </td>

                <td>
                  {leave.remarks}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}
