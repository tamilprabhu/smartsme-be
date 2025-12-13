-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 23, 2025 at 08:06 PM
-- Server version: 9.3.0
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smartsme`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
    `id` INT NOT NULL AUTO_INCREMENT,  -- INT (signed)
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `first_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `last_name` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `mobile` VARCHAR(10) NOT NULL UNIQUE,
    `address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_date` datetime DEFAULT NULL,
    `updated_date` datetime DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `first_name`, `last_name`, `name`, `email`, `mobile`, `address`, `password`, `created_date`, `updated_date`) VALUES
('tamil', 'Tamilselvan', 'M', 'Tamilselvan M', 'tamil@test.com', '7889043243', 'Medavakkam, Chennai', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', '2025-09-23 23:29:52', '2025-09-23 23:29:52'),
('nandha', 'Nandhakumar', 'V', 'Nandhakumar V', 'nandha@test.com', '7798343227', 'Kovilambakkam, Chennai', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', '2025-09-23 23:32:02', '2025-09-23 23:32:02'),
('alicej', 'Alice', 'Johnson', 'Alice Johnson', 'alice@example.com', '9812345670', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL),
('bobsmith', 'Bob', 'Smith', 'Bob Smith', 'bob@example.com', '9912345671', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL),
('charlieb', 'Charlie', 'Brown', 'Charlie Brown', 'charlie@example.com', '9712345672', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL),
('dianap', 'Diana', 'Prince', 'Diana Prince', 'diana@example.com', '9812345673', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL),
('ethanh', 'Ethan', 'Hunt', 'Ethan Hunt', 'ethan@example.com', '9912345674', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL),
('fionag', 'Fiona', 'Gallagher', 'Fiona Gallagher', 'fiona@example.com', '9712345675', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL),
('georgem', 'George', 'Miller', 'George Miller', 'george@example.com', '9812345676', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL),
('hannahl', 'Hannah', 'Lee', 'Hannah Lee', 'hannah@example.com', '9912345677', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL),
('ianc', 'Ian', 'Curtis', 'Ian Curtis', 'ian@example.com', '9712345678', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL),
('jasminep', 'Jasmine', 'Patel', 'Jasmine Patel', 'jasmine@example.com', '9812345679', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL),
('kevinw', 'Kevin', 'Wu', 'Kevin Wu', 'kevin@example.com', '9912345680', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL),
('rajeshk', 'Rajesh', 'Kumar', 'Rajesh Kumar', 'rajesh@prestige.com', '9876543210', 'Bangalore, Karnataka', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL),
('priyam', 'Priya', 'Menon', 'Priya Menon', 'priya@prestige.com', '9876543211', 'Bangalore, Karnataka', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL),
('amits', 'Amit', 'Sharma', 'Amit Sharma', 'amit@prestige.com', '9876543212', 'Bangalore, Karnataka', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL),
('sunitas', 'Sunita', 'Singh', 'Sunita Singh', 'sunita@prestige.com', '9876543213', 'Bangalore, Karnataka', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL),
('vikramr', 'Vikram', 'Reddy', 'Vikram Reddy', 'vikram@prestige.com', '9876543214', 'Bangalore, Karnataka', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `buyer`
--

CREATE TABLE `buyer` (
  `buyer_id_seq` int NOT NULL,
  `buyer_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `buyer_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `buyer_address` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `buyer_phone` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `buyer_email` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `buyer_gstin` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buyer`
--

INSERT INTO `buyer` (`buyer_id_seq`, `buyer_id`, `company_id`, `buyer_name`, `buyer_address`, `buyer_phone`, `buyer_email`, `buyer_gstin`, `create_date`, `update_date`) VALUES
(10001, 'FINO_BY_001', 'FINO001', 'Construction Materials Ltd', 'Chennai, Tamil Nadu', '9876543210', 'orders@constmat.com', '33AABCA1234A1Z5', NOW(), NOW()),
(10002, 'FINO_BY_002', 'FINO001', 'Plumbing Solutions Co', 'Bangalore, Karnataka', '9876543211', 'purchase@plumbsol.com', '29AABCA1234B1Z5', NOW(), NOW()),
(10003, 'PRES_BY_001', 'PRES001', 'Kitchen Appliance Distributors', 'Mumbai, Maharashtra', '9876543212', 'orders@kitchendist.com', '27AABCA1234C1Z5', NOW(), NOW()),
(10004, 'PRES_BY_002', 'PRES001', 'Home Products Retail', 'Delhi, NCR', '9876543213', 'purchase@homeretail.com', '07AABCA1234D1Z5', NOW(), NOW());

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `company_id_seq` int NOT NULL,
  `company_id` varchar(12) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `business_cons` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `company_type` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pincode` int DEFAULT NULL,
  `prop_name` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `direct_phone` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `office_phone` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mgmt_phone` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mail_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nature_of_business` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `auth_person` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mobile_no` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_date` datetime NOT NULL,
  `update_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`company_id_seq`, `company_id`, `company_name`, `business_cons`, `company_type`, `address`, `pincode`, `prop_name`, `direct_phone`, `office_phone`, `mgmt_phone`, `mail_id`, `nature_of_business`, `auth_person`, `mobile_no`, `create_date`, `update_date`) VALUES
(100000, 'FINO001', 'Finolex Industries Ltd', 'corporation', 'large scale', 'Finolex Bhavan, Pune-Bangalore Highway, Pune', 411045, 'Prakash P Chhabria', '2067121800', '2067121800', '2067121800', 'contact@finolex.com', 'manufacturing', 'Prakash P Chhabria', '2067121800', '2025-01-01 00:00:00', '2025-01-01 00:00:00'),
(100001, 'PRES001', 'Prestige Smart Kitchen Ltd', 'corporation', 'large scale', 'TTK Prestige House, Bangalore', 560042, 'T T Jagannathan', '8025505555', '8025505555', '8025505555', 'contact@prestigesmartcooking.com', 'manufacturing', 'T T Jagannathan', '8025505555', '2025-01-01 00:00:00', '2025-01-01 00:00:00'),
(100002, 'MILT001', 'Milton Industries Ltd', 'corporation', 'medium scale', 'Milton House, Rajkot, Gujarat', 360002, 'T M Louis', '2812234567', '2812234567', '2812234567', 'contact@milton.in', 'manufacturing', 'T M Louis', '2812234567', '2025-01-01 00:00:00', '2025-01-01 00:00:00'),
(100003, 'BUTT001', 'Butterfly Gandhimathi Appliances Ltd', 'corporation', 'medium scale', 'No.1, Sardar Patel Road, Chennai', 600113, 'G Venkatesh', '4428156789', '4428156789', '4428156789', 'contact@butterflyindia.com', 'manufacturing', 'G Venkatesh', '4428156789', '2025-01-01 00:00:00', '2025-01-01 00:00:00'),
(100004, 'HAWK001', 'Hawkins Cookers Ltd', 'corporation', 'medium scale', 'Hawkins House, Mumbai', 400013, 'Brahm Vasudeva', '2224567890', '2224567890', '2224567890', 'contact@hawkinscookers.com', 'manufacturing', 'Brahm Vasudeva', '2224567890', '2025-01-01 00:00:00', '2025-01-01 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `dispatch`
--

CREATE TABLE `dispatch` (
  `dispatch_id_seq` int NOT NULL,
  `prod_id` varchar(20) DEFAULT NULL,
  `company_id` varchar(20) DEFAULT NULL,
  `order_id` varchar(20) DEFAULT NULL,
  `dispatch_id` varchar(20) DEFAULT NULL,
  `dispatch_date` datetime DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `no_of_packs` int DEFAULT NULL,
  `total_weight` decimal(10,4) DEFAULT NULL,
  `normal_weight` decimal(10,4) DEFAULT NULL,
  `norms_weight` decimal(10,4) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dispatch`
--

INSERT INTO `dispatch` (`dispatch_id_seq`, `prod_id`, `company_id`, `order_id`, `dispatch_id`, `dispatch_date`, `quantity`, `no_of_packs`, `total_weight`, `normal_weight`, `norms_weight`, `create_date`, `update_date`) VALUES
(1000010, 'FINO_PR_001', 'FINO001', 'FINO_OR_001', 'FINO_DL_001', '2025-02-10 00:00:00', 500, 20, 1250.0000, 2.5000, 1312.5000, NOW(), NOW()),
(1000011, 'FINO_PR_002', 'FINO001', 'FINO_OR_002', 'FINO_DL_002', '2025-02-15 00:00:00', 1000, 50, 800.0000, 0.8000, 864.0000, NOW(), NOW()),
(1000012, 'PRES_PR_001', 'PRES001', 'PRES_OR_001', 'PRES_DL_001', '2025-02-12 00:00:00', 100, 5, 3500.0000, 35.0000, 3920.0000, NOW(), NOW()),
(1000013, 'PRES_PR_002', 'PRES001', 'PRES_OR_002', 'PRES_DL_002', '2025-02-08 00:00:00', 400, 20, 4800.0000, 12.0000, 5520.0000, NOW(), NOW());

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id_seq` int NOT NULL,
  `user_id` INT NOT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `salary` int DEFAULT NULL,
  `active_flag` char(1) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  PRIMARY KEY (`employee_id_seq`),
  KEY `idx_employee_id_seq` (`employee_id_seq`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id_seq`, `user_id`, `company_id`, `salary`, `active_flag`, `create_date`, `update_date`) VALUES
-- Finolex Industries employees
(1000000, 1, 'FINO001', 150000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00'),
(1000001, 3, 'FINO001', 100000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00'),
(1000002, 4, 'FINO001', 80000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00'),
(1000003, 5, 'FINO001', 80000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00'),
(1000004, 6, 'FINO001', 70000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00'),
(1000005, 7, 'FINO001', 45000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00'),
(1000006, 8, 'FINO001', 45000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00'),
(1000007, 9, 'FINO001', 40000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00'),
(1000008, 10, 'FINO001', 40000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00'),
(1000009, 11, 'FINO001', 60000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00'),
(1000010, 12, 'FINO001', 45000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00'),
(1000011, 13, 'FINO001', 70000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00'),
-- Prestige Smart Kitchen employees
(1000012, 14, 'PRES001', 140000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00'),
(1000013, 15, 'PRES001', 95000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00'),
(1000014, 16, 'PRES001', 75000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00'),
(1000015, 17, 'PRES001', 42000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00'),
(1000016, 18, 'PRES001', 58000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `machine`
--

CREATE TABLE `machine` (
  `machine_id_seq` int NOT NULL,
  `machine_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `machine_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `machine_type` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `capacity` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `model` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `active_flag` char(1) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `machine`
--

INSERT INTO `machine` (`machine_id_seq`, `machine_id`, `company_id`, `machine_name`, `machine_type`, `capacity`, `model`, `active_flag`, `create_date`, `update_date`) VALUES
(10001, 'FINO_DC_001', 'FINO001', 'Die Casting Machine', 'Production', '200T', 'DC-200', 'Y', NOW(), NOW()),
(10002, 'FINO_TR_001', 'FINO001', 'Trimming Machine', 'Trimming', '150T', 'TR-150', 'Y', NOW(), NOW()),
(10003, 'FINO_DM_001', 'FINO001', 'Drilling Machine', 'Drilling / Tapping', '50T', 'DM-50', 'Y', NOW(), NOW()),
(10004, 'FINO_TM_001', 'FINO001', 'Tapping Machine', 'Tapping Machine', '30T', 'TM-30', 'Y', NOW(), NOW()),
(10005, 'FINO_CNC_001', 'FINO001', 'CNC Lathe', 'CNC Lathe', '100T', 'CNC-100', 'Y', NOW(), NOW()),
(10006, 'FINO_SB_001', 'FINO001', 'Shot Blast Machine', 'Shot Blasting', '80T', 'SB-80', 'Y', NOW(), NOW()),
(10007, 'FINO_PC_001', 'FINO001', 'Powder Coating Machine', 'Powder Coating', '120T', 'PC-120', 'Y', NOW(), NOW()),
(10008, 'PRES_DC_001', 'PRES001', 'Die Casting Machine', 'Production', '180T', 'DC-180', 'Y', NOW(), NOW()),
(10009, 'PRES_TR_001', 'PRES001', 'Trimming Machine', 'Trimming', '140T', 'TR-140', 'Y', NOW(), NOW()),
(10010, 'PRES_DM_001', 'PRES001', 'Drilling Machine', 'Drilling / Tapping', '45T', 'DM-45', 'Y', NOW(), NOW()),
(10011, 'PRES_TM_001', 'PRES001', 'Tapping Machine', 'Tapping Machine', '25T', 'TM-25', 'Y', NOW(), NOW()),
(10012, 'PRES_CNC_001', 'PRES001', 'CNC Lathe', 'CNC Lathe', '90T', 'CNC-90', 'Y', NOW(), NOW()),
(10013, 'PRES_SB_001', 'PRES001', 'Shot Blast Machine', 'Shot Blasting', '70T', 'SB-70', 'Y', NOW(), NOW()),
(10014, 'PRES_PC_001', 'PRES001', 'Powder Coating Machine', 'Powder Coating', '110T', 'PC-110', 'Y', NOW(), NOW());

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `order_id_seq` int NOT NULL,
  `order_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `prod_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `buyer_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_status` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `target_date` datetime DEFAULT NULL,
  `order_quantity` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`order_id_seq`, `order_id`, `order_name`, `company_id`, `prod_id`, `buyer_id`, `order_status`, `order_date`, `target_date`, `order_quantity`, `price`, `discount`, `total_price`, `create_date`, `update_date`) VALUES
(10001, 'FINO_OR_001', 'PVC Pipe 4 inch - Batch A', 'FINO001', 'FINO_PR_001', 'FINO_BY_001', 'IN_PROGRESS', '2025-02-01 00:00:00', '2025-02-15 00:00:00', 1000, 25.00, 2.00, 23000.00, NOW(), NOW()),
(10002, 'FINO_OR_002', 'PVC Fitting Elbow - High Volume', 'FINO001', 'FINO_PR_002', 'FINO_BY_002', 'SCHEDULED', '2025-02-05 00:00:00', '2025-02-20 00:00:00', 2000, 8.50, 1.00, 15000.00, NOW(), NOW()),
(10003, 'PRES_OR_001', 'Pressure Cooker Base - Premium', 'PRES001', 'PRES_PR_001', 'PRES_BY_001', 'IN_PROGRESS', '2025-02-03 00:00:00', '2025-02-18 00:00:00', 200, 120.00, 8.00, 22400.00, NOW(), NOW()),
(10004, 'PRES_OR_002', 'Cooker Handle - Standard', 'PRES001', 'PRES_PR_002', 'PRES_BY_002', 'COMPLETED', '2025-01-28 00:00:00', '2025-02-10 00:00:00', 800, 35.00, 3.00, 25600.00, NOW(), NOW());

-- --------------------------------------------------------

--
-- Table structure for table `order_quantity`
--

CREATE TABLE `order_quantity` (
  `order_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_quantity` int DEFAULT NULL,
  `product_quantity` int DEFAULT NULL,
  `fettl_ip_quantity` int DEFAULT NULL,
  `fettl_ac_quantity` int DEFAULT NULL,
  `fettl_rj_quantity` int DEFAULT NULL,
  `drill_ip_quantity` int DEFAULT NULL,
  `drill_ac_quantity` int DEFAULT NULL,
  `drill_rj_quantity` int DEFAULT NULL,
  `tapp_ip_quantity` int DEFAULT NULL,
  `tapp_ac_quantity` int DEFAULT NULL,
  `tapp_rj_quantity` int DEFAULT NULL,
  `mach_ip_quantity` int DEFAULT NULL,
  `mach_ac_quantity` int DEFAULT NULL,
  `mach_rj_quantity` int DEFAULT NULL,
  `trim_ip_quantity` int DEFAULT NULL,
  `trim_ac_quantity` int DEFAULT NULL,
  `trim_rj_quantity` int DEFAULT NULL,
  `shotb_ip_quantity` int DEFAULT NULL,
  `shotb_ac_quantity` int DEFAULT NULL,
  `shotb_rj_quantity` int DEFAULT NULL,
  `pwdr_ip_quantity` int DEFAULT NULL,
  `pwdr_ac_quantity` int DEFAULT NULL,
  `pwdr_rj_quantity` int DEFAULT NULL,
  `assmbl_ip_quantity` int DEFAULT NULL,
  `assmbl_ac_quantity` int DEFAULT NULL,
  `assmbl_rj_quantity` int DEFAULT NULL,
  `qlins_ip_quantity` int DEFAULT NULL,
  `qlins_ac_quantity` int DEFAULT NULL,
  `qlins_rj_quantity` int DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_quantity`
--

INSERT INTO `order_quantity` (`order_id`, `company_id`, `order_quantity`, `product_quantity`, `fettl_ip_quantity`, `fettl_ac_quantity`, `fettl_rj_quantity`, `drill_ip_quantity`, `drill_ac_quantity`, `drill_rj_quantity`, `tapp_ip_quantity`, `tapp_ac_quantity`, `tapp_rj_quantity`, `mach_ip_quantity`, `mach_ac_quantity`, `mach_rj_quantity`, `trim_ip_quantity`, `trim_ac_quantity`, `trim_rj_quantity`, `shotb_ip_quantity`, `shotb_ac_quantity`, `shotb_rj_quantity`, `pwdr_ip_quantity`, `pwdr_ac_quantity`, `pwdr_rj_quantity`, `assmbl_ip_quantity`, `assmbl_ac_quantity`, `assmbl_rj_quantity`, `qlins_ip_quantity`, `qlins_ac_quantity`, `qlins_rj_quantity`, `create_date`, `update_date`) VALUES
('FINO_OR_001', 'FINO001', 1000, 950, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NOW(), NOW()),
('FINO_OR_002', 'FINO001', 2000, 1900, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NOW(), NOW()),
('PRES_OR_001', 'PRES001', 200, 180, 200, 190, 10, 190, 180, 10, 180, 170, 10, 170, 160, 10, 160, 150, 10, 150, 140, 10, 140, 130, 10, 130, 120, 10, 120, 110, 10, NOW(), NOW()),
('PRES_OR_002', 'PRES001', 800, 750, 800, 780, 20, 780, 760, 20, 760, 740, 20, 740, 720, 20, 720, 700, 20, 700, 680, 20, 680, 660, 20, 660, 640, 20, 640, 620, 20, NOW(), NOW());

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `prod_id_seq` int NOT NULL,
  `prod_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `prod_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `raw_material` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `weight` decimal(10,4) DEFAULT NULL,
  `wastage` int DEFAULT NULL,
  `norms` decimal(10,4) DEFAULT NULL,
  `total_weight` decimal(10,4) DEFAULT NULL,
  `cavity` int DEFAULT NULL,
  `shot_rate` decimal(10,2) DEFAULT NULL,
  `per_item_rate` decimal(10,2) DEFAULT NULL,
  `incentive_limit` int DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`prod_id_seq`, `prod_id`, `company_id`, `prod_name`, `raw_material`, `weight`, `wastage`, `norms`, `total_weight`, `cavity`, `shot_rate`, `per_item_rate`, `incentive_limit`, `create_date`, `update_date`) VALUES
(1000001, 'FINO_PR_001', 'FINO001', 'PVC Pipe 4 inch', 'PVC-Resin', 2.5000, 5, 0.125, 2.625, 8, 1.20, 0.12, 200, NOW(), NOW()),
(1000002, 'FINO_PR_002', 'FINO001', 'PVC Fitting Elbow', 'PVC-Compound', 0.8000, 8, 0.064, 0.864, 12, 0.80, 0.08, 300, NOW(), NOW()),
(1000003, 'PRES_PR_001', 'PRES001', 'Pressure Cooker Base', 'ADC-12', 35.0000, 12, 4.2000, 39.2000, 1, 8.00, 0.80, 60, NOW(), NOW()),
(1000004, 'PRES_PR_002', 'PRES001', 'Cooker Handle', 'A380', 12.0000, 15, 1.8000, 13.8000, 6, 2.50, 0.25, 120, NOW(), NOW()),
(1000005, 'FINO_PR_003', 'FINO001', 'PVC Pipe 6 inch', 'PVC-Resin', 3.8000, 5, 0.190, 3.990, 6, 1.50, 0.15, 180, NOW(), NOW()),
(1000006, 'FINO_PR_004', 'FINO001', 'PVC T-Joint', 'PVC-Compound', 1.2000, 7, 0.084, 1.284, 10, 0.90, 0.09, 250, NOW(), NOW()),
(1000007, 'FINO_PR_005', 'FINO001', 'PVC Reducer', 'PVC-Resin', 1.5000, 6, 0.090, 1.590, 8, 1.00, 0.10, 220, NOW(), NOW()),
(1000008, 'FINO_PR_006', 'FINO001', 'PVC End Cap', 'PVC-Compound', 0.6000, 8, 0.048, 0.648, 15, 0.70, 0.07, 320, NOW(), NOW()),
(1000009, 'FINO_PR_007', 'FINO001', 'PVC Coupling', 'PVC-Resin', 0.9000, 7, 0.063, 0.963, 12, 0.85, 0.085, 280, NOW(), NOW()),
(1000010, 'FINO_PR_008', 'FINO001', 'PVC Valve', 'PVC-Compound', 2.2000, 9, 0.198, 2.398, 5, 1.30, 0.13, 160, NOW(), NOW()),
(1000011, 'PRES_PR_003', 'PRES001', 'Pressure Cooker Lid', 'ADC-12', 28.0000, 10, 2.800, 30.800, 1, 7.50, 0.75, 70, NOW(), NOW()),
(1000012, 'PRES_PR_004', 'PRES001', 'Safety Valve', 'A380', 8.5000, 12, 1.020, 9.520, 8, 2.20, 0.22, 140, NOW(), NOW()),
(1000013, 'PRES_PR_005', 'PRES001', 'Gasket Ring', 'Silicone', 0.3000, 15, 0.045, 0.345, 20, 0.50, 0.05, 400, NOW(), NOW()),
(1000014, 'PRES_PR_006', 'PRES001', 'Pressure Indicator', 'Brass', 5.2000, 8, 0.416, 5.616, 6, 1.80, 0.18, 150, NOW(), NOW()),
(1000015, 'PRES_PR_007', 'PRES001', 'Handle Grip', 'Bakelite', 3.8000, 10, 0.380, 4.180, 10, 1.60, 0.16, 180, NOW(), NOW()),
(1000016, 'FINO_PR_009', 'FINO001', 'PVC Pipe 2 inch', 'PVC-Resin', 1.8000, 5, 0.090, 1.890, 10, 1.10, 0.11, 240, NOW(), NOW()),
(1000017, 'FINO_PR_010', 'FINO001', 'PVC Cross Joint', 'PVC-Compound', 1.6000, 7, 0.112, 1.712, 8, 1.05, 0.105, 200, NOW(), NOW()),
(1000018, 'FINO_PR_011', 'FINO001', 'PVC Ball Valve', 'PVC-Resin', 3.2000, 8, 0.256, 3.456, 4, 1.70, 0.17, 140, NOW(), NOW()),
(1000019, 'FINO_PR_012', 'FINO001', 'PVC Union', 'PVC-Compound', 1.4000, 6, 0.084, 1.484, 9, 0.95, 0.095, 260, NOW(), NOW()),
(1000020, 'FINO_PR_013', 'FINO001', 'PVC Flange', 'PVC-Resin', 2.8000, 7, 0.196, 2.996, 6, 1.40, 0.14, 170, NOW(), NOW()),
(1000021, 'PRES_PR_008', 'PRES001', 'Cooker Base Plate', 'Aluminum', 15.5000, 11, 1.705, 17.205, 2, 4.50, 0.45, 90, NOW(), NOW()),
(1000022, 'PRES_PR_009', 'PRES001', 'Steam Vent', 'Stainless Steel', 2.8000, 9, 0.252, 3.052, 12, 1.45, 0.145, 200, NOW(), NOW()),
(1000023, 'PRES_PR_010', 'PRES001', 'Locking Mechanism', 'Steel', 6.8000, 13, 0.884, 7.684, 4, 2.80, 0.28, 110, NOW(), NOW()),
(1000024, 'PRES_PR_011', 'PRES001', 'Heat Distributor', 'Copper', 4.2000, 8, 0.336, 4.536, 8, 1.90, 0.19, 160, NOW(), NOW()),
(1000025, 'PRES_PR_012', 'PRES001', 'Whistle Assembly', 'Brass', 1.8000, 12, 0.216, 2.016, 15, 1.20, 0.12, 250, NOW(), NOW()),
(1000026, 'FINO_PR_014', 'FINO001', 'PVC Pipe 8 inch', 'PVC-Resin', 5.2000, 6, 0.312, 5.512, 4, 2.10, 0.21, 120, NOW(), NOW()),
(1000027, 'FINO_PR_015', 'FINO001', 'PVC Bend 45°', 'PVC-Compound', 1.8000, 8, 0.144, 1.944, 8, 1.15, 0.115, 210, NOW(), NOW()),
(1000028, 'FINO_PR_016', 'FINO001', 'PVC Bend 90°', 'PVC-Compound', 2.1000, 8, 0.168, 2.268, 7, 1.25, 0.125, 190, NOW(), NOW()),
(1000029, 'FINO_PR_017', 'FINO001', 'PVC Adapter', 'PVC-Resin', 1.1000, 7, 0.077, 1.177, 11, 0.88, 0.088, 270, NOW(), NOW()),
(1000030, 'FINO_PR_018', 'FINO001', 'PVC Plug', 'PVC-Compound', 0.4000, 9, 0.036, 0.436, 18, 0.60, 0.06, 350, NOW(), NOW()),
(1000031, 'PRES_PR_013', 'PRES001', 'Cooker Inner Pot', 'Stainless Steel', 22.0000, 9, 1.980, 23.980, 1, 6.20, 0.62, 80, NOW(), NOW()),
(1000032, 'PRES_PR_014', 'PRES001', 'Rubber Seal', 'Rubber', 0.8000, 15, 0.120, 0.920, 25, 0.75, 0.075, 300, NOW(), NOW()),
(1000033, 'PRES_PR_015', 'PRES001', 'Pressure Release Valve', 'Brass', 3.5000, 10, 0.350, 3.850, 10, 1.75, 0.175, 170, NOW(), NOW()),
(1000034, 'PRES_PR_016', 'PRES001', 'Handle Screw', 'Steel', 0.2000, 8, 0.016, 0.216, 50, 0.40, 0.04, 500, NOW(), NOW()),
(1000035, 'PRES_PR_017', 'PRES001', 'Base Ring', 'Aluminum', 8.8000, 11, 0.968, 9.768, 3, 3.20, 0.32, 100, NOW(), NOW()),
(1000036, 'FINO_PR_019', 'FINO001', 'PVC Pipe 10 inch', 'PVC-Resin', 6.8000, 6, 0.408, 7.208, 3, 2.50, 0.25, 100, NOW(), NOW()),
(1000037, 'FINO_PR_020', 'FINO001', 'PVC Tee Reducer', 'PVC-Compound', 2.4000, 7, 0.168, 2.568, 6, 1.35, 0.135, 180, NOW(), NOW()),
(1000038, 'FINO_PR_021', 'FINO001', 'PVC Check Valve', 'PVC-Resin', 4.2000, 9, 0.378, 4.578, 3, 1.95, 0.195, 130, NOW(), NOW()),
(1000039, 'FINO_PR_022', 'FINO001', 'PVC Bushing', 'PVC-Compound', 0.7000, 8, 0.056, 0.756, 14, 0.78, 0.078, 290, NOW(), NOW()),
(1000040, 'FINO_PR_023', 'FINO001', 'PVC Nipple', 'PVC-Resin', 0.5000, 7, 0.035, 0.535, 16, 0.65, 0.065, 330, NOW(), NOW()),
(1000041, 'PRES_PR_018', 'PRES001', 'Cooker Trivet', 'Steel', 4.5000, 10, 0.450, 4.950, 8, 2.00, 0.20, 150, NOW(), NOW()),
(1000042, 'PRES_PR_019', 'PRES001', 'Lid Handle', 'Bakelite', 2.2000, 12, 0.264, 2.464, 12, 1.30, 0.13, 220, NOW(), NOW()),
(1000043, 'PRES_PR_020', 'PRES001', 'Safety Lock', 'Steel', 5.8000, 11, 0.638, 6.438, 5, 2.40, 0.24, 120, NOW(), NOW()),
(1000044, 'PRES_PR_021', 'PRES001', 'Vent Tube', 'Aluminum', 1.5000, 9, 0.135, 1.635, 18, 1.05, 0.105, 280, NOW(), NOW()),
(1000045, 'PRES_PR_022', 'PRES001', 'Bottom Plate', 'Stainless Steel', 18.2000, 8, 1.456, 19.656, 2, 5.50, 0.55, 85, NOW(), NOW()),
(1000046, 'FINO_PR_024', 'FINO001', 'PVC Pipe 12 inch', 'PVC-Resin', 8.5000, 6, 0.510, 9.010, 2, 3.00, 0.30, 80, NOW(), NOW()),
(1000047, 'FINO_PR_025', 'FINO001', 'PVC Wye Joint', 'PVC-Compound', 2.8000, 8, 0.224, 3.024, 5, 1.50, 0.15, 160, NOW(), NOW()),
(1000048, 'FINO_PR_026', 'FINO001', 'PVC Gate Valve', 'PVC-Resin', 5.5000, 9, 0.495, 5.995, 2, 2.30, 0.23, 110, NOW(), NOW()),
(1000049, 'FINO_PR_027', 'FINO001', 'PVC Elbow 45°', 'PVC-Compound', 1.3000, 7, 0.091, 1.391, 9, 0.92, 0.092, 250, NOW(), NOW()),
(1000050, 'FINO_PR_028', 'FINO001', 'PVC Socket', 'PVC-Resin', 0.8000, 8, 0.064, 0.864, 13, 0.80, 0.08, 300, NOW(), NOW()),
(1000051, 'PRES_PR_023', 'PRES001', 'Pressure Gauge', 'Brass', 6.2000, 10, 0.620, 6.820, 4, 2.60, 0.26, 115, NOW(), NOW()),
(1000052, 'PRES_PR_024', 'PRES001', 'Steam Pipe', 'Steel', 3.8000, 9, 0.342, 4.142, 9, 1.80, 0.18, 190, NOW(), NOW()),
(1000053, 'PRES_PR_025', 'PRES001', 'Lid Gasket', 'Silicone', 0.6000, 15, 0.090, 0.690, 22, 0.68, 0.068, 320, NOW(), NOW()),
(1000054, 'PRES_PR_026', 'PRES001', 'Handle Base', 'Aluminum', 4.8000, 11, 0.528, 5.328, 7, 2.10, 0.21, 140, NOW(), NOW()),
(1000055, 'PRES_PR_027', 'PRES001', 'Cooker Feet', 'Rubber', 1.2000, 12, 0.144, 1.344, 16, 0.95, 0.095, 260, NOW(), NOW()),
(1000056, 'FINO_PR_029', 'FINO001', 'PVC Pipe 1 inch', 'PVC-Resin', 1.2000, 5, 0.060, 1.260, 12, 0.85, 0.085, 280, NOW(), NOW()),
(1000057, 'FINO_PR_030', 'FINO001', 'PVC Street Elbow', 'PVC-Compound', 1.0000, 8, 0.080, 1.080, 11, 0.82, 0.082, 290, NOW(), NOW()),
(1000058, 'FINO_PR_031', 'FINO001', 'PVC Threaded Cap', 'PVC-Resin', 0.3000, 9, 0.027, 0.327, 20, 0.55, 0.055, 360, NOW(), NOW()),
(1000059, 'FINO_PR_032', 'FINO001', 'PVC Compression Fitting', 'PVC-Compound', 1.8000, 7, 0.126, 1.926, 8, 1.12, 0.112, 220, NOW(), NOW()),
(1000060, 'FINO_PR_033', 'FINO001', 'PVC Expansion Joint', 'PVC-Resin', 3.5000, 8, 0.280, 3.780, 4, 1.80, 0.18, 140, NOW(), NOW()),
(1000061, 'PRES_PR_028', 'PRES001', 'Cooker Rim', 'Stainless Steel', 12.5000, 9, 1.125, 13.625, 3, 4.20, 0.42, 95, NOW(), NOW()),
(1000062, 'PRES_PR_029', 'PRES001', 'Weight Valve', 'Brass', 2.8000, 11, 0.308, 3.108, 11, 1.45, 0.145, 210, NOW(), NOW()),
(1000063, 'PRES_PR_030', 'PRES001', 'Cooker Stand', 'Steel', 8.2000, 10, 0.820, 9.020, 4, 3.10, 0.31, 105, NOW(), NOW()),
(1000064, 'PRES_PR_031', 'PRES001', 'Heat Shield', 'Aluminum', 3.2000, 8, 0.256, 3.456, 10, 1.70, 0.17, 180, NOW(), NOW()),
(1000065, 'PRES_PR_032', 'PRES001', 'Vent Cap', 'Plastic', 0.4000, 12, 0.048, 0.448, 30, 0.58, 0.058, 380, NOW(), NOW()),
(1000066, 'FINO_PR_034', 'FINO001', 'PVC Pipe 3 inch', 'PVC-Resin', 2.2000, 5, 0.110, 2.310, 9, 1.25, 0.125, 200, NOW(), NOW()),
(1000067, 'FINO_PR_035', 'FINO001', 'PVC Saddle Tee', 'PVC-Compound', 2.0000, 7, 0.140, 2.140, 7, 1.20, 0.12, 210, NOW(), NOW()),
(1000068, 'FINO_PR_036', 'FINO001', 'PVC Butterfly Valve', 'PVC-Resin', 6.8000, 9, 0.612, 7.412, 2, 2.80, 0.28, 90, NOW(), NOW()),
(1000069, 'FINO_PR_037', 'FINO001', 'PVC Pipe Clamp', 'PVC-Compound', 0.9000, 8, 0.072, 0.972, 12, 0.85, 0.085, 280, NOW(), NOW()),
(1000070, 'FINO_PR_038', 'FINO001', 'PVC Drain Fitting', 'PVC-Resin', 1.6000, 7, 0.112, 1.712, 8, 1.05, 0.105, 240, NOW(), NOW()),
(1000071, 'PRES_PR_033', 'PRES001', 'Cooker Divider', 'Steel', 5.5000, 10, 0.550, 6.050, 6, 2.30, 0.23, 130, NOW(), NOW()),
(1000072, 'PRES_PR_034', 'PRES001', 'Steam Regulator', 'Brass', 4.2000, 11, 0.462, 4.662, 8, 2.00, 0.20, 160, NOW(), NOW()),
(1000073, 'PRES_PR_035', 'PRES001', 'Cooker Basket', 'Stainless Steel', 7.8000, 9, 0.702, 8.502, 5, 2.90, 0.29, 110, NOW(), NOW()),
(1000074, 'PRES_PR_036', 'PRES001', 'Safety Pin', 'Steel', 0.8000, 8, 0.064, 0.864, 25, 0.75, 0.075, 320, NOW(), NOW()),
(1000075, 'PRES_PR_037', 'PRES001', 'Lid Lock', 'Aluminum', 2.5000, 10, 0.250, 2.750, 12, 1.40, 0.14, 200, NOW(), NOW()),
(1000076, 'FINO_PR_039', 'FINO001', 'PVC Pipe 5 inch', 'PVC-Resin', 4.2000, 6, 0.252, 4.452, 5, 1.90, 0.19, 150, NOW(), NOW()),
(1000077, 'FINO_PR_040', 'FINO001', 'PVC Concentric Reducer', 'PVC-Compound', 1.7000, 7, 0.119, 1.819, 8, 1.08, 0.108, 230, NOW(), NOW()),
(1000078, 'FINO_PR_041', 'FINO001', 'PVC Eccentric Reducer', 'PVC-Compound', 1.9000, 7, 0.133, 2.033, 7, 1.15, 0.115, 220, NOW(), NOW()),
(1000079, 'FINO_PR_042', 'FINO001', 'PVC Pipe Support', 'PVC-Resin', 1.1000, 8, 0.088, 1.188, 10, 0.90, 0.09, 270, NOW(), NOW()),
(1000080, 'FINO_PR_043', 'FINO001', 'PVC Vent Fitting', 'PVC-Compound', 0.6000, 9, 0.054, 0.654, 15, 0.70, 0.07, 340, NOW(), NOW()),
(1000081, 'PRES_PR_038', 'PRES001', 'Cooker Liner', 'Aluminum', 9.5000, 9, 0.855, 10.355, 4, 3.50, 0.35, 100, NOW(), NOW()),
(1000082, 'PRES_PR_039', 'PRES001', 'Pressure Switch', 'Plastic', 1.8000, 12, 0.216, 2.016, 15, 1.20, 0.12, 250, NOW(), NOW()),
(1000083, 'PRES_PR_040', 'PRES001', 'Cooker Tray', 'Steel', 6.2000, 10, 0.620, 6.820, 5, 2.60, 0.26, 120, NOW(), NOW()),
(1000084, 'PRES_PR_041', 'PRES001', 'Handle Spring', 'Steel', 0.3000, 8, 0.024, 0.324, 40, 0.52, 0.052, 450, NOW(), NOW()),
(1000085, 'PRES_PR_042', 'PRES001', 'Cooker Valve Seat', 'Brass', 1.5000, 11, 0.165, 1.665, 18, 1.05, 0.105, 280, NOW(), NOW()),
(1000086, 'FINO_PR_044', 'FINO001', 'PVC Pipe 7 inch', 'PVC-Resin', 5.8000, 6, 0.348, 6.148, 4, 2.40, 0.24, 125, NOW(), NOW()),
(1000087, 'FINO_PR_045', 'FINO001', 'PVC Flexible Coupling', 'PVC-Compound', 2.5000, 8, 0.200, 2.700, 6, 1.40, 0.14, 170, NOW(), NOW()),
(1000088, 'FINO_PR_046', 'FINO001', 'PVC Strainer', 'PVC-Resin', 3.8000, 9, 0.342, 4.142, 3, 1.85, 0.185, 135, NOW(), NOW()),
(1000089, 'FINO_PR_047', 'FINO001', 'PVC Pipe Hanger', 'PVC-Compound', 0.8000, 7, 0.056, 0.856, 13, 0.78, 0.078, 310, NOW(), NOW()),
(1000090, 'FINO_PR_048', 'FINO001', 'PVC Test Cap', 'PVC-Resin', 0.4000, 8, 0.032, 0.432, 18, 0.60, 0.06, 350, NOW(), NOW()),
(1000091, 'PRES_PR_043', 'PRES001', 'Cooker Insulation', 'Fiberglass', 2.2000, 15, 0.330, 2.530, 14, 1.30, 0.13, 230, NOW(), NOW()),
(1000092, 'PRES_PR_044', 'PRES001', 'Steam Collector', 'Steel', 4.8000, 9, 0.432, 5.232, 7, 2.10, 0.21, 145, NOW(), NOW()),
(1000093, 'PRES_PR_045', 'PRES001', 'Cooker Thermometer', 'Glass', 1.2000, 20, 0.240, 1.440, 20, 0.95, 0.095, 300, NOW(), NOW()),
(1000094, 'PRES_PR_046', 'PRES001', 'Handle Washer', 'Rubber', 0.1000, 10, 0.010, 0.110, 60, 0.35, 0.035, 600, NOW(), NOW()),
(1000095, 'PRES_PR_047', 'PRES001', 'Cooker Timer', 'Plastic', 3.5000, 12, 0.420, 3.920, 9, 1.75, 0.175, 180, NOW(), NOW());

-- --------------------------------------------------------

--
-- Table structure for table `prod_hourly`
--

CREATE TABLE `prod_hourly` (
  `order_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shift_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shift_start_time` datetime DEFAULT NULL,
  `shift_end_time` datetime DEFAULT NULL,
  `opening_count` int DEFAULT NULL,
  `closing_count` int DEFAULT NULL,
  `production` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prod_shift`
--

CREATE TABLE `prod_shift` (
  `shift_id_seq` int NOT NULL,
  `order_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shift_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `prod_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `machine_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shift_start_date` datetime DEFAULT NULL,
  `shift_end_date` datetime DEFAULT NULL,
  `entry_type` varchar(6) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shift_type` char(1) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `operator1` int DEFAULT NULL,
  `operator2` int DEFAULT NULL,
  `operator3` int DEFAULT NULL,
  `supervisor` int DEFAULT NULL,
  `opening_count` int DEFAULT NULL,
  `closing_count` int DEFAULT NULL,
  `production` int DEFAULT NULL,
  `rejection` int DEFAULT NULL,
  `net_production` int DEFAULT NULL,
  `incentive` char(1) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `less_80_reason` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prod_shift`
--

INSERT INTO `prod_shift` (`shift_id_seq`, `order_id`, `company_id`, `shift_id`, `prod_name`, `machine_id`, `shift_start_date`, `shift_end_date`, `entry_type`, `shift_type`, `operator1`, `operator2`, `operator3`, `supervisor`, `opening_count`, `closing_count`, `production`, `rejection`, `net_production`, `incentive`, `less_80_reason`, `create_date`, `update_date`) VALUES
(10000001, 'FINO_OR_001', 'FINO001', 'FINO_SH_001', 'PVC Pipe 4 inch', 'FINO_DC_001', '2025-02-01 06:00:00', '2025-02-01 14:00:00', 'shift', '1', '1000005', '1000006', NULL, '1000002', 0, 400, 400, 20, 380, 'Y', '', NOW(), NOW()),
(10000002, 'FINO_OR_001', 'FINO001', 'FINO_SH_002', 'PVC Pipe 4 inch', 'FINO_DC_001', '2025-02-01 14:00:00', '2025-02-01 22:00:00', 'shift', '2', '1000007', '1000008', NULL, '1000003', 400, 750, 350, 15, 335, 'Y', '', NOW(), NOW()),
(10000003, 'PRES_OR_001', 'PRES001', 'PRES_SH_0NULL', 'Pressure Cooker Base', 'PRES_DC_001', '2025-02-03 06:00:00', '2025-02-03 14:00:00', 'shift', '1', '1000014', '1000015', NULL, '1000013', 0, 80, 80, 5, 75, 'Y', '', NOW(), NOW()),
(10000004, 'PRES_OR_002', 'PRES001', 'PRES_SH_0NULL', 'Cooker Handle', 'PRES_DC_001', '2025-01-28 06:00:00', '2025-01-28 14:00:00', 'shift', '1', '1000014', '1000016', NULL, '1000013', 0, 400, 400, 25, 375, 'Y', '', NOW(), NOW());

-- --------------------------------------------------------

--
-- Table structure for table `prod_hourly`
--

-- Production Hourly seeders
INSERT INTO `prod_hourly` (`order_id`, `company_id`, `shift_id`, `shift_start_time`, `shift_end_time`, `opening_count`, `closing_count`, `production`) VALUES
('FINO_OR_001', 'FINO001', 'FINO_SH_001', '2025-02-01 06:00:00', '2025-02-01 07:00:00', 0, 50, 50),
('FINO_OR_001', 'FINO001', 'FINO_SH_001', '2025-02-01 07:00:00', '2025-02-01 08:00:00', 50, 100, 50),
('FINO_OR_001', 'FINO001', 'FINO_SH_001', '2025-02-01 08:00:00', '2025-02-01 09:00:00', 100, 150, 50),
('PRES_OR_001', 'PRES001', 'PRES_SH_001', '2025-02-03 06:00:00', '2025-02-03 07:00:00', 0, 10, 10),
('PRES_OR_001', 'PRES001', 'PRES_SH_001', '2025-02-03 07:00:00', '2025-02-03 08:00:00', 10, 20, 10),
('PRES_OR_001', 'PRES001', 'PRES_SH_001', '2025-02-03 08:00:00', '2025-02-03 09:00:00', 20, 30, 10);

-- --------------------------------------------------------

--
-- Table structure for table `seller`
--

CREATE TABLE `seller` (
  `seller_id_seq` int NOT NULL,
  `seller_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seller_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seller_address` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seller_phone` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seller_email` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `seller`
--

INSERT INTO `seller` (`seller_id_seq`, `seller_id`, `company_id`, `seller_name`, `seller_address`, `seller_phone`, `seller_email`, `create_date`, `update_date`) VALUES
(10001, 'FINO_SL_001', 'FINO001', 'PVC Resin Suppliers Pvt Ltd', 'Coimbatore, Tamil Nadu', '9876543220', 'sales@pvcresin.com', NOW(), NOW()),
(10002, 'FINO_SL_002', 'FINO001', 'Polymer Trading Corporation', 'Hyderabad, Telangana', '9876543221', 'info@polytrading.com', NOW(), NOW()),
(10003, 'PRES_SL_001', 'PRES001', 'Aluminum Alloy Hub', 'Pune, Maharashtra', '9876543222', 'sales@aluhub.com', NOW(), NOW()),
(10004, 'PRES_SL_002', 'PRES001', 'Die Cast Metals Supplier', 'Ahmedabad, Gujarat', '9876543223', 'orders@diecastmetals.com', NOW(), NOW());

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `stock_id_seq` int NOT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seller_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `stock_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `stock_date` datetime DEFAULT NULL,
  `raw_material` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `no_of_bars` int DEFAULT NULL,
  `weight` decimal(10,4) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`stock_id_seq`, `company_id`, `seller_id`, `stock_id`, `stock_date`, `raw_material`, `no_of_bars`, `weight`, `create_date`, `update_date`) VALUES
(1000001, 'FINO001', 'FINO_SL_001', 'FINO_ST_001', '2025-01-15 00:00:00', 'PVC Resin Grade S-65', 100, 5000.0000, NOW(), NOW()),
(1000002, 'FINO001', 'FINO_SL_002', 'FINO_ST_002', '2025-01-20 00:00:00', 'PVC Compound K-67', 80, 4000.0000, NOW(), NOW()),
(1000003, 'PRES001', 'PRES_SL_001', 'PRES_ST_001', '2025-01-18 00:00:00', 'Aluminum Alloy ADC-12', 40, 2000.0000, NOW(), NOW()),
(1000004, 'PRES001', 'PRES_SL_002', 'PRES_ST_002', '2025-01-25 00:00:00', 'Aluminum Alloy A380', 35, 2100.0000, NOW(), NOW());

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buyer`
--
ALTER TABLE `buyer`
  ADD PRIMARY KEY (`buyer_id_seq`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`company_id_seq`);

--
-- Indexes for table `dispatch`
--
ALTER TABLE `dispatch`
  ADD PRIMARY KEY (`dispatch_id_seq`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000017;

--
-- Indexes for table `machine`
--
ALTER TABLE `machine`
  ADD PRIMARY KEY (`machine_id_seq`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`order_id_seq`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`prod_id_seq`);

--
-- Indexes for table `prod_shift`
--
ALTER TABLE `prod_shift`
  ADD PRIMARY KEY (`shift_id_seq`);

--
-- Indexes for table `seller`
--
ALTER TABLE `seller`
  ADD PRIMARY KEY (`seller_id_seq`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`stock_id_seq`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  -- ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buyer`
--
ALTER TABLE `buyer`
  MODIFY `buyer_id_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `company_id_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100001;

--
-- AUTO_INCREMENT for table `dispatch`
--
ALTER TABLE `dispatch`
  MODIFY `dispatch_id_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000010;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000002;

--
-- AUTO_INCREMENT for table `machine`
--
ALTER TABLE `machine`
  MODIFY `machine_id_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `order_id_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `prod_id_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000001;

--
-- AUTO_INCREMENT for table `prod_shift`
--
ALTER TABLE `prod_shift`
  MODIFY `shift_id_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10000001;

--
-- AUTO_INCREMENT for table `seller`
--
ALTER TABLE `seller`
  MODIFY `seller_id_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `stock_id_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000001;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
