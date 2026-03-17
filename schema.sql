CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NOT NULL
);

INSERT INTO departments (`name`, `location`) VALUES
('Computer Science', 'Rice Hall'),
('Mathematics', 'Kerchoff Hall'),
('Physics', 'Physics Building'),
('Chemistry', 'Chemistry Building'),
('Biology', 'Biology Building');


CREATE TABLE visitors (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  visit_date  DATE         NOT NULL,
  `name`        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) NOT NULL,
  phone       VARCHAR(20)  NOT NULL,
  whom_to_meet VARCHAR(100) NOT NULL,
  department_id INT        NOT NULL,
  has_appointment BOOLEAN  NOT NULL DEFAULT FALSE,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

INSERT INTO visitors (visit_date, `name`, email, phone, whom_to_meet, department_id, has_appointment) VALUES
('2024-01-15', 'Alice Johnson', 'alice.johnson@example.com', '123-456-7890', 'Dr. Smith', 1, TRUE),
('2024-01-16', 'Bob Smith', 'bob.smith@example.com', '987-654-3210', 'Dr. Johnson', 2, FALSE),
('2024-01-17', 'Charlie Brown', 'charlie.brown@example.com', '555-555-5555', 'Dr. Williams', 3, TRUE);