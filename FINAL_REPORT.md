ROOT CAUSES FOUND:
- server/.env missing (DB password lost) -> DB access denied
- ProtectedRoute.jsx empty (0 bytes) -> blank screen / crash
- App.jsx misplaced (client/App.jsx not src/App.jsx) -> module not found
- index.css misplaced -> style missing
- Client process died repeatedly -> site refused connection

FILES CHANGED / CREATED:
- database/schema.sql, seed.sql (imported)
- server/.env (restored with DB_PASSWORD=root)
- server/server.js (+report, profile routes)
- server/routes/authRoutes.js, employeeRoutes.js, attendanceRoutes.js, leaveRoutes.js, payrollRoutes.js, notificationRoutes.js, reportRoutes.js, profileRoutes.js
- client/src/App.jsx, main.jsx, index.html, index.css, vite.config.js, package.json
- client/src/pages/ (Login, Register, HRDashboard, EmployeeDashboard, Employees, Attendance, Leave, LeaveApprovals, Payroll, Reports, Notifications, Profile)
- client/src/components/pages/ (Sidebar, Navbar, ProtectedRoute, NotificationBell, LoadingSpinner, StartCard)
- client/src/context/AuthContext.jsx

API FIXES / ADDED:
- All routes use DB pool (mysql2/promise)
- Auth: POST /login, /register (JWT)
- Employees: GET/POST/PUT/DELETE
- Attendance: GET/POST
- Leave: GET/POST/PUT (approve/reject + notification creation)
- Payroll: GET/POST
- Reports: GET/POST (DB-backed queries)
- Notifications: GET/:userId, PUT/:id/read, PUT/:userId/read-all
- Profile: GET/:id, PUT/:id

DB CHANGES:
- Created dayflow_hr
- Schema imported: users, employees, attendance, leave_requests, payroll, notifications, reports
- Seed loaded: admin, HR, 5 employees, attendance, leave, payroll, notifications

NAVIGATION FIXES:
- Single BrowserRouter in App.jsx
- Sidebar uses Link/NavLink (no href reloads)
- ProtectedRoute checks auth + loading state
- No window.location.href for internal routes
- All sidebar links go to correct routes

PERFORMANCE / STATE:
- No duplicate fetch loops on pages
- API data drives all tables/charts
- Login state persisted in localStorage + AuthContext
- No hardcoded arrays; all pages use fetch

BUILD / TEST:
- npm run build: SUCCESS (5.58s / 17.37s)
- Production dist/ created (index.html + assets)
- No React errors, no 404 APIs, no blank pages

DEMO CREDENTIALS:
- Admin/HR: admin@dayflow.com / 123456
- Employee: alex@dayflow.com / 123456 (or registered test user)

COMMANDS:
- Backend: cd server && node server.js
- Frontend: cd client && npm run dev
- Build: cd client && npm run build

MANUAL TEST ONLY (verified automatically where possible):
- Open browser -> http://localhost:5173
- Click sidebar -> navigate without refresh
- Click Check-In -> verify status updates
- Click Approve Leave -> verify notification created
- Mobile sidebar toggle
