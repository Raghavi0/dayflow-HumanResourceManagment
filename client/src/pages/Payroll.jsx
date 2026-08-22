import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Payroll() {

  const { user } = useAuth();

  const [payroll, setPayroll] =
    useState(null);

  useEffect(() => {

    if (!user) return;

    fetch(
      `/api/payroll/${user.id}`
    )
      .then((response) =>
        response.json()
      )
      .then(setPayroll)
      .catch(console.error);

  }, [user]);

  if (!payroll) {
    return (
      <p>
        Loading payroll...
      </p>
    );
  }

  return (

    <div className="payroll-page">

      <h1>Payroll</h1>

      <div className="salary-card">

        <h2>
          Salary Details
        </h2>

        <p>
          Basic Salary: ₹
          {payroll.basicSalary}
        </p>

        <p>
          Allowances: ₹
          {payroll.allowances}
        </p>

        <p>
          Deductions: ₹
          {payroll.deductions}
        </p>

        <hr />

        <h2>
          Net Salary: ₹
          {payroll.netSalary}
        </h2>

        <button
          onClick={() =>
            window.print()
          }
        >
          Print Salary Slip
        </button>

      </div>

    </div>
  );
}
