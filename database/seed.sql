INSERT IGNORE INTO users (name,email,password,role,department) VALUES
('Admin','admin@dayflow.com','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68L.JZneT.t5O','Admin','HR'),
('HR Lead','hr@dayflow.com','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68L.JZneT.t5O','HR','People Ops'),
('Alex Morgan','alex@dayflow.com','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68L.JZneT.t5O','Employee','Engineering'),
('Priya Sharma','priya@dayflow.com','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68L.JZneT.t5O','Employee','Marketing'),
('Jordan Lee','jordan@dayflow.com','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68L.JZneT.t5O','Employee','Design');

INSERT IGNORE INTO employees (user_id,full_name,email,phone,position,department,salary,hire_date,status) VALUES
(3,'Alex Morgan','alex@dayflow.com','+1-555-0101','Senior Engineer','Engineering',95000,'2023-01-15','Active'),
(4,'Priya Sharma','priya@dayflow.com','+1-555-0102','Marketing Lead','Marketing',72000,'2022-08-20','Active'),
(5,'Jordan Lee','jordan@dayflow.com','+1-555-0103','UI Designer','Design',68000,'2023-03-10','On Leave');

INSERT IGNORE INTO attendance (employee_id,date,check_in,check_out,status) VALUES
(1,'2026-08-21','09:05:00','18:00:00','Present'),
(2,'2026-08-21','08:45:00','17:50:00','Present'),
(3,'2026-08-21','10:15:00','16:30:00','Half Day');

INSERT IGNORE INTO leave_requests (employee_id,leave_type,start_date,end_date,reason,status,approved_by) VALUES
(3,'Casual','2026-08-25','2026-08-27','Family event','Pending',NULL),
(2,'Sick','2026-08-22','2026-08-23','Flu','Approved',1);

INSERT IGNORE INTO payroll (employee_id,month,year,basic_pay,allowances,deductions,net_pay) VALUES
(1,'August',2026,95000,5000,12000,88000),
(2,'August',2026,72000,3000,8000,67000);

INSERT IGNORE INTO notifications (user_id,title,message,is_read) VALUES
(2,'Payroll Processed','August payroll has been processed for all active staff.',0),
(3,'Leave Request','Your casual leave request is pending approval.',0),
(4,'New Policy','Updated hybrid work policy published.',0);
