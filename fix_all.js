const fs = require('fs');
const files = [
  'client/src/pages/Login.jsx','client/src/pages/Register.jsx',
  'client/src/pages/Attendance.jsx','client/src/pages/Employees.jsx',
  'client/src/pages/Leave.jsx','client/src/pages/LeaveApprovals.jsx',
  'client/src/pages/Payroll.jsx','client/src/pages/Reports.jsx',
  'client/src/pages/Notifications.jsx','client/src/pages/Profile.jsx',
  'client/src/pages/EmployeeDashboard.jsx','client/src/pages/HRDashboard.jsx'
];
for (const f of files) {
  try {
    let c = fs.readFileSync(f, 'utf8');
    // Fix literal \n at start if present
    c = c.replace(/import \{ API_URL \} from '\.\.\/services\/api';\nimport React/, "import React");
    // Add API_URL import after React import if missing
    if (!c.includes("import { API_URL }")) {
      c = c.replace(/(import React[^;]*;)/, "$1\nimport { API_URL } from '../services/api';");
    }
    fs.writeFileSync(f, c);
    console.log('Fixed', f);
  } catch (e) { console.log('Skip', f); }
}
