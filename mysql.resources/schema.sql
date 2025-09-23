/* ** Root ** */
DROP DATABASE IF EXISTS `smartsme`;
CREATE DATABASE `smartsme`;
-- DROP USER IF EXISTS 'smartsmeusr' @'%';
-- CREATE USER 'smartsmeusr' @'%' IDENTIFIED WITH mysql_native_password BY '$m@rt$mepwd';
-- GRANT ALL PRIVILEGES ON smartsme.* TO 'smartsmeusr' @'%' WITH GRANT OPTION;

USE smartsme;

CREATE TABLE `users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `mobile` VARCHAR(10) NOT NULL UNIQUE, -- 10 digit Indian mobile number
    `password` VARCHAR(255) NOT NULL, -- bcrypt hash (password123)
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;


-- SEEDERS
INSERT INTO `users` (`username`, `name`, `email`, `mobile`, `password`) VALUES
('alicej',   'Alice Johnson',   'alice@example.com',   '9812345670', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.'),
('bobsmith', 'Bob Smith',       'bob@example.com',     '9912345671', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.'),
('charlieb', 'Charlie Brown',   'charlie@example.com', '9712345672', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.'),
('dianap',   'Diana Prince',    'diana@example.com',   '9812345673', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.'),
('ethanh',   'Ethan Hunt',      'ethan@example.com',   '9912345674', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.'),
('fionag',   'Fiona Gallagher', 'fiona@example.com',   '9712345675', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.'),
('georgem',  'George Miller',   'george@example.com',  '9812345676', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.'),
('hannahl',  'Hannah Lee',      'hannah@example.com',  '9912345677', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.'),
('ianc',     'Ian Curtis',      'ian@example.com',     '9712345678', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.'),
('jasminep', 'Jasmine Patel',   'jasmine@example.com', '9812345679', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.'),
('kevinw',   'Kevin Wu',        'kevin@example.com',   '9912345680', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.');
