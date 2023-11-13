USE employee_db;

INSERT INTO department (name)
VALUES
('Sales'),
('Legal'),
('Finance'),
('Engeeniring');

INSERT INTO role ( title, salary, department_id)
VALUES
('salesperson', 80000, 1),
('Lead Engeering', 150000, 2),
('Software Engineer', 120000, 2),
('Acount Manager', 160000, 3),
('Acountant', 125000,3),
('Legal Team Lead ', 200000, 4),
('Lawyer', 350000, 4);

INSERT INTO employee ( fname, lname, role_id, manager_id)
VALUES
('John', 'Smith',1, NULL ),
('John', 'Doe', 2, 1),
('Jennifer', 'Anderson', 3, NULL ),
('Samiye', 'Ahsan', 4, 3),
('Ben', 'Sunny', 6, NULL);

