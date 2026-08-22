import { useEffect, useState } from "react";

export default function Reports() {

  const [report, setReport] =
    useState([]);

  const [type, setType] =
    useState("attendance");

  const loadReport = async () => {

    const response = await fetch(
      `/api/reports/${type}`
    );

    const data =
      await response.json();

    setReport(data);
  };

  useEffect(() => {
    loadReport();
  }, [type]);

  return (

    <div className="reports-page">

      <h1>Reports</h1>

      <select
        value={type}
        onChange={(event) =>
          setType(event.target.value)
        }
      >
        <option value="attendance">
          Attendance
        </option>

        <option value="leave">
          Leave
        </option>

        <option value="payroll">
          Payroll
        </option>

        <option value="employees">
          Employees
        </option>
      </select>

      <button
        onClick={() =>
          window.print()
        }
      >
        Print Report
      </button>

      <table>

        <thead>

          <tr>
            {report.length > 0 &&
              Object.keys(
                report[0]
              ).map((key) => (
                <th key={key}>
                  {key}
                </th>
              ))}
          </tr>

        </thead>

        <tbody>

          {report.map(
            (row, index) => (

              <tr key={index}>

                {Object.values(row).map(
                  (value, valueIndex) => (
                    <td key={valueIndex}>
                      {String(value)}
                    </td>
                  )
                )}

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
}
