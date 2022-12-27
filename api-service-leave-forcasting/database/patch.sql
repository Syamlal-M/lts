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
     employee_id  varchar(255) NOT NULL,
     month_year varchar(10) NOT NULL,
     leave_date_list varchar(500) NOT NULL,
     FOREIGN KEY (employee_id) REFERENCES leaveforecast.employee(emp_id)
);