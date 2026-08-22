-- ============================================================
-- DAYFLOW HRMS - DATABASE SCHEMA
-- Human Resource Management System
-- PostgreSQL
-- ============================================================

-- ============================================================
-- 1. USERS
-- Authentication and role management
-- ============================================================

CREATE TABLE users (
    id SERIAL PRIMARY KEY,

    employee_id VARCHAR(50) UNIQUE NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    role VARCHAR(20) NOT NULL
        CHECK (role IN ('employee', 'hr')),

    email_verified BOOLEAN DEFAULT FALSE,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 2. DEPARTMENTS
-- Employee department information
-- ============================================================

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) UNIQUE NOT NULL,

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 3. EMPLOYEES
-- Employee profile and job information
-- ============================================================

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,

    user_id INTEGER UNIQUE NOT NULL,

    employee_id VARCHAR(50) UNIQUE NOT NULL,

    first_name VARCHAR(100) NOT NULL,

    last_name VARCHAR(100),

    email VARCHAR(255) UNIQUE NOT NULL,

    phone VARCHAR(20),

    address TEXT,

    profile_picture TEXT,

    department_id INTEGER,

    designation VARCHAR(100),

    joining_date DATE,

    manager_id INTEGER,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_employee_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_employee_department
        FOREIGN KEY (department_id)
        REFERENCES departments(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_employee_manager
        FOREIGN KEY (manager_id)
        REFERENCES employees(id)
        ON DELETE SET NULL
);


-- ============================================================
-- 4. EMPLOYEE DOCUMENTS
-- Employee documents required by the specification
-- ============================================================

CREATE TABLE employee_documents (
    id SERIAL PRIMARY KEY,

    employee_id INTEGER NOT NULL,

    document_name VARCHAR(255) NOT NULL,

    document_type VARCHAR(100),

    document_url TEXT NOT NULL,

    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_document_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(id)
        ON DELETE CASCADE
);


-- ============================================================
-- 5. ATTENDANCE
-- Daily employee attendance
-- ============================================================

CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,

    employee_id INTEGER NOT NULL,

    attendance_date DATE NOT NULL,

    check_in TIMESTAMP,

    check_out TIMESTAMP,

    working_hours NUMERIC(5,2) DEFAULT 0,

    status VARCHAR(20) NOT NULL DEFAULT 'Present'
        CHECK (
            status IN (
                'Present',
                'Absent',
                'Half-day',
                'Leave'
            )
        ),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_attendance_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_employee_attendance
        UNIQUE (employee_id, attendance_date)
);


-- ============================================================
-- 6. LEAVE REQUESTS
-- Employee leave applications and HR approval
-- ============================================================

CREATE TABLE leave_requests (
    id SERIAL PRIMARY KEY,

    employee_id INTEGER NOT NULL,

    leave_type VARCHAR(20) NOT NULL
        CHECK (
            leave_type IN (
                'Paid',
                'Sick',
                'Unpaid'
            )
        ),

    start_date DATE NOT NULL,

    end_date DATE NOT NULL,

    remarks TEXT,

    status VARCHAR(20) NOT NULL DEFAULT 'Pending'
        CHECK (
            status IN (
                'Pending',
                'Approved',
                'Rejected'
            )
        ),

    hr_comment TEXT,

    approved_by INTEGER,

    approved_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_leave_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_leave_approver
        FOREIGN KEY (approved_by)
        REFERENCES users(id)
        ON DELETE SET NULL,

    CONSTRAINT valid_leave_dates
        CHECK (end_date >= start_date)
);


-- ============================================================
-- 7. SALARY / PAYROLL
-- Employee salary structure
-- ============================================================

CREATE TABLE salary (
    id SERIAL PRIMARY KEY,

    employee_id INTEGER UNIQUE NOT NULL,

    basic_salary NUMERIC(12,2) NOT NULL DEFAULT 0,

    allowances NUMERIC(12,2) NOT NULL DEFAULT 0,

    deductions NUMERIC(12,2) NOT NULL DEFAULT 0,

    net_salary NUMERIC(12,2)
        GENERATED ALWAYS AS
        (basic_salary + allowances - deductions)
        STORED,

    effective_from DATE DEFAULT CURRENT_DATE,

    updated_by INTEGER,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_salary_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_salary_updated_by
        FOREIGN KEY (updated_by)
        REFERENCES users(id)
        ON DELETE SET NULL,

    CONSTRAINT positive_basic_salary
        CHECK (basic_salary >= 0),

    CONSTRAINT positive_allowances
        CHECK (allowances >= 0),

    CONSTRAINT positive_deductions
        CHECK (deductions >= 0)
);


-- ============================================================
-- 8. NOTIFICATIONS
-- Employee and HR notifications
-- ============================================================

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    title VARCHAR(255) NOT NULL,

    message TEXT NOT NULL,

    notification_type VARCHAR(50),

    is_read BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_notification_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- ============================================================
-- 9. INDEXES
-- Improve frequently used queries
-- ============================================================

CREATE INDEX idx_employees_department
    ON employees(department_id);

CREATE INDEX idx_attendance_employee
    ON attendance(employee_id);

CREATE INDEX idx_attendance_date
    ON attendance(attendance_date);

CREATE INDEX idx_leave_employee
    ON leave_requests(employee_id);

CREATE INDEX idx_leave_status
    ON leave_requests(status);

CREATE INDEX idx_notifications_user
    ON notifications(user_id);

CREATE INDEX idx_notifications_read
    ON notifications(is_read);


-- ============================================================
-- 10. INITIAL DEPARTMENTS
-- Demo data
-- ============================================================

INSERT INTO departments (name, description)
VALUES
    ('Engineering', 'Software and technology team'),
    ('Human Resources', 'Human resources and employee management'),
    ('Finance', 'Finance and payroll team'),
    ('Marketing', 'Marketing and communications team'),
    ('Operations', 'Business operations team')
ON CONFLICT (name) DO NOTHING;


-- ============================================================
-- DATABASE COMPLETE
-- ============================================================