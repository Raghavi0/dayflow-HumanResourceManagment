import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Sidebar() {

  const { user } = useAuth();

  const employeeLinks = [
    ["Dashboard", "/employee"],
    ["My Profile", "/employee/profile"],
    ["Attendance", "/employee/attendance"],
    ["Leave", "/employee/leave"],
    ["Payroll", "/employee/payroll"],
    ["Notifications", "/employee/notifications"],
  ];

  const adminLinks = [
    ["Dashboard", "/admin"],
    ["Employees", "/admin/employees"],
    ["Attendance", "/admin/attendance"],
    ["Leave Requests", "/admin/leaves"],
    ["Payroll", "/admin/payroll"],
    ["Reports", "/admin/reports"],
    ["Analytics", "/admin/analytics"],
    ["Notifications", "/admin/notifications"],
  ];

  const links =
    user?.role === "ADMIN" || user?.role === "HR"
      ? adminLinks
      : employeeLinks;

  return (
    <aside className="sidebar">

      <div className="logo">
        Dayflow
      </div>

      <nav>

        {links.map(([name, path]) => (
          <NavLink
            key={path}
            to={path}
            className="nav-link"
          >
            {name}
          </NavLink>
        ))}

      </nav>

    </aside>
  );
}
