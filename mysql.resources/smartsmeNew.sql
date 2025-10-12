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
(10000, 'by10000', 'ab1000000825', 'scanner', 'abc', '546848848', 'ghsg23rrr@gmail.com', '7euuwrrr@gmail.com', '2025-09-16 07:18:14', '2025-09-16 07:18:14');

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
(1000009, 'pr1000000', 'ab1000000825', 'or10000', 'dl1000009', '2025-09-16 00:00:00', 100, 10, 1000.0000, 10.0000, 2250.0000, '2025-09-16 07:20:02', '2025-09-16 07:20:02');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id_seq` int NOT NULL,
  `employee_name` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mobile_no` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `hash` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `salary` int DEFAULT NULL,
  `active_flag` char(1) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_date` datetime NOT NULL,
  `update_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id_seq`, `employee_name`, `mobile_no`, `username`, `hash`, `company_id`, `role_id`, `salary`, `active_flag`, `create_date`, `update_date`) VALUES
(1000000, 'sakunthala', '8939642996', 'sa2996', '$2y$10$SUZF1NrulwM07qFMcZzrhu6YCGJH.JThjxIzDkbFyMXqnYwtr3mvu', 'ab1000000825', 1, 0, 'Y', '2025-08-17 16:13:27', '2025-08-17 16:41:22'),
(1000001, 'test', '8870735098', 'te5098', '$2y$10$pjQ//CCX9SdS7ecL2XZNsOpFKFjLr1jvp8tIJaZ2ozc7yeeszC/DG', 'ab1000000825', 1, 5000, 'Y', '2025-08-17 16:43:30', '2025-08-17 16:49:40');

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
(10000, 'ma10000', 'ab1000000825', 'castmoulder_1', 'aluminum pressure', '120', 'tx', 'Y', '2025-09-16 07:16:27', '2025-09-16 07:16:27');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `order_id_seq` int NOT NULL,
  `order_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
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

INSERT INTO `order` (`order_id_seq`, `order_id`, `company_id`, `prod_id`, `buyer_id`, `order_status`, `order_date`, `target_date`, `order_quantity`, `price`, `discount`, `total_price`, `create_date`, `update_date`) VALUES
(10000, 'or10000', 'ab1000000825', 'pr1000000', 'by10000', 'in progress', '2025-09-16 00:00:00', '2025-09-16 00:00:00', 20, 125.00, 1.00, 2475.00, '2025-09-16 07:18:30', '2025-09-16 07:18:30');

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
('or10000', 'ab1000000825', 20, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2025-09-16 07:18:30', '2025-09-16 07:18:30');

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
(1000000, 'pr1000000', 'ab1000000825', 'ygf', 'adc-12', 10.0000, 125, 12.5000, 22.5000, 10, 2.00, 0.20, 1, '2025-09-16 07:17:33', '2025-09-16 07:17:33');

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
  `operator1` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `operator2` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `operator3` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `supervisor` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
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
(10000000, 'or10000', 'ab1000000825', 'sh10000000', 'ygf', 'ma10000', '2025-09-16 00:00:00', '2025-09-16 08:00:00', 'shift', '1', '1000004', '1000004', '', '1000003', 0, 20, 20, 2, 18, 'Y', '', '2025-09-16 07:29:45', '2025-09-16 07:29:45');

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
(10000, 'sl10000', 'ab1000000825', 'test1', 'abc', '5468484888', 'sell123rrr@gmail.com', '2025-09-16 07:15:44', '2025-09-16 07:15:44');

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
(1000000, 'ab1000000825', 'sl10000', 'st1000000', '2025-09-16 00:00:00', 'adc-12', 25, 1250.0000, '2025-09-16 07:15:59', '2025-09-16 07:15:59');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,  -- BIGINT (signed)
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
('kevinw', 'Kevin', 'Wu', 'Kevin Wu', 'kevin@example.com', '9912345680', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL);

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
  ADD PRIMARY KEY (`employee_id_seq`);

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
