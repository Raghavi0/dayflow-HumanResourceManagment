import { useEffect, useState } from "react";

export default function Employees() {

  const [employees, setEmployees] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    fetch("/api/employees")
      .then((response) =>
        response.json()
      )
      .then(setEmployees)
      .catch(console.error);

  }, []);

  const filteredEmployees =
    employees.filter((employee) =>
      `${employee.name} ${employee.employeeId} ${employee.email}`
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div className="employees-page">

      <h1>Employees</h1>

      <input
        placeholder="Search employees..."
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
      />

      <table>

        <thead>

          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {filteredEmployees.map(
            (employee) => (

              <tr key={employee.id}>

                <td>
                  {employee.employeeId}
                </td>

                <td>
                  {employee.name}
                </td>

                <td>
                  {employee.email}
                </td>

                <td>
                  {employee.department}
                </td>

                <td>
                  {employee.designation}
                </td>

                <td>
                  {employee.status}
                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
}
