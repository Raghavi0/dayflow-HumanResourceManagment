import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    employeeId: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "EMPLOYEE",
  });

  const [error, setError] = useState("");

  const update = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Registration successful");

      navigate("/login");

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Create Account</h1>

        <form onSubmit={submit}>

          <input
            name="employeeId"
            placeholder="Employee ID"
            value={form.employeeId}
            onChange={update}
            required
          />

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={update}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={update}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={update}
            required
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={update}
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={update}
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="HR">HR / Admin</option>
          </select>

          {error && <p className="error">{error}</p>}

          <button>Create Account</button>

        </form>

      </div>

    </div>
  );
}
