--------------------23/12/2022-----------------
CREATE TABLE leaveforecast.employee (
    emp_id varchar(255) NOT NULL,
    employee_name varchar(255) NOT NULL,
    expedia_fg_name varchar(255) NOT NULL,
    vendor_name varchar(255) NOT NULL,
    job_title varchar(255) NOT NULL,
    hm varchar(255) NOT NULL,
    bill_rate varchar(255) NOT NULL,
    country varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    sow varchar(255) NOT NULL,
    org varchar(255) NOT NULL,
    team varchar(255) NOT NULL,
    billability varchar(255) NOT NULL,
    remarks varchar(500),
    PRIMARY KEY (emp_id)
);

--------------------27/12/2022-----------------
CREATE TABLE leaveforecast.leave_submission (
     ls_id SERIAL PRIMARY KEY,
     emp_id  varchar(255) NOT NULL,
     month_year varchar(10) NOT NULL,
     leave_date_list varchar(500) NOT NULL,
     FOREIGN KEY (emp_id) REFERENCES leaveforecast.employee(emp_id)
);


CREATE TABLE `roles` (
  `role_id` int NOT NULL,
  `role_name` varchar(100) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `user_id` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `role_id` int NOT NULL,
  `email_Id` varchar(60) NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `role_id_idx` (`role_id`),
  CONSTRAINT `role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
