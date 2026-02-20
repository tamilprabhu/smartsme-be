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
-- Table structure for table `mst_users`
--

--
-- Dumping data for table `mst_users`
--

INSERT INTO `mst_users` (`id`, `username`, `first_name`, `last_name`, `name`, `email`, `mobile`, `address`, `password`, `create_date`, `update_date`, `is_deleted`, `is_active`) VALUES
(1001, 'tamil', 'Tamilselvan', 'M', 'Tamilselvan M', 'tamil@test.com', '7889043243', 'Medavakkam, Chennai', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', '2025-09-23 23:29:52', '2025-09-23 23:29:52', 0, 1),
(1002, 'nandha', 'Nandhakumar', 'V', 'Nandhakumar V', 'nandha@test.com', '7798343227', 'Kovilambakkam, Chennai', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', '2025-09-23 23:32:02', '2025-09-23 23:32:02', 0, 1),
(1003, 'alicej', 'Alice', 'Johnson', 'Alice Johnson', 'alice@example.com', '9812345670', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL, 0, 1),
(1004, 'bobsmith', 'Bob', 'Smith', 'Bob Smith', 'bob@example.com', '9912345671', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL, 0, 1),
(1005, 'charlieb', 'Charlie', 'Brown', 'Charlie Brown', 'charlie@example.com', '9712345672', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL, 0, 1),
(1006, 'dianap', 'Diana', 'Prince', 'Diana Prince', 'diana@example.com', '9812345673', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL, 0, 1),
(1007, 'ethanh', 'Ethan', 'Hunt', 'Ethan Hunt', 'ethan@example.com', '9912345674', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL, 0, 1),
(1008, 'fionag', 'Fiona', 'Gallagher', 'Fiona Gallagher', 'fiona@example.com', '9712345675', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL, 0, 1),
(1009, 'georgem', 'George', 'Miller', 'George Miller', 'george@example.com', '9812345676', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL, 0, 1),
(1010, 'hannahl', 'Hannah', 'Lee', 'Hannah Lee', 'hannah@example.com', '9912345677', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL, 0, 1),
(1011, 'ianc', 'Ian', 'Curtis', 'Ian Curtis', 'ian@example.com', '9712345678', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL, 0, 1),
(1012, 'jasminep', 'Jasmine', 'Patel', 'Jasmine Patel', 'jasmine@example.com', '9812345679', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL, 0, 1),
(1013, 'kevinw', 'Kevin', 'Wu', 'Kevin Wu', 'kevin@example.com', '9912345680', NULL, '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL, 0, 1),
(1014, 'rajeshk', 'Rajesh', 'Kumar', 'Rajesh Kumar', 'rajesh@prestige.com', '9876543210', 'Bangalore, Karnataka', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL, 0, 1),
(1015, 'priyam', 'Priya', 'Menon', 'Priya Menon', 'priya@prestige.com', '9876543211', 'Bangalore, Karnataka', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL, 0, 1),
(1016, 'amits', 'Amit', 'Sharma', 'Amit Sharma', 'amit@prestige.com', '9876543212', 'Bangalore, Karnataka', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL, 0, 1),
(1017, 'sunitas', 'Sunita', 'Singh', 'Sunita Singh', 'sunita@prestige.com', '9876543213', 'Bangalore, Karnataka', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL, 0, 1),
(1018, 'vikramr', 'Vikram', 'Reddy', 'Vikram Reddy', 'vikram@prestige.com', '9876543214', 'Bangalore, Karnataka', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NULL, NULL, 0, 1),
(1019, 'user019', 'Sanjay', 'Dutt', 'Sanjay Dutt', 'user019@smartsme.co.in', '9876500019', 'Indore, Madhya Pradesh', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NOW(), NOW(), 0, 1),
(1020, 'user020', 'Tanvi', 'Mehta', 'Tanvi Mehta', 'user020@smartsme.co.in', '9876500020', 'Surat, Gujarat', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NOW(), NOW(), 0, 1),
(1021, 'user021', 'Uday', 'Kiran', 'Uday Kiran', 'user021@smartsme.co.in', '9876500021', 'Vijayawada, Andhra Pradesh', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NOW(), NOW(), 0, 1),
(1022, 'user022', 'Varun', 'Tej', 'Varun Tej', 'user022@smartsme.co.in', '9876500022', 'Warangal, Telangana', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NOW(), NOW(), 0, 1),
(1023, 'user023', 'Wajid', 'Khan', 'Wajid Khan', 'user023@smartsme.co.in', '9876500023', 'Mysore, Karnataka', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NOW(), NOW(), 0, 1),
(1024, 'user024', 'Xavi', 'Fernandez', 'Xavi Fernandez', 'user024@smartsme.co.in', '9876500024', 'Goa, Goa', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NOW(), NOW(), 0, 1),
(1025, 'user025', 'Yamini', 'Reddy', 'Yamini Reddy', 'user025@smartsme.co.in', '9876500025', 'Guntur, Andhra Pradesh', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NOW(), NOW(), 0, 1),
(1026, 'user026', 'Zara', 'Sheikh', 'Zara Sheikh', 'user026@smartsme.co.in', '9876500026', 'Aurangabad, Maharashtra', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NOW(), NOW(), 0, 1),
(1027, 'user027', 'Arjun', 'Das', 'Arjun Das', 'user027@smartsme.co.in', '9876500027', 'Guwahati, Assam', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NOW(), NOW(), 0, 1),
(1028, 'user028', 'Bhavana', 'Menon', 'Bhavana Menon', 'user028@smartsme.co.in', '9876500028', 'Kozhikode, Kerala', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NOW(), NOW(), 0, 1),
(1029, 'user029', 'Chetan', 'Bhagat', 'Chetan Bhagat', 'user029@smartsme.co.in', '9876500029', 'Shimla, Himachal Pradesh', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NOW(), NOW(), 0, 1),
(1030, 'user030', 'Divya', 'Bharti', 'Divya Bharti', 'user030@smartsme.co.in', '9876500030', 'Dehradun, Uttarakhand', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NOW(), NOW(), 0, 1),
(1031, 'user031', 'Eshwar', 'Prasad', 'Eshwar Prasad', 'user031@smartsme.co.in', '9876500031', 'Ranchi, Jharkhand', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NOW(), NOW(), 0, 1),
(1032, 'user032', 'Falguni', 'Pathak', 'Falguni Pathak', 'user032@smartsme.co.in', '9876500032', 'Vadodara, Gujarat', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NOW(), NOW(), 0, 1),
(1033, 'user033', 'Gautam', 'Adani', 'Gautam Adani', 'user033@smartsme.co.in', '9876500033', 'Rajkot, Gujarat', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NOW(), NOW(), 0, 1),
(1034, 'user034', 'Hema', 'Malini', 'Hema Malini', 'user034@smartsme.co.in', '9876500034', 'Mathura, Uttar Pradesh', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NOW(), NOW(), 0, 1),
(1035, 'user035', 'Ishaan', 'Khatter', 'Ishaan Khatter', 'user035@smartsme.co.in', '9876500035', 'Raipur, Chhattisgarh', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NOW(), NOW(), 0, 1),
(1036, 'user036', 'Janhvi', 'Kapoor', 'Janhvi Kapoor', 'user036@smartsme.co.in', '9876500036', 'Patna, Bihar', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NOW(), NOW(), 0, 1),
(1037, 'user037', 'Kartik', 'Aaryan', 'Kartik Aaryan', 'user037@smartsme.co.in', '9876500037', 'Gwalior, Madhya Pradesh', '$2b$10$QBPvhl1rr7Ipn6dWtZn9kOCRuhEptO4ZzdMiz6OoQyL1ph1o1Jw/.', NOW(), NOW(), 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `mst_buyer`
--

--
-- Dumping data for table `mst_buyer`
--

INSERT INTO `mst_buyer` (`buyer_seq`, `buyer_id`, `company_id`, `buyer_name`, `buyer_address`, `buyer_phone`, `buyer_email`, `buyer_gstin`, `create_date`, `update_date`, `is_deleted`, `is_active`) VALUES
(1001, 'FINO_BY_001', 'CMP7K9D2M4Q8X', 'Construction Materials Ltd', 'Chennai, Tamil Nadu', '9876543210', 'orders@constmat.com', '33AABCA1234A1Z5', NOW(), NOW(), 0, 1),
(1002, 'FINO_BY_002', 'CMP7K9D2M4Q8X', 'Plumbing Solutions Co', 'Bangalore, Karnataka', '9876543211', 'purchase@plumbsol.com', '29AABCA1234B1Z5', NOW(), NOW(), 0, 1),
(1003, 'PRES_BY_001', 'CMPN3R5T8W2ZA', 'Kitchen Appliance Distributors', 'Mumbai, Maharashtra', '9876543212', 'orders@kitchendist.com', '27AABCA1234C1Z5', NOW(), NOW(), 0, 1),
(1004, 'PRES_BY_002', 'CMPN3R5T8W2ZA', 'Home Products Retail', 'Delhi, NCR', '9876543213', 'purchase@homeretail.com', '07AABCA1234D1Z5', NOW(), NOW(), 0, 1);
INSERT INTO `mst_buyer` (`buyer_seq`, `buyer_id`, `company_id`, `buyer_name`, `buyer_address`, `buyer_phone`, `buyer_email`, `buyer_gstin`, `create_date`, `update_date`, `is_deleted`, `is_active`) VALUES
(1005, 'FINO_BY_003', 'CMP7K9D2M4Q8X', 'Industrial Pipes Ltd', 'Pune, Maharashtra', '9876543215', 'orders@indpipes.com', '27AABCA1234E1Z5', NOW(), NOW(), 0, 1),
(1006, 'FINO_BY_004', 'CMP7K9D2M4Q8X', 'Water Solutions Co', 'Hyderabad, Telangana', '9876543216', 'purchase@watersol.com', '36AABCA1234F1Z5', NOW(), NOW(), 0, 1),
(1007, 'FINO_BY_005', 'CMP7K9D2M4Q8X', 'Building Materials Hub', 'Coimbatore, Tamil Nadu', '9876543217', 'orders@buildmat.com', '33AABCA1234G1Z5', NOW(), NOW(), 0, 1),
(1008, 'FINO_BY_006', 'CMP7K9D2M4Q8X', 'Plumbing Distributors', 'Kochi, Kerala', '9876543218', 'sales@plumbdist.com', '32AABCA1234H1Z5', NOW(), NOW(), 0, 1),
(1009, 'FINO_BY_007', 'CMP7K9D2M4Q8X', 'Pipe Fittings Corp', 'Ahmedabad, Gujarat', '9876543219', 'info@pipefittings.com', '24AABCA1234I1Z5', NOW(), NOW(), 0, 1),
(1010, 'FINO_BY_008', 'CMP7K9D2M4Q8X', 'Construction Supply Co', 'Jaipur, Rajasthan', '9876543220', 'orders@consupply.com', '08AABCA1234J1Z5', NOW(), NOW(), 0, 1),
(1011, 'FINO_BY_009', 'CMP7K9D2M4Q8X', 'Infrastructure Materials', 'Lucknow, Uttar Pradesh', '9876543221', 'purchase@inframat.com', '09AABCA1234K1Z5', NOW(), NOW(), 0, 1),
(1012, 'FINO_BY_010', 'CMP7K9D2M4Q8X', 'Pipe Systems Ltd', 'Bhopal, Madhya Pradesh', '9876543222', 'sales@pipesys.com', '23AABCA1234L1Z5', NOW(), NOW(), 0, 1),
(1013, 'FINO_BY_011', 'CMP7K9D2M4Q8X', 'Water Management Co', 'Chandigarh, Punjab', '9876543223', 'orders@watermgmt.com', '03AABCA1234M1Z5', NOW(), NOW(), 0, 1),
(1014, 'FINO_BY_012', 'CMP7K9D2M4Q8X', 'Drainage Solutions', 'Patna, Bihar', '9876543224', 'info@drainsol.com', '10AABCA1234N1Z5', NOW(), NOW(), 0, 1),
(1015, 'FINO_BY_013', 'CMP7K9D2M4Q8X', 'Plumbing Supplies Inc', 'Guwahati, Assam', '9876543225', 'purchase@plumbsup.com', '18AABCA1234O1Z5', NOW(), NOW(), 0, 1),
(1016, 'FINO_BY_014', 'CMP7K9D2M4Q8X', 'Pipe Manufacturing Co', 'Ranchi, Jharkhand', '9876543226', 'orders@pipemfg.com', '20AABCA1234P1Z5', NOW(), NOW(), 0, 1),
(1017, 'FINO_BY_015', 'CMP7K9D2M4Q8X', 'Industrial Fittings Ltd', 'Raipur, Chhattisgarh', '9876543227', 'sales@indfittings.com', '22AABCA1234Q1Z5', NOW(), NOW(), 0, 1),
(1018, 'FINO_BY_016', 'CMP7K9D2M4Q8X', 'Water Infrastructure', 'Dehradun, Uttarakhand', '9876543228', 'info@waterinfra.com', '05AABCA1234R1Z5', NOW(), NOW(), 0, 1),
(1019, 'FINO_BY_017', 'CMP7K9D2M4Q8X', 'Pipe Distribution Hub', 'Shimla, Himachal Pradesh', '9876543229', 'orders@pipedist.com', '02AABCA1234S1Z5', NOW(), NOW(), 0, 1),
(1020, 'FINO_BY_018', 'CMP7K9D2M4Q8X', 'Construction Pipes Co', 'Srinagar, Jammu & Kashmir', '9876543230', 'purchase@conspipes.com', '01AABCA1234T1Z5', NOW(), NOW(), 0, 1),
(1021, 'PRES_BY_003', 'CMPN3R5T8W2ZA', 'Kitchen Equipment Suppliers', 'Kolkata, West Bengal', '9876543231', 'orders@kitchenequip.com', '19AABCA1234U1Z5', NOW(), NOW(), 0, 1),
(1022, 'PRES_BY_004', 'CMPN3R5T8W2ZA', 'Home Appliance Distributors', 'Chennai, Tamil Nadu', '9876543232', 'sales@homeappl.com', '33AABCA1234V1Z5', NOW(), NOW(), 0, 1),
(1023, 'PRES_BY_005', 'CMPN3R5T8W2ZA', 'Cookware Solutions Ltd', 'Bangalore, Karnataka', '9876543233', 'info@cookwaresol.com', '29AABCA1234W1Z5', NOW(), NOW(), 0, 1),
(1024, 'PRES_BY_006', 'CMPN3R5T8W2ZA', 'Kitchen Appliance Hub', 'Hyderabad, Telangana', '9876543234', 'orders@kitchenhub.com', '36AABCA1234X1Z5', NOW(), NOW(), 0, 1),
(1025, 'PRES_BY_007', 'CMPN3R5T8W2ZA', 'Pressure Cooker Distributors', 'Mumbai, Maharashtra', '9876543235', 'purchase@presscook.com', '27AABCA1234Y1Z5', NOW(), NOW(), 0, 1),
(1026, 'PRES_BY_008', 'CMPN3R5T8W2ZA', 'Home Kitchen Solutions', 'Pune, Maharashtra', '9876543236', 'sales@homekitchen.com', '27AABCA1234Z1Z5', NOW(), NOW(), 0, 1),
(1027, 'PRES_BY_009', 'CMPN3R5T8W2ZA', 'Cooking Equipment Co', 'Ahmedabad, Gujarat', '9876543237', 'info@cookequip.com', '24AABCA1235A1Z5', NOW(), NOW(), 0, 1),
(1028, 'PRES_BY_010', 'CMPN3R5T8W2ZA', 'Kitchen Retail Chain', 'Surat, Gujarat', '9876543238', 'orders@kitchenretail.com', '24AABCA1235B1Z5', NOW(), NOW(), 0, 1),
(1029, 'PRES_BY_011', 'CMPN3R5T8W2ZA', 'Appliance Wholesale Co', 'Vadodara, Gujarat', '9876543239', 'purchase@applwhole.com', '24AABCA1235C1Z5', NOW(), NOW(), 0, 1),
(1030, 'PRES_BY_012', 'CMPN3R5T8W2ZA', 'Kitchen Accessories Ltd', 'Rajkot, Gujarat', '9876543240', 'sales@kitchenacc.com', '24AABCA1235D1Z5', NOW(), NOW(), 0, 1),
(1031, 'PRES_BY_013', 'CMPN3R5T8W2ZA', 'Home Cooking Solutions', 'Jaipur, Rajasthan', '9876543241', 'info@homecook.com', '08AABCA1235E1Z5', NOW(), NOW(), 0, 1),
(1032, 'PRES_BY_014', 'CMPN3R5T8W2ZA', 'Cookware Distributors', 'Indore, Madhya Pradesh', '9876543242', 'orders@cookwaredist.com', '23AABCA1235F1Z5', NOW(), NOW(), 0, 1),
(1033, 'PRES_BY_015', 'CMPN3R5T8W2ZA', 'Kitchen Equipment Hub', 'Bhopal, Madhya Pradesh', '9876543243', 'purchase@kitchenequiphub.com', '23AABCA1235G1Z5', NOW(), NOW(), 0, 1),
(1034, 'PRES_BY_016', 'CMPN3R5T8W2ZA', 'Pressure Cooker Solutions', 'Nagpur, Maharashtra', '9876543244', 'sales@presscooksol.com', '27AABCA1235H1Z5', NOW(), NOW(), 0, 1),
(1035, 'PRES_BY_017', 'CMPN3R5T8W2ZA', 'Home Appliance Network', 'Aurangabad, Maharashtra', '9876543245', 'info@homeapplnet.com', '27AABCA1235I1Z5', NOW(), NOW(), 0, 1),
(1036, 'PRES_BY_018', 'CMPN3R5T8W2ZA', 'Kitchen Solutions Co', 'Nashik, Maharashtra', '9876543246', 'orders@kitchensol.com', '27AABCA1235J1Z5', NOW(), NOW(), 0, 1),
(1037, 'PRES_BY_019', 'CMPN3R5T8W2ZA', 'Cooking Appliance Distributors', 'Solapur, Maharashtra', '9876543247', 'purchase@cookappl.com', '27AABCA1235K1Z5', NOW(), NOW(), 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `mst_company`
--

--
-- Dumping data for table `mst_company`
--

INSERT INTO `mst_company` (`company_seq`, `company_id`, `company_name`, `business_cons`, `company_type`, `address`, `pincode`, `prop_name`, `direct_phone`, `office_phone`, `mgmt_phone`, `mail_id`, `nature_of_business`, `auth_person`, `mobile_no`, `create_date`, `update_date`, `is_deleted`, `is_active`) VALUES
(1000, 'CMP7K9D2M4Q8X', 'Finolex Industries Ltd', 'corporation', 'large scale', 'Finolex Bhavan, Pune-Bangalore Highway, Pune', 411045, 'Prakash P Chhabria', '2067121800', '2067121800', '2067121800', 'contact@finolex.com', 'manufacturing', 'Prakash P Chhabria', '2067121800', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1001, 'CMPN3R5T8W2ZA', 'Prestige Smart Kitchen Ltd', 'corporation', 'large scale', 'TTK Prestige House, Bangalore', 560042, 'T T Jagannathan', '8025505555', '8025505555', '8025505555', 'contact@prestigesmartcooking.com', 'manufacturing', 'T T Jagannathan', '8025505555', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1002, 'CMPB6H9K3M7P4', 'Milton Industries Ltd', 'corporation', 'medium scale', 'Milton House, Rajkot, Gujarat', 360002, 'T M Louis', '2812234567', '2812234567', '2812234567', 'contact@milton.in', 'manufacturing', 'T M Louis', '2812234567', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1003, 'CMPV2X8D5N9R7', 'Butterfly Gandhimathi Appliances Ltd', 'corporation', 'medium scale', 'No.1, Sardar Patel Road, Chennai', 600113, 'G Venkatesh', '4428156789', '4428156789', '4428156789', 'contact@butterflyindia.com', 'manufacturing', 'G Venkatesh', '4428156789', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1004, 'CMPF4J7Q1S6W9', 'Hawkins Cookers Ltd', 'corporation', 'medium scale', 'Hawkins House, Mumbai', 400013, 'Brahm Vasudeva', '2224567890', '2224567890', '2224567890', 'contact@hawkinscookers.com', 'manufacturing', 'Brahm Vasudeva', '2224567890', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `txn_dispatch`
--

--
-- Dumping data for table `txn_dispatch`
--

INSERT INTO `txn_dispatch` (`dispatch_seq`, `product_id`, `company_id`, `order_id`, `dispatch_id`, `dispatch_date`, `quantity`, `no_of_packs`, `total_weight`, `normal_weight`, `norms_weight`, `create_date`, `update_date`, `is_deleted`, `is_active`) VALUES
(1010, 'PRDBNTMDABPFM', 'CMP7K9D2M4Q8X', 'FINO_OR_001', 'FINO_DL_001', '2025-02-10 00:00:00', 500, 20, 1250.0000, 2.5000, 1312.5000, NOW(), NOW(), 0, 1),
(1011, 'PRDTKAT6K4PGJ', 'CMP7K9D2M4Q8X', 'FINO_OR_002', 'FINO_DL_002', '2025-02-15 00:00:00', 1000, 50, 800.0000, 0.8000, 864.0000, NOW(), NOW(), 0, 1),
(1012, 'PRDE8RQ343S1F', 'CMPN3R5T8W2ZA', 'PRES_OR_001', 'PRES_DL_001', '2025-02-12 00:00:00', 100, 5, 3500.0000, 35.0000, 3920.0000, NOW(), NOW(), 0, 1),
(1013, 'PRDGQRDXTTCK8', 'CMPN3R5T8W2ZA', 'PRES_OR_002', 'PRES_DL_002', '2025-02-08 00:00:00', 400, 20, 4800.0000, 12.0000, 5520.0000, NOW(), NOW(), 0, 1),
(1014, 'PRDX8VSJC9G72', 'CMP7K9D2M4Q8X', 'FINO_OR_003', 'FINO_DL_003', '2025-02-25 00:00:00', 800, 32, 3040.0000, 3.8000, 3192.0000, NOW(), NOW(), 0, 1),
(1015, 'PRDAWHC88JT61', 'CMP7K9D2M4Q8X', 'FINO_OR_004', 'FINO_DL_004', '2025-02-28 00:00:00', 1500, 75, 1800.0000, 1.2000, 1926.0000, NOW(), NOW(), 0, 1),
(1016, 'PRDA3QCGFFQAA', 'CMP7K9D2M4Q8X', 'FINO_OR_005', 'FINO_DL_005', '2025-03-02 00:00:00', 1200, 60, 1800.0000, 1.5000, 1908.0000, NOW(), NOW(), 0, 1),
(1017, 'PRD0EV2ENEH1C', 'CMP7K9D2M4Q8X', 'FINO_OR_006', 'FINO_DL_006', '2025-03-05 00:00:00', 2000, 100, 1200.0000, 0.6000, 1296.0000, NOW(), NOW(), 0, 1),
(1018, 'PRD43D98EBJCT', 'CMP7K9D2M4Q8X', 'FINO_OR_007', 'FINO_DL_007', '2025-03-08 00:00:00', 1800, 90, 1620.0000, 0.9000, 1733.4000, NOW(), NOW(), 0, 1),
(1019, 'PRD08JAW9QNK4', 'CMP7K9D2M4Q8X', 'FINO_OR_008', 'FINO_DL_008', '2025-03-10 00:00:00', 600, 30, 1320.0000, 2.2000, 1438.8000, NOW(), NOW(), 0, 1),
(1020, 'PRD9WRZNKDD2N', 'CMP7K9D2M4Q8X', 'FINO_OR_009', 'FINO_DL_009', '2025-03-12 00:00:00', 1400, 70, 2520.0000, 1.8000, 2646.0000, NOW(), NOW(), 0, 1),
(1021, 'PRDBH3698KS80', 'CMP7K9D2M4Q8X', 'FINO_OR_010', 'FINO_DL_010', '2025-03-15 00:00:00', 1000, 50, 1600.0000, 1.6000, 1712.0000, NOW(), NOW(), 0, 1),
(1022, 'PRDRSPGVC1YKX', 'CMP7K9D2M4Q8X', 'FINO_OR_011', 'FINO_DL_011', '2025-03-18 00:00:00', 400, 20, 1680.0000, 4.2000, 1831.2000, NOW(), NOW(), 0, 1),
(1023, 'PRDV3Y3JC8YFR', 'CMP7K9D2M4Q8X', 'FINO_OR_012', 'FINO_DL_012', '2025-03-20 00:00:00', 1600, 80, 2240.0000, 1.4000, 2374.4000, NOW(), NOW(), 0, 1),
(1024, 'PRDDX5V59HVNX', 'CMP7K9D2M4Q8X', 'FINO_OR_013', 'FINO_DL_013', '2025-03-22 00:00:00', 800, 40, 2240.0000, 2.8000, 2396.8000, NOW(), NOW(), 0, 1),
(1025, 'PRDRPDGA67EX7', 'CMP7K9D2M4Q8X', 'FINO_OR_014', 'FINO_DL_014', '2025-03-25 00:00:00', 300, 15, 1560.0000, 5.2000, 1653.6000, NOW(), NOW(), 0, 1),
(1026, 'PRD6B66MMSC7G', 'CMP7K9D2M4Q8X', 'FINO_OR_015', 'FINO_DL_015', '2025-03-28 00:00:00', 1200, 60, 2160.0000, 1.8000, 2332.8000, NOW(), NOW(), 0, 1),
(1027, 'PRDT2HRC21DCM', 'CMP7K9D2M4Q8X', 'FINO_OR_016', 'FINO_DL_016', '2025-03-30 00:00:00', 1000, 50, 2100.0000, 2.1000, 2268.0000, NOW(), NOW(), 0, 1),
(1028, 'PRDYKY2J09T65', 'CMP7K9D2M4Q8X', 'FINO_OR_017', 'FINO_DL_017', '2025-04-02 00:00:00', 1800, 90, 1980.0000, 1.1000, 2117.4000, NOW(), NOW(), 0, 1),
(1029, 'PRDEG10VDVD4F', 'CMP7K9D2M4Q8X', 'FINO_OR_018', 'FINO_DL_018', '2025-04-05 00:00:00', 2500, 125, 1000.0000, 0.4000, 1090.0000, NOW(), NOW(), 0, 1),
(1030, 'PRD143CQB42AX', 'CMPN3R5T8W2ZA', 'PRES_OR_003', 'PRES_DL_003', '2025-02-25 00:00:00', 150, 8, 4200.0000, 28.0000, 4620.0000, NOW(), NOW(), 0, 1),
(1031, 'PRDBP8H5XTAQF', 'CMPN3R5T8W2ZA', 'PRES_OR_004', 'PRES_DL_004', '2025-02-28 00:00:00', 600, 30, 5100.0000, 8.5000, 5712.0000, NOW(), NOW(), 0, 1),
(1032, 'PRDNB05JNK148', 'CMPN3R5T8W2ZA', 'PRES_OR_005', 'PRES_DL_005', '2025-03-02 00:00:00', 2000, 100, 600.0000, 0.3000, 690.0000, NOW(), NOW(), 0, 1),
(1033, 'PRD1TJ14MD12G', 'CMPN3R5T8W2ZA', 'PRES_OR_006', 'PRES_DL_006', '2025-03-05 00:00:00', 400, 20, 2080.0000, 5.2000, 2246.4000, NOW(), NOW(), 0, 1),
(1034, 'PRDWMGJHD80PX', 'CMPN3R5T8W2ZA', 'PRES_OR_007', 'PRES_DL_007', '2025-03-08 00:00:00', 800, 40, 3040.0000, 3.8000, 3344.0000, NOW(), NOW(), 0, 1),
(1035, 'PRDHKRXWEH29B', 'CMPN3R5T8W2ZA', 'PRES_OR_008', 'PRES_DL_008', '2025-03-10 00:00:00', 120, 6, 1860.0000, 15.5000, 2046.6000, NOW(), NOW(), 0, 1),
(1036, 'PRDQYEK086ND0', 'CMPN3R5T8W2ZA', 'PRES_OR_009', 'PRES_DL_009', '2025-03-12 00:00:00', 500, 25, 1400.0000, 2.8000, 1526.0000, NOW(), NOW(), 0, 1),
(1037, 'PRDDAT61XJWC4', 'CMPN3R5T8W2ZA', 'PRES_OR_010', 'PRES_DL_010', '2025-03-15 00:00:00', 300, 15, 2040.0000, 6.8000, 2263.2000, NOW(), NOW(), 0, 1),
(1038, 'PRDDSG73JMQ35', 'CMPN3R5T8W2ZA', 'PRES_OR_011', 'PRES_DL_011', '2025-03-18 00:00:00', 600, 30, 2520.0000, 4.2000, 2721.6000, NOW(), NOW(), 0, 1),
(1039, 'PRD1Q8G67FZR8', 'CMPN3R5T8W2ZA', 'PRES_OR_012', 'PRES_DL_012', '2025-03-20 00:00:00', 1000, 50, 1800.0000, 1.8000, 2016.0000, NOW(), NOW(), 0, 1),
(1040, 'PRDN1KRV0X6M6', 'CMPN3R5T8W2ZA', 'PRES_OR_013', 'PRES_DL_013', '2025-03-22 00:00:00', 80, 4, 1760.0000, 22.0000, 1918.4000, NOW(), NOW(), 0, 1),
(1041, 'PRD77YTWXJV76', 'CMPN3R5T8W2ZA', 'PRES_OR_014', 'PRES_DL_014', '2025-03-25 00:00:00', 1500, 75, 1200.0000, 0.8000, 1380.0000, NOW(), NOW(), 0, 1),
(1042, 'PRD487F9ZB74N', 'CMPN3R5T8W2ZA', 'PRES_OR_015', 'PRES_DL_015', '2025-03-28 00:00:00', 400, 20, 1400.0000, 3.5000, 1540.0000, NOW(), NOW(), 0, 1),
(1043, 'PRDFC8F8Y27K8', 'CMPN3R5T8W2ZA', 'PRES_OR_016', 'PRES_DL_016', '2025-03-30 00:00:00', 3000, 150, 600.0000, 0.2000, 648.0000, NOW(), NOW(), 0, 1),
(1044, 'PRDYNAMGNRSNH', 'CMPN3R5T8W2ZA', 'PRES_OR_017', 'PRES_DL_017', '2025-04-02 00:00:00', 200, 10, 1760.0000, 8.8000, 1953.6000, NOW(), NOW(), 0, 1),
(1045, 'PRD3V8QPKGWP3', 'CMPN3R5T8W2ZA', 'PRES_OR_018', 'PRES_DL_018', '2025-04-05 00:00:00', 350, 18, 1575.0000, 4.5000, 1732.5000, NOW(), NOW(), 0, 1),
(1046, 'PRD523PQXYY2Z', 'CMPN3R5T8W2ZA', 'PRES_OR_019', 'PRES_DL_019', '2025-04-08 00:00:00', 800, 40, 1760.0000, 2.2000, 1971.2000, NOW(), NOW(), 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `mst_employee`
--

--
-- Dumping data for table `mst_employee`
--

INSERT INTO `mst_employee` (`employee_seq`, `user_id`, `company_id`, `salary`, `active_flag`, `create_date`, `update_date`, `is_deleted`, `is_active`) VALUES
-- Finolex Industries employees (Tamil as Owner)
(1000, 1001, 'CMP7K9D2M4Q8X', 200000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1001, 1003, 'CMP7K9D2M4Q8X', 150000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1002, 1004, 'CMP7K9D2M4Q8X', 120000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1003, 1005, 'CMP7K9D2M4Q8X', 80000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1004, 1006, 'CMP7K9D2M4Q8X', 70000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1005, 1007, 'CMP7K9D2M4Q8X', 45000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1006, 1008, 'CMP7K9D2M4Q8X', 45000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1007, 1009, 'CMP7K9D2M4Q8X', 40000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1008, 1011, 'CMP7K9D2M4Q8X', 60000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1009, 1019, 'CMP7K9D2M4Q8X', 120000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1010, 1021, 'CMP7K9D2M4Q8X', 80000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1011, 1023, 'CMP7K9D2M4Q8X', 80000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1012, 1025, 'CMP7K9D2M4Q8X', 70000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1013, 1027, 'CMP7K9D2M4Q8X', 70000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1014, 1028, 'CMP7K9D2M4Q8X', 45000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1015, 1030, 'CMP7K9D2M4Q8X', 45000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1016, 1032, 'CMP7K9D2M4Q8X', 45000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1017, 1034, 'CMP7K9D2M4Q8X', 40000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1018, 1036, 'CMP7K9D2M4Q8X', 40000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
-- Prestige Smart Kitchen employees (Nandha as Owner)
(1019, 1002, 'CMPN3R5T8W2ZA', 200000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1020, 1014, 'CMPN3R5T8W2ZA', 150000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1021, 1015, 'CMPN3R5T8W2ZA', 120000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1022, 1020, 'CMPN3R5T8W2ZA', 120000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1023, 1016, 'CMPN3R5T8W2ZA', 80000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1024, 1022, 'CMPN3R5T8W2ZA', 80000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1025, 1024, 'CMPN3R5T8W2ZA', 80000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1026, 1013, 'CMPN3R5T8W2ZA', 70000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1027, 1026, 'CMPN3R5T8W2ZA', 70000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1028, 1012, 'CMPN3R5T8W2ZA', 45000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1029, 1017, 'CMPN3R5T8W2ZA', 45000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1030, 1029, 'CMPN3R5T8W2ZA', 45000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1031, 1031, 'CMPN3R5T8W2ZA', 45000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1032, 1033, 'CMPN3R5T8W2ZA', 45000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1033, 1010, 'CMPN3R5T8W2ZA', 40000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1034, 1035, 'CMPN3R5T8W2ZA', 40000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1035, 1037, 'CMPN3R5T8W2ZA', 40000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1),
(1036, 1018, 'CMPN3R5T8W2ZA', 60000, 'Y', '2025-01-01 00:00:00', '2025-01-01 00:00:00', 0, 1);
-- --------------------------------------------------------

--
-- Table structure for table `mst_machine`
--

--
-- Dumping data for table `mst_machine`
--

INSERT INTO `mst_machine` (`machine_seq`, `machine_id`, `company_id`, `machine_name`, `machine_type`, `capacity`, `model`, `active_flag`, `create_date`, `update_date`, `is_deleted`, `is_active`) VALUES
(1001, 'MCH1DYMQJH9S4', 'CMP7K9D2M4Q8X', 'Die Casting Machine', 'Production', '200T', 'DC-200', 'Y', NOW(), NOW(), 0, 1),
(1002, 'MCHZHDVPRF2JD', 'CMP7K9D2M4Q8X', 'Trimming Machine', 'Trimming', '150T', 'TR-150', 'Y', NOW(), NOW(), 0, 1),
(1003, 'MCHXWSJMQ1NW1', 'CMP7K9D2M4Q8X', 'Drilling Machine', 'Drilling / Tapping', '50T', 'DM-50', 'Y', NOW(), NOW(), 0, 1),
(1004, 'MCHVZD02PKKE9', 'CMP7K9D2M4Q8X', 'Tapping Machine', 'Tapping Machine', '30T', 'TM-30', 'Y', NOW(), NOW(), 0, 1),
(1005, 'MCHQN28CYXA7H', 'CMP7K9D2M4Q8X', 'CNC Lathe', 'CNC Lathe', '100T', 'CNC-100', 'Y', NOW(), NOW(), 0, 1),
(1006, 'MCH92AXFQHE14', 'CMP7K9D2M4Q8X', 'Shot Blast Machine', 'Shot Blasting', '80T', 'SB-80', 'Y', NOW(), NOW(), 0, 1),
(1007, 'MCH0TP85H9W7K', 'CMP7K9D2M4Q8X', 'Powder Coating Machine', 'Powder Coating', '120T', 'PC-120', 'Y', NOW(), NOW(), 0, 1),
(1008, 'MCHVJVWJG0RVD', 'CMPN3R5T8W2ZA', 'Die Casting Machine', 'Production', '180T', 'DC-180', 'Y', NOW(), NOW(), 0, 1),
(1009, 'MCHXAE6JWB135', 'CMPN3R5T8W2ZA', 'Trimming Machine', 'Trimming', '140T', 'TR-140', 'Y', NOW(), NOW(), 0, 1),
(1010, 'MCHF0ZS2VEYZ5', 'CMPN3R5T8W2ZA', 'Drilling Machine', 'Drilling / Tapping', '45T', 'DM-45', 'Y', NOW(), NOW(), 0, 1),
(1011, 'MCHNE64XVHHRX', 'CMPN3R5T8W2ZA', 'Tapping Machine', 'Tapping Machine', '25T', 'TM-25', 'Y', NOW(), NOW(), 0, 1),
(1012, 'MCHQEDSHNXZ1X', 'CMPN3R5T8W2ZA', 'CNC Lathe', 'CNC Lathe', '90T', 'CNC-90', 'Y', NOW(), NOW(), 0, 1),
(1013, 'MCH78R0M4V8C4', 'CMPN3R5T8W2ZA', 'Shot Blast Machine', 'Shot Blasting', '70T', 'SB-70', 'Y', NOW(), NOW(), 0, 1),
(1014, 'MCHKDXYEKJQSB', 'CMPN3R5T8W2ZA', 'Powder Coating Machine', 'Powder Coating', '110T', 'PC-110', 'Y', NOW(), NOW(), 0, 1),
(1015, 'MCHTG1VT6HBNV', 'CMP7K9D2M4Q8X', 'Die Casting Machine 2', 'Production', '250T', 'DC-250', 'Y', NOW(), NOW(), 0, 1),
(1016, 'MCHMRG4MHHE96', 'CMP7K9D2M4Q8X', 'Die Casting Machine 3', 'Production', '300T', 'DC-300', 'Y', NOW(), NOW(), 0, 1),
(1017, 'MCHN8T8GVEYY5', 'CMP7K9D2M4Q8X', 'Trimming Machine 2', 'Trimming', '180T', 'TR-180', 'Y', NOW(), NOW(), 0, 1),
(1018, 'MCHM7GCQ91P6R', 'CMP7K9D2M4Q8X', 'Trimming Machine 3', 'Trimming', '200T', 'TR-200', 'Y', NOW(), NOW(), 0, 1),
(1019, 'MCHKXABMQZPFN', 'CMP7K9D2M4Q8X', 'Drilling Machine 2', 'Drilling / Tapping', '60T', 'DM-60', 'Y', NOW(), NOW(), 0, 1),
(1020, 'MCH8XBKN392F0', 'CMP7K9D2M4Q8X', 'Drilling Machine 3', 'Drilling / Tapping', '70T', 'DM-70', 'Y', NOW(), NOW(), 0, 1),
(1021, 'MCH8FDQBRS4GF', 'CMP7K9D2M4Q8X', 'Tapping Machine 2', 'Tapping Machine', '40T', 'TM-40', 'Y', NOW(), NOW(), 0, 1),
(1022, 'MCH0B1CN5RD5D', 'CMP7K9D2M4Q8X', 'Tapping Machine 3', 'Tapping Machine', '50T', 'TM-50', 'Y', NOW(), NOW(), 0, 1),
(1023, 'MCH0Q47KJYAB6', 'CMP7K9D2M4Q8X', 'CNC Lathe 2', 'CNC Lathe', '120T', 'CNC-120', 'Y', NOW(), NOW(), 0, 1),
(1024, 'MCHTWRGQVVEBZ', 'CMP7K9D2M4Q8X', 'CNC Lathe 3', 'CNC Lathe', '150T', 'CNC-150', 'Y', NOW(), NOW(), 0, 1),
(1025, 'MCHK8WAPF1E86', 'CMP7K9D2M4Q8X', 'Shot Blast Machine 2', 'Shot Blasting', '100T', 'SB-100', 'Y', NOW(), NOW(), 0, 1),
(1026, 'MCH2CZTYNDPT8', 'CMP7K9D2M4Q8X', 'Shot Blast Machine 3', 'Shot Blasting', '120T', 'SB-120', 'Y', NOW(), NOW(), 0, 1),
(1027, 'MCHVFFSD7D6KB', 'CMP7K9D2M4Q8X', 'Powder Coating Machine 2', 'Powder Coating', '140T', 'PC-140', 'Y', NOW(), NOW(), 0, 1),
(1028, 'MCHNR54BG7WYT', 'CMP7K9D2M4Q8X', 'Powder Coating Machine 3', 'Powder Coating', '160T', 'PC-160', 'Y', NOW(), NOW(), 0, 1),
(1029, 'MCHDNCP7JKKZP', 'CMPN3R5T8W2ZA', 'Die Casting Machine 2', 'Production', '200T', 'DC-200', 'Y', NOW(), NOW(), 0, 1),
(1030, 'MCH77AZA1WWJD', 'CMPN3R5T8W2ZA', 'Die Casting Machine 3', 'Production', '220T', 'DC-220', 'Y', NOW(), NOW(), 0, 1),
(1031, 'MCHC0N30R1C4J', 'CMPN3R5T8W2ZA', 'Trimming Machine 2', 'Trimming', '160T', 'TR-160', 'Y', NOW(), NOW(), 0, 1),
(1032, 'MCHSQKTXKSGHK', 'CMPN3R5T8W2ZA', 'Trimming Machine 3', 'Trimming', '180T', 'TR-180', 'Y', NOW(), NOW(), 0, 1),
(1033, 'MCHCHH2QB0CCA', 'CMPN3R5T8W2ZA', 'Drilling Machine 2', 'Drilling / Tapping', '55T', 'DM-55', 'Y', NOW(), NOW(), 0, 1),
(1034, 'MCHCVZ9T0WEEQ', 'CMPN3R5T8W2ZA', 'Drilling Machine 3', 'Drilling / Tapping', '65T', 'DM-65', 'Y', NOW(), NOW(), 0, 1),
(1035, 'MCHX3XBGWK9BE', 'CMPN3R5T8W2ZA', 'Tapping Machine 2', 'Tapping Machine', '35T', 'TM-35', 'Y', NOW(), NOW(), 0, 1),
(1036, 'MCHYGK3XCK9TK', 'CMPN3R5T8W2ZA', 'Tapping Machine 3', 'Tapping Machine', '45T', 'TM-45', 'Y', NOW(), NOW(), 0, 1),
(1037, 'MCHJR4SDY71F7', 'CMPN3R5T8W2ZA', 'CNC Lathe 2', 'CNC Lathe', '110T', 'CNC-110', 'Y', NOW(), NOW(), 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `txn_order`
--

--
-- Dumping data for table `txn_order`
--

INSERT INTO `txn_order` (`order_seq`, `order_id`, `order_name`, `company_id`, `product_id`, `buyer_id`, `order_status`, `order_date`, `target_date`, `order_quantity`, `price`, `discount`, `total_price`, `create_date`, `update_date`, `is_deleted`, `is_active`) VALUES
(1001, 'FINO_OR_001', 'PVC Pipe 4 inch - Batch A', 'CMP7K9D2M4Q8X', 'PRDBNTMDABPFM', 'FINO_BY_001', 'IN_PROGRESS', '2025-02-01 00:00:00', '2025-02-15 00:00:00', 1000, 25.00, 2.00, 23000.00, NOW(), NOW(), 0, 1),
(1002, 'FINO_OR_002', 'PVC Fitting Elbow - High Volume', 'CMP7K9D2M4Q8X', 'PRDTKAT6K4PGJ', 'FINO_BY_002', 'SCHEDULED', '2025-02-05 00:00:00', '2025-02-20 00:00:00', 2000, 8.50, 1.00, 15000.00, NOW(), NOW(), 0, 1),
(1003, 'PRES_OR_001', 'Pressure Cooker Base - Premium', 'CMPN3R5T8W2ZA', 'PRDE8RQ343S1F', 'PRES_BY_001', 'IN_PROGRESS', '2025-02-03 00:00:00', '2025-02-18 00:00:00', 200, 120.00, 8.00, 22400.00, NOW(), NOW(), 0, 1),
(1004, 'PRES_OR_002', 'Cooker Handle - Standard', 'CMPN3R5T8W2ZA', 'PRDGQRDXTTCK8', 'PRES_BY_002', 'COMPLETED', '2025-01-28 00:00:00', '2025-02-10 00:00:00', 800, 35.00, 3.00, 25600.00, NOW(), NOW(), 0, 1),
(1005, 'FINO_OR_003', 'PVC Pipe 6 inch - Large Order', 'CMP7K9D2M4Q8X', 'PRDX8VSJC9G72', 'FINO_BY_003', 'SCHEDULED', '2025-02-08 00:00:00', '2025-02-25 00:00:00', 800, 30.00, 2.50, 22600.00, NOW(), NOW(), 0, 1),
(1006, 'FINO_OR_004', 'PVC T-Joint - Bulk Production', 'CMP7K9D2M4Q8X', 'PRDAWHC88JT61', 'FINO_BY_004', 'IN_PROGRESS', '2025-02-10 00:00:00', '2025-02-28 00:00:00', 1500, 12.00, 1.50, 16725.00, NOW(), NOW(), 0, 1),
(1007, 'FINO_OR_005', 'PVC Reducer - Standard', 'CMP7K9D2M4Q8X', 'PRDA3QCGFFQAA', 'FINO_BY_005', 'SCHEDULED', '2025-02-12 00:00:00', '2025-03-02 00:00:00', 1200, 15.00, 2.00, 17640.00, NOW(), NOW(), 0, 1),
(1008, 'FINO_OR_006', 'PVC End Cap - High Volume', 'CMP7K9D2M4Q8X', 'PRD0EV2ENEH1C', 'FINO_BY_006', 'IN_PROGRESS', '2025-02-14 00:00:00', '2025-03-05 00:00:00', 2000, 8.00, 1.00, 15840.00, NOW(), NOW(), 0, 1),
(1009, 'FINO_OR_007', 'PVC Coupling - Premium', 'CMP7K9D2M4Q8X', 'PRD43D98EBJCT', 'FINO_BY_007', 'SCHEDULED', '2025-02-16 00:00:00', '2025-03-08 00:00:00', 1800, 10.50, 1.25, 18652.50, NOW(), NOW(), 0, 1),
(1010, 'FINO_OR_008', 'PVC Valve - Industrial', 'CMP7K9D2M4Q8X', 'PRD08JAW9QNK4', 'FINO_BY_008', 'IN_PROGRESS', '2025-02-18 00:00:00', '2025-03-10 00:00:00', 600, 28.00, 3.00, 16184.00, NOW(), NOW(), 0, 1),
(1011, 'FINO_OR_009', 'PVC Pipe 2 inch - Standard', 'CMP7K9D2M4Q8X', 'PRD9WRZNKDD2N', 'FINO_BY_009', 'SCHEDULED', '2025-02-20 00:00:00', '2025-03-12 00:00:00', 1400, 18.00, 2.00, 24696.00, NOW(), NOW(), 0, 1),
(1012, 'FINO_OR_010', 'PVC Cross Joint - Bulk', 'CMP7K9D2M4Q8X', 'PRDBH3698KS80', 'FINO_BY_010', 'IN_PROGRESS', '2025-02-22 00:00:00', '2025-03-15 00:00:00', 1000, 20.00, 2.50, 19500.00, NOW(), NOW(), 0, 1),
(1013, 'FINO_OR_011', 'PVC Ball Valve - Premium', 'CMP7K9D2M4Q8X', 'PRDRSPGVC1YKX', 'FINO_BY_011', 'SCHEDULED', '2025-02-24 00:00:00', '2025-03-18 00:00:00', 400, 45.00, 4.00, 17280.00, NOW(), NOW(), 0, 1),
(1014, 'FINO_OR_012', 'PVC Union - Standard', 'CMP7K9D2M4Q8X', 'PRDV3Y3JC8YFR', 'FINO_BY_012', 'IN_PROGRESS', '2025-02-26 00:00:00', '2025-03-20 00:00:00', 1600, 14.00, 1.75, 21960.00, NOW(), NOW(), 0, 1),
(1015, 'FINO_OR_013', 'PVC Flange - Industrial', 'CMP7K9D2M4Q8X', 'PRDDX5V59HVNX', 'FINO_BY_013', 'SCHEDULED', '2025-02-28 00:00:00', '2025-03-22 00:00:00', 800, 35.00, 3.50, 26880.00, NOW(), NOW(), 0, 1),
(1016, 'FINO_OR_014', 'PVC Pipe 8 inch - Large', 'CMP7K9D2M4Q8X', 'PRDRPDGA67EX7', 'FINO_BY_014', 'IN_PROGRESS', '2025-03-02 00:00:00', '2025-03-25 00:00:00', 300, 65.00, 5.00, 18525.00, NOW(), NOW(), 0, 1),
(1017, 'FINO_OR_015', 'PVC Bend 45° - Standard', 'CMP7K9D2M4Q8X', 'PRD6B66MMSC7G', 'FINO_BY_015', 'SCHEDULED', '2025-03-04 00:00:00', '2025-03-28 00:00:00', 1200, 22.00, 2.25, 25740.00, NOW(), NOW(), 0, 1),
(1018, 'FINO_OR_016', 'PVC Bend 90° - Bulk', 'CMP7K9D2M4Q8X', 'PRDT2HRC21DCM', 'FINO_BY_016', 'IN_PROGRESS', '2025-03-06 00:00:00', '2025-03-30 00:00:00', 1000, 25.00, 2.75, 24275.00, NOW(), NOW(), 0, 1),
(1019, 'FINO_OR_017', 'PVC Adapter - Premium', 'CMP7K9D2M4Q8X', 'PRDYKY2J09T65', 'FINO_BY_017', 'SCHEDULED', '2025-03-08 00:00:00', '2025-04-02 00:00:00', 1800, 13.50, 1.50, 23895.00, NOW(), NOW(), 0, 1),
(1020, 'FINO_OR_018', 'PVC Plug - High Volume', 'CMP7K9D2M4Q8X', 'PRDEG10VDVD4F', 'FINO_BY_018', 'IN_PROGRESS', '2025-03-10 00:00:00', '2025-04-05 00:00:00', 2500, 6.00, 0.75, 14812.50, NOW(), NOW(), 0, 1),
(1021, 'PRES_OR_003', 'Pressure Cooker Lid - Premium', 'CMPN3R5T8W2ZA', 'PRD143CQB42AX', 'PRES_BY_003', 'IN_PROGRESS', '2025-02-08 00:00:00', '2025-02-25 00:00:00', 150, 180.00, 12.00, 25200.00, NOW(), NOW(), 0, 1),
(1022, 'PRES_OR_004', 'Safety Valve - Standard', 'CMPN3R5T8W2ZA', 'PRDBP8H5XTAQF', 'PRES_BY_004', 'SCHEDULED', '2025-02-10 00:00:00', '2025-02-28 00:00:00', 600, 45.00, 4.00, 25920.00, NOW(), NOW(), 0, 1),
(1023, 'PRES_OR_005', 'Gasket Ring - Bulk Order', 'CMPN3R5T8W2ZA', 'PRDNB05JNK148', 'PRES_BY_005', 'IN_PROGRESS', '2025-02-12 00:00:00', '2025-03-02 00:00:00', 2000, 8.50, 1.00, 15300.00, NOW(), NOW(), 0, 1),
(1024, 'PRES_OR_006', 'Pressure Indicator - Premium', 'CMPN3R5T8W2ZA', 'PRD1TJ14MD12G', 'PRES_BY_006', 'SCHEDULED', '2025-02-14 00:00:00', '2025-03-05 00:00:00', 400, 85.00, 6.00, 31600.00, NOW(), NOW(), 0, 1),
(1025, 'PRES_OR_007', 'Handle Grip - Standard', 'CMPN3R5T8W2ZA', 'PRDWMGJHD80PX', 'PRES_BY_007', 'IN_PROGRESS', '2025-02-16 00:00:00', '2025-03-08 00:00:00', 800, 25.00, 2.50, 19400.00, NOW(), NOW(), 0, 1),
(1026, 'PRES_OR_008', 'Cooker Base Plate - Industrial', 'CMPN3R5T8W2ZA', 'PRDHKRXWEH29B', 'PRES_BY_008', 'SCHEDULED', '2025-02-18 00:00:00', '2025-03-10 00:00:00', 120, 220.00, 15.00, 24840.00, NOW(), NOW(), 0, 1),
(1027, 'PRES_OR_009', 'Steam Vent - Premium', 'CMPN3R5T8W2ZA', 'PRDQYEK086ND0', 'PRES_BY_009', 'IN_PROGRESS', '2025-02-20 00:00:00', '2025-03-12 00:00:00', 500, 35.00, 3.00, 16450.00, NOW(), NOW(), 0, 1),
(1028, 'PRES_OR_010', 'Locking Mechanism - Standard', 'CMPN3R5T8W2ZA', 'PRDDAT61XJWC4', 'PRES_BY_010', 'SCHEDULED', '2025-02-22 00:00:00', '2025-03-15 00:00:00', 300, 95.00, 7.00, 26640.00, NOW(), NOW(), 0, 1),
(1029, 'PRES_OR_011', 'Heat Distributor - Bulk', 'CMPN3R5T8W2ZA', 'PRDDSG73JMQ35', 'PRES_BY_011', 'IN_PROGRESS', '2025-02-24 00:00:00', '2025-03-18 00:00:00', 600, 55.00, 4.50, 31170.00, NOW(), NOW(), 0, 1),
(1030, 'PRES_OR_012', 'Whistle Assembly - Premium', 'CMPN3R5T8W2ZA', 'PRD1Q8G67FZR8', 'PRES_BY_012', 'SCHEDULED', '2025-02-26 00:00:00', '2025-03-20 00:00:00', 1000, 18.00, 2.00, 16200.00, NOW(), NOW(), 0, 1),
(1031, 'PRES_OR_013', 'Cooker Inner Pot - Standard', 'CMPN3R5T8W2ZA', 'PRDN1KRV0X6M6', 'PRES_BY_013', 'IN_PROGRESS', '2025-02-28 00:00:00', '2025-03-22 00:00:00', 80, 280.00, 20.00, 20800.00, NOW(), NOW(), 0, 1),
(1032, 'PRES_OR_014', 'Rubber Seal - Bulk Order', 'CMPN3R5T8W2ZA', 'PRD77YTWXJV76', 'PRES_BY_014', 'SCHEDULED', '2025-03-02 00:00:00', '2025-03-25 00:00:00', 1500, 12.00, 1.50, 16725.00, NOW(), NOW(), 0, 1),
(1033, 'PRES_OR_015', 'Pressure Release Valve - Premium', 'CMPN3R5T8W2ZA', 'PRD487F9ZB74N', 'PRES_BY_015', 'IN_PROGRESS', '2025-03-04 00:00:00', '2025-03-28 00:00:00', 400, 65.00, 5.00, 24400.00, NOW(), NOW(), 0, 1),
(1034, 'PRES_OR_016', 'Handle Screw - High Volume', 'CMPN3R5T8W2ZA', 'PRDFC8F8Y27K8', 'PRES_BY_016', 'SCHEDULED', '2025-03-06 00:00:00', '2025-03-30 00:00:00', 3000, 4.50, 0.50, 12000.00, NOW(), NOW(), 0, 1),
(1035, 'PRES_OR_017', 'Base Ring - Standard', 'CMPN3R5T8W2ZA', 'PRDYNAMGNRSNH', 'PRES_BY_017', 'IN_PROGRESS', '2025-03-08 00:00:00', '2025-04-02 00:00:00', 200, 125.00, 10.00, 23000.00, NOW(), NOW(), 0, 1),
(1036, 'PRES_OR_018', 'Cooker Trivet - Premium', 'CMPN3R5T8W2ZA', 'PRD3V8QPKGWP3', 'PRES_BY_018', 'SCHEDULED', '2025-03-10 00:00:00', '2025-04-05 00:00:00', 350, 75.00, 6.00, 24150.00, NOW(), NOW(), 0, 1),
(1037, 'PRES_OR_019', 'Lid Handle - Bulk Order', 'CMPN3R5T8W2ZA', 'PRD523PQXYY2Z', 'PRES_BY_019', 'IN_PROGRESS', '2025-03-12 00:00:00', '2025-04-08 00:00:00', 800, 32.00, 3.00, 23360.00, NOW(), NOW(), 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `txn_order_quantity`
--

--
-- Dumping data for table `txn_order_quantity`
--

INSERT INTO `txn_order_quantity` (`order_id`, `company_id`, `order_quantity`, `product_quantity`, `fettl_ip_quantity`, `fettl_ac_quantity`, `fettl_rj_quantity`, `drill_ip_quantity`, `drill_ac_quantity`, `drill_rj_quantity`, `tapp_ip_quantity`, `tapp_ac_quantity`, `tapp_rj_quantity`, `mach_ip_quantity`, `mach_ac_quantity`, `mach_rj_quantity`, `trim_ip_quantity`, `trim_ac_quantity`, `trim_rj_quantity`, `shotb_ip_quantity`, `shotb_ac_quantity`, `shotb_rj_quantity`, `pwdr_ip_quantity`, `pwdr_ac_quantity`, `pwdr_rj_quantity`, `assmbl_ip_quantity`, `assmbl_ac_quantity`, `assmbl_rj_quantity`, `qlins_ip_quantity`, `qlins_ac_quantity`, `qlins_rj_quantity`, `create_date`, `update_date`, `is_deleted`, `is_active`) VALUES
('FINO_OR_001', 'CMP7K9D2M4Q8X', 1000, 950, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NOW(), NOW(), 0, 1),
('FINO_OR_002', 'CMP7K9D2M4Q8X', 2000, 1900, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NOW(), NOW(), 0, 1),
('PRES_OR_001', 'CMPN3R5T8W2ZA', 200, 180, 200, 190, 10, 190, 180, 10, 180, 170, 10, 170, 160, 10, 160, 150, 10, 150, 140, 10, 140, 130, 10, 130, 120, 10, 120, 110, 10, NOW(), NOW(), 0, 1),
('PRES_OR_002', 'CMPN3R5T8W2ZA', 800, 750, 800, 780, 20, 780, 760, 20, 760, 740, 20, 740, 720, 20, 720, 700, 20, 700, 680, 20, 680, 660, 20, 660, 640, 20, 640, 620, 20, NOW(), NOW(), 0, 1),
('FINO_OR_003', 'CMP7K9D2M4Q8X', 800, 760, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NOW(), NOW(), 0, 1),
('FINO_OR_004', 'CMP7K9D2M4Q8X', 1500, 1425, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NOW(), NOW(), 0, 1),
('FINO_OR_005', 'CMP7K9D2M4Q8X', 1200, 1140, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NOW(), NOW(), 0, 1),
('FINO_OR_006', 'CMP7K9D2M4Q8X', 2000, 1900, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NOW(), NOW(), 0, 1),
('FINO_OR_007', 'CMP7K9D2M4Q8X', 1800, 1710, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NOW(), NOW(), 0, 1),
('FINO_OR_008', 'CMP7K9D2M4Q8X', 600, 570, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NOW(), NOW(), 0, 1),
('FINO_OR_009', 'CMP7K9D2M4Q8X', 1400, 1330, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NOW(), NOW(), 0, 1),
('FINO_OR_010', 'CMP7K9D2M4Q8X', 1000, 950, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NOW(), NOW(), 0, 1),
('FINO_OR_011', 'CMP7K9D2M4Q8X', 400, 380, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NOW(), NOW(), 0, 1),
('FINO_OR_012', 'CMP7K9D2M4Q8X', 1600, 1520, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NOW(), NOW(), 0, 1),
('FINO_OR_013', 'CMP7K9D2M4Q8X', 800, 760, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NOW(), NOW(), 0, 1),
('FINO_OR_014', 'CMP7K9D2M4Q8X', 300, 285, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NOW(), NOW(), 0, 1),
('FINO_OR_015', 'CMP7K9D2M4Q8X', 1200, 1140, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NOW(), NOW(), 0, 1),
('FINO_OR_016', 'CMP7K9D2M4Q8X', 1000, 950, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NOW(), NOW(), 0, 1),
('FINO_OR_017', 'CMP7K9D2M4Q8X', 1800, 1710, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NOW(), NOW(), 0, 1),
('FINO_OR_018', 'CMP7K9D2M4Q8X', 2500, 2375, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NOW(), NOW(), 0, 1),
('PRES_OR_003', 'CMPN3R5T8W2ZA', 150, 135, 150, 142, 8, 142, 135, 7, 135, 128, 7, 128, 121, 7, 121, 114, 7, 114, 107, 7, 107, 100, 7, 100, 93, 7, 93, 86, 7, NOW(), NOW(), 0, 1),
('PRES_OR_004', 'CMPN3R5T8W2ZA', 600, 570, 600, 585, 15, 585, 570, 15, 570, 555, 15, 555, 540, 15, 540, 525, 15, 525, 510, 15, 510, 495, 15, 495, 480, 15, 480, 465, 15, NOW(), NOW(), 0, 1),
('PRES_OR_005', 'CMPN3R5T8W2ZA', 2000, 1900, 2000, 1950, 50, 1950, 1900, 50, 1900, 1850, 50, 1850, 1800, 50, 1800, 1750, 50, 1750, 1700, 50, 1700, 1650, 50, 1650, 1600, 50, 1600, 1550, 50, NOW(), NOW(), 0, 1),
('PRES_OR_006', 'CMPN3R5T8W2ZA', 400, 380, 400, 390, 10, 390, 380, 10, 380, 370, 10, 370, 360, 10, 360, 350, 10, 350, 340, 10, 340, 330, 10, 330, 320, 10, 320, 310, 10, NOW(), NOW(), 0, 1),
('PRES_OR_007', 'CMPN3R5T8W2ZA', 800, 760, 800, 780, 20, 780, 760, 20, 760, 740, 20, 740, 720, 20, 720, 700, 20, 700, 680, 20, 680, 660, 20, 660, 640, 20, 640, 620, 20, NOW(), NOW(), 0, 1),
('PRES_OR_008', 'CMPN3R5T8W2ZA', 120, 114, 120, 117, 3, 117, 114, 3, 114, 111, 3, 111, 108, 3, 108, 105, 3, 105, 102, 3, 102, 99, 3, 99, 96, 3, 96, 93, 3, NOW(), NOW(), 0, 1),
('PRES_OR_009', 'CMPN3R5T8W2ZA', 500, 475, 500, 487, 13, 487, 475, 12, 475, 463, 12, 463, 451, 12, 451, 439, 12, 439, 427, 12, 427, 415, 12, 415, 403, 12, 403, 391, 12, NOW(), NOW(), 0, 1),
('PRES_OR_010', 'CMPN3R5T8W2ZA', 300, 285, 300, 292, 8, 292, 285, 7, 285, 278, 7, 278, 271, 7, 271, 264, 7, 264, 257, 7, 257, 250, 7, 250, 243, 7, 243, 236, 7, NOW(), NOW(), 0, 1),
('PRES_OR_011', 'CMPN3R5T8W2ZA', 600, 570, 600, 585, 15, 585, 570, 15, 570, 555, 15, 555, 540, 15, 540, 525, 15, 525, 510, 15, 510, 495, 15, 495, 480, 15, 480, 465, 15, NOW(), NOW(), 0, 1),
('PRES_OR_012', 'CMPN3R5T8W2ZA', 1000, 950, 1000, 975, 25, 975, 950, 25, 950, 925, 25, 925, 900, 25, 900, 875, 25, 875, 850, 25, 850, 825, 25, 825, 800, 25, 800, 775, 25, NOW(), NOW(), 0, 1),
('PRES_OR_013', 'CMPN3R5T8W2ZA', 80, 76, 80, 78, 2, 78, 76, 2, 76, 74, 2, 74, 72, 2, 72, 70, 2, 70, 68, 2, 68, 66, 2, 66, 64, 2, 64, 62, 2, NOW(), NOW(), 0, 1),
('PRES_OR_014', 'CMPN3R5T8W2ZA', 1500, 1425, 1500, 1462, 38, 1462, 1425, 37, 1425, 1388, 37, 1388, 1351, 37, 1351, 1314, 37, 1314, 1277, 37, 1277, 1240, 37, 1240, 1203, 37, 1203, 1166, 37, NOW(), NOW(), 0, 1),
('PRES_OR_015', 'CMPN3R5T8W2ZA', 400, 380, 400, 390, 10, 390, 380, 10, 380, 370, 10, 370, 360, 10, 360, 350, 10, 350, 340, 10, 340, 330, 10, 330, 320, 10, 320, 310, 10, NOW(), NOW(), 0, 1),
('PRES_OR_016', 'CMPN3R5T8W2ZA', 3000, 2850, 3000, 2925, 75, 2925, 2850, 75, 2850, 2775, 75, 2775, 2700, 75, 2700, 2625, 75, 2625, 2550, 75, 2550, 2475, 75, 2475, 2400, 75, 2400, 2325, 75, NOW(), NOW(), 0, 1),
('PRES_OR_017', 'CMPN3R5T8W2ZA', 200, 190, 200, 195, 5, 195, 190, 5, 190, 185, 5, 185, 180, 5, 180, 175, 5, 175, 170, 5, 170, 165, 5, 165, 160, 5, 160, 155, 5, NOW(), NOW(), 0, 1),
('PRES_OR_018', 'CMPN3R5T8W2ZA', 350, 332, 350, 341, 9, 341, 332, 9, 332, 323, 9, 323, 314, 9, 314, 305, 9, 305, 296, 9, 296, 287, 9, 287, 278, 9, 278, 269, 9, NOW(), NOW(), 0, 1),
('PRES_OR_019', 'CMPN3R5T8W2ZA', 800, 760, 800, 780, 20, 780, 760, 20, 760, 740, 20, 740, 720, 20, 720, 700, 20, 700, 680, 20, 680, 660, 20, 660, 640, 20, 640, 620, 20, NOW(), NOW(), 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `mst_product`
--

--
-- Dumping data for table `mst_product`
--

INSERT INTO `mst_product` (`product_seq`, `product_id`, `company_id`, `product_name`, `raw_material`, `weight`, `wastage`, `norms`, `total_weight`, `cavity`, `shot_rate`, `per_item_rate`, `incentive_limit`, `sales_type`, `sales_code`, `sales_percent`, `create_date`, `update_date`, `is_deleted`, `is_active`) VALUES
(1001, 'PRDBNTMDABPFM', 'CMP7K9D2M4Q8X', 'PVC Pipe 4 inch', 'PVC-Resin', 2.5000, 5, 0.125, 2.625, 8, 1.20, 0.12, 200, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1002, 'PRDTKAT6K4PGJ', 'CMP7K9D2M4Q8X', 'PVC Fitting Elbow', 'PVC-Compound', 0.8000, 8, 0.064, 0.864, 12, 0.80, 0.08, 300, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1003, 'PRDE8RQ343S1F', 'CMPN3R5T8W2ZA', 'Pressure Cooker Base', 'ADC-12', 35.0000, 12, 4.2000, 39.2000, 1, 8.00, 0.80, 60, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1004, 'PRDGQRDXTTCK8', 'CMPN3R5T8W2ZA', 'Cooker Handle', 'A380', 12.0000, 15, 1.8000, 13.8000, 6, 2.50, 0.25, 120, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1005, 'PRDX8VSJC9G72', 'CMP7K9D2M4Q8X', 'PVC Pipe 6 inch', 'PVC-Resin', 3.8000, 5, 0.190, 3.990, 6, 1.50, 0.15, 180, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1006, 'PRDAWHC88JT61', 'CMP7K9D2M4Q8X', 'PVC T-Joint', 'PVC-Compound', 1.2000, 7, 0.084, 1.284, 10, 0.90, 0.09, 250, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1007, 'PRDA3QCGFFQAA', 'CMP7K9D2M4Q8X', 'PVC Reducer', 'PVC-Resin', 1.5000, 6, 0.090, 1.590, 8, 1.00, 0.10, 220, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1008, 'PRD0EV2ENEH1C', 'CMP7K9D2M4Q8X', 'PVC End Cap', 'PVC-Compound', 0.6000, 8, 0.048, 0.648, 15, 0.70, 0.07, 320, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1009, 'PRD43D98EBJCT', 'CMP7K9D2M4Q8X', 'PVC Coupling', 'PVC-Resin', 0.9000, 7, 0.063, 0.963, 12, 0.85, 0.085, 280, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1010, 'PRD08JAW9QNK4', 'CMP7K9D2M4Q8X', 'PVC Valve', 'PVC-Compound', 2.2000, 9, 0.198, 2.398, 5, 1.30, 0.13, 160, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1011, 'PRD143CQB42AX', 'CMPN3R5T8W2ZA', 'Pressure Cooker Lid', 'ADC-12', 28.0000, 10, 2.800, 30.800, 1, 7.50, 0.75, 70, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1012, 'PRDBP8H5XTAQF', 'CMPN3R5T8W2ZA', 'Safety Valve', 'A380', 8.5000, 12, 1.020, 9.520, 8, 2.20, 0.22, 140, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1013, 'PRDNB05JNK148', 'CMPN3R5T8W2ZA', 'Gasket Ring', 'Silicone', 0.3000, 15, 0.045, 0.345, 20, 0.50, 0.05, 400, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1014, 'PRD1TJ14MD12G', 'CMPN3R5T8W2ZA', 'Pressure Indicator', 'Brass', 5.2000, 8, 0.416, 5.616, 6, 1.80, 0.18, 150, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1015, 'PRDWMGJHD80PX', 'CMPN3R5T8W2ZA', 'Handle Grip', 'Bakelite', 3.8000, 10, 0.380, 4.180, 10, 1.60, 0.16, 180, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1016, 'PRD6EJ1X8TS2D', 'CMP7K9D2M4Q8X', 'PVC Pipe 2 inch', 'PVC-Resin', 1.8000, 5, 0.090, 1.890, 10, 1.10, 0.11, 240, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1017, 'PRD378XM3ZC8M', 'CMP7K9D2M4Q8X', 'PVC Cross Joint', 'PVC-Compound', 1.6000, 7, 0.112, 1.712, 8, 1.05, 0.105, 200, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1018, 'PRDB2426DQ80G', 'CMP7K9D2M4Q8X', 'PVC Ball Valve', 'PVC-Resin', 3.2000, 8, 0.256, 3.456, 4, 1.70, 0.17, 140, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1019, 'PRDPH24RPMA4A', 'CMP7K9D2M4Q8X', 'PVC Union', 'PVC-Compound', 1.4000, 6, 0.084, 1.484, 9, 0.95, 0.095, 260, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1020, 'PRD3J6MM34B25', 'CMP7K9D2M4Q8X', 'PVC Flange', 'PVC-Resin', 2.8000, 7, 0.196, 2.996, 6, 1.40, 0.14, 170, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1021, 'PRDHKRXWEH29B', 'CMPN3R5T8W2ZA', 'Cooker Base Plate', 'Aluminum', 15.5000, 11, 1.705, 17.205, 2, 4.50, 0.45, 90, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1022, 'PRDQYEK086ND0', 'CMPN3R5T8W2ZA', 'Steam Vent', 'Stainless Steel', 2.8000, 9, 0.252, 3.052, 12, 1.45, 0.145, 200, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1023, 'PRDDAT61XJWC4', 'CMPN3R5T8W2ZA', 'Locking Mechanism', 'Steel', 6.8000, 13, 0.884, 7.684, 4, 2.80, 0.28, 110, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1024, 'PRDDSG73JMQ35', 'CMPN3R5T8W2ZA', 'Heat Distributor', 'Copper', 4.2000, 8, 0.336, 4.536, 8, 1.90, 0.19, 160, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1025, 'PRD1Q8G67FZR8', 'CMPN3R5T8W2ZA', 'Whistle Assembly', 'Brass', 1.8000, 12, 0.216, 2.016, 15, 1.20, 0.12, 250, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1026, 'PRD81PCDS0NMF', 'CMP7K9D2M4Q8X', 'PVC Pipe 8 inch', 'PVC-Resin', 5.2000, 6, 0.312, 5.512, 4, 2.10, 0.21, 120, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1027, 'PRD9KYWK951VC', 'CMP7K9D2M4Q8X', 'PVC Bend 45°', 'PVC-Compound', 1.8000, 8, 0.144, 1.944, 8, 1.15, 0.115, 210, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1028, 'PRD9WRZNKDD2N', 'CMP7K9D2M4Q8X', 'PVC Bend 90°', 'PVC-Compound', 2.1000, 8, 0.168, 2.268, 7, 1.25, 0.125, 190, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1029, 'PRDBH3698KS80', 'CMP7K9D2M4Q8X', 'PVC Adapter', 'PVC-Resin', 1.1000, 7, 0.077, 1.177, 11, 0.88, 0.088, 270, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1030, 'PRDRSPGVC1YKX', 'CMP7K9D2M4Q8X', 'PVC Plug', 'PVC-Compound', 0.4000, 9, 0.036, 0.436, 18, 0.60, 0.06, 350, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1031, 'PRDN1KRV0X6M6', 'CMPN3R5T8W2ZA', 'Cooker Inner Pot', 'Stainless Steel', 22.0000, 9, 1.980, 23.980, 1, 6.20, 0.62, 80, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1032, 'PRD77YTWXJV76', 'CMPN3R5T8W2ZA', 'Rubber Seal', 'Rubber', 0.8000, 15, 0.120, 0.920, 25, 0.75, 0.075, 300, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1033, 'PRD487F9ZB74N', 'CMPN3R5T8W2ZA', 'Pressure Release Valve', 'Brass', 3.5000, 10, 0.350, 3.850, 10, 1.75, 0.175, 170, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1034, 'PRDFC8F8Y27K8', 'CMPN3R5T8W2ZA', 'Handle Screw', 'Steel', 0.2000, 8, 0.016, 0.216, 50, 0.40, 0.04, 500, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1035, 'PRDYNAMGNRSNH', 'CMPN3R5T8W2ZA', 'Base Ring', 'Aluminum', 8.8000, 11, 0.968, 9.768, 3, 3.20, 0.32, 100, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1036, 'PRDV3Y3JC8YFR', 'CMP7K9D2M4Q8X', 'PVC Pipe 10 inch', 'PVC-Resin', 6.8000, 6, 0.408, 7.208, 3, 2.50, 0.25, 100, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1037, 'PRDDX5V59HVNX', 'CMP7K9D2M4Q8X', 'PVC Tee Reducer', 'PVC-Compound', 2.4000, 7, 0.168, 2.568, 6, 1.35, 0.135, 180, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1038, 'PRDFSP9VQW1DS', 'CMP7K9D2M4Q8X', 'PVC Check Valve', 'PVC-Resin', 4.2000, 9, 0.378, 4.578, 3, 1.95, 0.195, 130, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1039, 'PRDTHGJEG1AFR', 'CMP7K9D2M4Q8X', 'PVC Bushing', 'PVC-Compound', 0.7000, 8, 0.056, 0.756, 14, 0.78, 0.078, 290, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1040, 'PRDVEE2TZ45DY', 'CMP7K9D2M4Q8X', 'PVC Nipple', 'PVC-Resin', 0.5000, 7, 0.035, 0.535, 16, 0.65, 0.065, 330, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1041, 'PRD3V8QPKGWP3', 'CMPN3R5T8W2ZA', 'Cooker Trivet', 'Steel', 4.5000, 10, 0.450, 4.950, 8, 2.00, 0.20, 150, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1042, 'PRD523PQXYY2Z', 'CMPN3R5T8W2ZA', 'Lid Handle', 'Bakelite', 2.2000, 12, 0.264, 2.464, 12, 1.30, 0.13, 220, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1043, 'PRDQKS0WMSB8V', 'CMPN3R5T8W2ZA', 'Safety Lock', 'Steel', 5.8000, 11, 0.638, 6.438, 5, 2.40, 0.24, 120, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1044, 'PRDSZHRPDPWHS', 'CMPN3R5T8W2ZA', 'Vent Tube', 'Aluminum', 1.5000, 9, 0.135, 1.635, 18, 1.05, 0.105, 280, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1045, 'PRDKQ69ET47NA', 'CMPN3R5T8W2ZA', 'Bottom Plate', 'Stainless Steel', 18.2000, 8, 1.456, 19.656, 2, 5.50, 0.55, 85, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1046, 'PRD29AHJWCTWR', 'CMP7K9D2M4Q8X', 'PVC Pipe 12 inch', 'PVC-Resin', 8.5000, 6, 0.510, 9.010, 2, 3.00, 0.30, 80, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1047, 'PRDSNMB9VQV94', 'CMP7K9D2M4Q8X', 'PVC Wye Joint', 'PVC-Compound', 2.8000, 8, 0.224, 3.024, 5, 1.50, 0.15, 160, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1048, 'PRDRPDGA67EX7', 'CMP7K9D2M4Q8X', 'PVC Gate Valve', 'PVC-Resin', 5.5000, 9, 0.495, 5.995, 2, 2.30, 0.23, 110, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1049, 'PRD6B66MMSC7G', 'CMP7K9D2M4Q8X', 'PVC Elbow 45°', 'PVC-Compound', 1.3000, 7, 0.091, 1.391, 9, 0.92, 0.092, 250, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1050, 'PRDT2HRC21DCM', 'CMP7K9D2M4Q8X', 'PVC Socket', 'PVC-Resin', 0.8000, 8, 0.064, 0.864, 13, 0.80, 0.08, 300, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1051, 'PRDRRJAAYX3PN', 'CMPN3R5T8W2ZA', 'Pressure Gauge', 'Brass', 6.2000, 10, 0.620, 6.820, 4, 2.60, 0.26, 115, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1052, 'PRDG561X6AZTD', 'CMPN3R5T8W2ZA', 'Steam Pipe', 'Steel', 3.8000, 9, 0.342, 4.142, 9, 1.80, 0.18, 190, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1053, 'PRDW5EMYSAAKD', 'CMPN3R5T8W2ZA', 'Lid Gasket', 'Silicone', 0.6000, 15, 0.090, 0.690, 22, 0.68, 0.068, 320, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1054, 'PRD02H4NM29HQ', 'CMPN3R5T8W2ZA', 'Handle Base', 'Aluminum', 4.8000, 11, 0.528, 5.328, 7, 2.10, 0.21, 140, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1055, 'PRD3R8C73GE4M', 'CMPN3R5T8W2ZA', 'Cooker Feet', 'Rubber', 1.2000, 12, 0.144, 1.344, 16, 0.95, 0.095, 260, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1056, 'PRDYKY2J09T65', 'CMP7K9D2M4Q8X', 'PVC Pipe 1 inch', 'PVC-Resin', 1.2000, 5, 0.060, 1.260, 12, 0.85, 0.085, 280, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1057, 'PRDEG10VDVD4F', 'CMP7K9D2M4Q8X', 'PVC Street Elbow', 'PVC-Compound', 1.0000, 8, 0.080, 1.080, 11, 0.82, 0.082, 290, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1058, 'PRDYH60EZ49Q5', 'CMP7K9D2M4Q8X', 'PVC Threaded Cap', 'PVC-Resin', 0.3000, 9, 0.027, 0.327, 20, 0.55, 0.055, 360, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1059, 'PRD56GN296YXM', 'CMP7K9D2M4Q8X', 'PVC Compression Fitting', 'PVC-Compound', 1.8000, 7, 0.126, 1.926, 8, 1.12, 0.112, 220, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1060, 'PRD4XE52C8DTR', 'CMP7K9D2M4Q8X', 'PVC Expansion Joint', 'PVC-Resin', 3.5000, 8, 0.280, 3.780, 4, 1.80, 0.18, 140, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1061, 'PRDBPKFA1ASHB', 'CMPN3R5T8W2ZA', 'Cooker Rim', 'Stainless Steel', 12.5000, 9, 1.125, 13.625, 3, 4.20, 0.42, 95, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1062, 'PRD1MDHWPGCG4', 'CMPN3R5T8W2ZA', 'Weight Valve', 'Brass', 2.8000, 11, 0.308, 3.108, 11, 1.45, 0.145, 210, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1063, 'PRDQ9J8A1Z0D5', 'CMPN3R5T8W2ZA', 'Cooker Stand', 'Steel', 8.2000, 10, 0.820, 9.020, 4, 3.10, 0.31, 105, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1064, 'PRDW223SG1186', 'CMPN3R5T8W2ZA', 'Heat Shield', 'Aluminum', 3.2000, 8, 0.256, 3.456, 10, 1.70, 0.17, 180, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1065, 'PRDXA6RP25GS1', 'CMPN3R5T8W2ZA', 'Vent Cap', 'Plastic', 0.4000, 12, 0.048, 0.448, 30, 0.58, 0.058, 380, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1066, 'PRDZTX6TJKEDT', 'CMP7K9D2M4Q8X', 'PVC Pipe 3 inch', 'PVC-Resin', 2.2000, 5, 0.110, 2.310, 9, 1.25, 0.125, 200, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1067, 'PRD3D15QMJMHP', 'CMP7K9D2M4Q8X', 'PVC Saddle Tee', 'PVC-Compound', 2.0000, 7, 0.140, 2.140, 7, 1.20, 0.12, 210, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1068, 'PRD66FAQ1F8SA', 'CMP7K9D2M4Q8X', 'PVC Butterfly Valve', 'PVC-Resin', 6.8000, 9, 0.612, 7.412, 2, 2.80, 0.28, 90, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1069, 'PRD9F1YX176C6', 'CMP7K9D2M4Q8X', 'PVC Pipe Clamp', 'PVC-Compound', 0.9000, 8, 0.072, 0.972, 12, 0.85, 0.085, 280, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1070, 'PRD1K84ZW1ZD6', 'CMP7K9D2M4Q8X', 'PVC Drain Fitting', 'PVC-Resin', 1.6000, 7, 0.112, 1.712, 8, 1.05, 0.105, 240, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1071, 'PRDC8VYXPZ647', 'CMPN3R5T8W2ZA', 'Cooker Divider', 'Steel', 5.5000, 10, 0.550, 6.050, 6, 2.30, 0.23, 130, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1072, 'PRDJYP2E9M23B', 'CMPN3R5T8W2ZA', 'Steam Regulator', 'Brass', 4.2000, 11, 0.462, 4.662, 8, 2.00, 0.20, 160, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1073, 'PRDWP20KFE5CX', 'CMPN3R5T8W2ZA', 'Cooker Basket', 'Stainless Steel', 7.8000, 9, 0.702, 8.502, 5, 2.90, 0.29, 110, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1074, 'PRDZ2ADAE85F2', 'CMPN3R5T8W2ZA', 'Safety Pin', 'Steel', 0.8000, 8, 0.064, 0.864, 25, 0.75, 0.075, 320, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1075, 'PRDHCKKWWN38N', 'CMPN3R5T8W2ZA', 'Lid Lock', 'Aluminum', 2.5000, 10, 0.250, 2.750, 12, 1.40, 0.14, 200, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1076, 'PRDETT6NB3C2T', 'CMP7K9D2M4Q8X', 'PVC Pipe 5 inch', 'PVC-Resin', 4.2000, 6, 0.252, 4.452, 5, 1.90, 0.19, 150, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1077, 'PRDZ6RJK17XF0', 'CMP7K9D2M4Q8X', 'PVC Concentric Reducer', 'PVC-Compound', 1.7000, 7, 0.119, 1.819, 8, 1.08, 0.108, 230, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1078, 'PRD9SWHVA3169', 'CMP7K9D2M4Q8X', 'PVC Eccentric Reducer', 'PVC-Compound', 1.9000, 7, 0.133, 2.033, 7, 1.15, 0.115, 220, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1079, 'PRDTVMC3ZP754', 'CMP7K9D2M4Q8X', 'PVC Pipe Support', 'PVC-Resin', 1.1000, 8, 0.088, 1.188, 10, 0.90, 0.09, 270, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1080, 'PRDPYJET0CEHZ', 'CMP7K9D2M4Q8X', 'PVC Vent Fitting', 'PVC-Compound', 0.6000, 9, 0.054, 0.654, 15, 0.70, 0.07, 340, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1081, 'PRD554JX8C8VB', 'CMPN3R5T8W2ZA', 'Cooker Liner', 'Aluminum', 9.5000, 9, 0.855, 10.355, 4, 3.50, 0.35, 100, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1082, 'PRDW819D0E2B9', 'CMPN3R5T8W2ZA', 'Pressure Switch', 'Plastic', 1.8000, 12, 0.216, 2.016, 15, 1.20, 0.12, 250, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1083, 'PRDW62WATZ652', 'CMPN3R5T8W2ZA', 'Cooker Tray', 'Steel', 6.2000, 10, 0.620, 6.820, 5, 2.60, 0.26, 120, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1084, 'PRD1AFZ0APJS5', 'CMPN3R5T8W2ZA', 'Handle Spring', 'Steel', 0.3000, 8, 0.024, 0.324, 40, 0.52, 0.052, 450, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1085, 'PRD9GFNH20NWF', 'CMPN3R5T8W2ZA', 'Cooker Valve Seat', 'Brass', 1.5000, 11, 0.165, 1.665, 18, 1.05, 0.105, 280, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1086, 'PRDR3WWYK28T2', 'CMP7K9D2M4Q8X', 'PVC Pipe 7 inch', 'PVC-Resin', 5.8000, 6, 0.348, 6.148, 4, 2.40, 0.24, 125, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1087, 'PRD7A7P6V1AP5', 'CMP7K9D2M4Q8X', 'PVC Flexible Coupling', 'PVC-Compound', 2.5000, 8, 0.200, 2.700, 6, 1.40, 0.14, 170, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1088, 'PRD7JJ9E8KN6Y', 'CMP7K9D2M4Q8X', 'PVC Strainer', 'PVC-Resin', 3.8000, 9, 0.342, 4.142, 3, 1.85, 0.185, 135, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1089, 'PRDZ6EQJ826Y7', 'CMP7K9D2M4Q8X', 'PVC Pipe Hanger', 'PVC-Compound', 0.8000, 7, 0.056, 0.856, 13, 0.78, 0.078, 310, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1090, 'PRD392KTP8XQW', 'CMP7K9D2M4Q8X', 'PVC Test Cap', 'PVC-Resin', 0.4000, 8, 0.032, 0.432, 18, 0.60, 0.06, 350, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1091, 'PRDBJMYV1J1JR', 'CMPN3R5T8W2ZA', 'Cooker Insulation', 'Fiberglass', 2.2000, 15, 0.330, 2.530, 14, 1.30, 0.13, 230, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1092, 'PRD2D167794E1', 'CMPN3R5T8W2ZA', 'Steam Collector', 'Steel', 4.8000, 9, 0.432, 5.232, 7, 2.10, 0.21, 145, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1093, 'PRD7TWJKAPZAY', 'CMPN3R5T8W2ZA', 'Cooker Thermometer', 'Glass', 1.2000, 20, 0.240, 1.440, 20, 0.95, 0.095, 300, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1094, 'PRD975Z38E2CZ', 'CMPN3R5T8W2ZA', 'Handle Washer', 'Rubber', 0.1000, 10, 0.010, 0.110, 60, 0.35, 0.035, 600, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1),
(1095, 'PRD3HW7J7PT1C', 'CMPN3R5T8W2ZA', 'Cooker Timer', 'Plastic', 3.5000, 12, 0.420, 3.920, 9, 1.75, 0.175, 180, 'Sales', 'HSN', 18.00, NOW(), NOW(), 0, 1);


-- --------------------------------------------------------

--
-- Table structure for table `txn_production_shift`
--
--
-- Dumping data for table `txn_production_shift`
--

INSERT INTO `txn_production_shift` (`shift_seq`, `order_id`, `company_id`, `shift_id`, `product_id`, `machine_id`, `shift_start_date`, `shift_end_date`, `entry_type`, `shift_type`, `shift_hours`, `operator1`, `operator2`, `operator3`, `supervisor`, `opening_count`, `closing_count`, `production`, `rejection`, `net_production`, `incentive`, `less_80_reason`, `create_date`, `update_date`, `created_by`, `updated_by`, `is_deleted`, `is_active`) VALUES
(1001,	'FINO_OR_001',	'CMP7K9D2M4Q8X',	'FINO_SH_001',	'PRDBNTMDABPFM',	'MCH1DYMQJH9S4',	'2025-02-01 06:00:00',	'2025-02-01 14:00:00',	'1',	'1',	'8',	1000005,	1000006,	NULL,	1000002,	0,	400,	400,	20,	380,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1002,	'FINO_OR_001',	'CMP7K9D2M4Q8X',	'FINO_SH_002',	'PRDBNTMDABPFM',	'MCH1DYMQJH9S4',	'2025-02-01 14:00:00',	'2025-02-01 22:00:00',	'1',	'2',	'8',	1000007,	1000008,	NULL,	1000003,	400,	750,	350,	15,	335,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1003,	'PRES_OR_001',	'CMPN3R5T8W2ZA',	'PRES_SH_001',	'PRDE8RQ343S1F',	'MCHVJVWJG0RVD',	'2025-02-03 06:00:00',	'2025-02-03 14:00:00',	'1',	'1',	'8',	1000014,	1000015,	NULL,	1000013,	0,	80,	80,	5,	75,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1004,	'PRES_OR_002',	'CMPN3R5T8W2ZA',	'PRES_SH_002',	'PRDGQRDXTTCK8',	'MCHVJVWJG0RVD',	'2025-01-28 06:00:00',	'2025-01-28 14:00:00',	'1',	'1',	'8',	1000014,	1000016,	NULL,	1000013,	0,	400,	400,	25,	375,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1005,	'FINO_OR_003',	'CMP7K9D2M4Q8X',	'FINO_SH_003',	'PRDX8VSJC9G72',	'MCHTG1VT6HBNV',	'2025-02-08 06:00:00',	'2025-02-08 14:00:00',	'1',	'1',	'8',	1000017,	1000018,	NULL,	1000002,	0,	320,	320,	12,	308,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1006,	'FINO_OR_004',	'CMP7K9D2M4Q8X',	'FINO_SH_004',	'PRDAWHC88JT61',	'MCHMRG4MHHE96',	'2025-02-10 06:00:00',	'2025-02-10 14:00:00',	'1',	'1',	'8',	1000019,	1000020,	NULL,	1000003,	0,	600,	600,	25,	575,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1007,	'FINO_OR_005',	'CMP7K9D2M4Q8X',	'FINO_SH_005',	'PRDA3QCGFFQAA',	'MCHN8T8GVEYY5',	'2025-02-12 06:00:00',	'2025-02-12 14:00:00',	'1',	'1',	'8',	1000021,	1000022,	NULL,	1000004,	0,	480,	480,	18,	462,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1008,	'FINO_OR_006',	'CMP7K9D2M4Q8X',	'FINO_SH_006',	'PRD0EV2ENEH1C',	'MCHM7GCQ91P6R',	'2025-02-14 06:00:00',	'2025-02-14 14:00:00',	'1',	'1',	'8',	1000023,	1000024,	NULL,	1000005,	0,	800,	800,	30,	770,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1009,	'FINO_OR_007',	'CMP7K9D2M4Q8X',	'FINO_SH_007',	'PRD43D98EBJCT',	'MCHKXABMQZPFN',	'2025-02-16 06:00:00',	'2025-02-16 14:00:00',	'1',	'1',	'8',	1000025,	1000026,	NULL,	1000006,	0,	720,	720,	22,	698,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1010,	'FINO_OR_008',	'CMP7K9D2M4Q8X',	'FINO_SH_008',	'PRD08JAW9QNK4',	'MCH8XBKN392F0',	'2025-02-18 06:00:00',	'2025-02-18 14:00:00',	'1',	'1',	'8',	1000027,	1000028,	NULL,	1000007,	0,	240,	240,	15,	225,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1011,	'FINO_OR_009',	'CMP7K9D2M4Q8X',	'FINO_SH_009',	'PRD6EJ1X8TS2D',	'MCH8FDQBRS4GF',	'2025-02-20 06:00:00',	'2025-02-20 14:00:00',	'1',	'1',	'8',	1000005,	1000006,	NULL,	1000008,	0,	560,	560,	20,	540,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1012,	'FINO_OR_010',	'CMP7K9D2M4Q8X',	'FINO_SH_010',	'PRD378XM3ZC8M',	'MCH0B1CN5RD5D',	'2025-02-22 06:00:00',	'2025-02-22 14:00:00',	'1',	'1',	'8',	1000007,	1000008,	NULL,	1000009,	0,	400,	400,	16,	384,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1013,	'FINO_OR_011',	'CMP7K9D2M4Q8X',	'FINO_SH_011',	'PRDB2426DQ80G',	'MCH0Q47KJYAB6',	'2025-02-24 06:00:00',	'2025-02-24 14:00:00',	'1',	'1',	'8',	1000009,	1000010,	NULL,	1000010,	0,	160,	160,	8,	152,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1014,	'FINO_OR_012',	'CMP7K9D2M4Q8X',	'FINO_SH_012',	'PRDPH24RPMA4A',	'MCHTWRGQVVEBZ',	'2025-02-26 06:00:00',	'2025-02-26 14:00:00',	'1',	'1',	'8',	1000011,	1000012,	NULL,	1000011,	0,	640,	640,	24,	616,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1015,	'FINO_OR_013',	'CMP7K9D2M4Q8X',	'FINO_SH_013',	'PRD3J6MM34B25',	'MCHK8WAPF1E86',	'2025-02-28 06:00:00',	'2025-02-28 14:00:00',	'1',	'1',	'8',	1000013,	1000014,	NULL,	1000012,	0,	320,	320,	12,	308,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1016,	'FINO_OR_014',	'CMP7K9D2M4Q8X',	'FINO_SH_014',	'PRD81PCDS0NMF',	'MCH2CZTYNDPT8',	'2025-03-02 06:00:00',	'2025-03-02 14:00:00',	'1',	'1',	'8',	1000015,	1000016,	NULL,	1000013,	0,	120,	120,	6,	114,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1017,	'FINO_OR_015',	'CMP7K9D2M4Q8X',	'FINO_SH_015',	'PRD9KYWK951VC',	'MCHVFFSD7D6KB',	'2025-03-04 06:00:00',	'2025-03-04 14:00:00',	'1',	'1',	'8',	1000017,	1000018,	NULL,	1000014,	0,	480,	480,	18,	462,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1018,	'FINO_OR_016',	'CMP7K9D2M4Q8X',	'FINO_SH_016',	'PRD9WRZNKDD2N',	'MCHNR54BG7WYT',	'2025-03-06 06:00:00',	'2025-03-06 14:00:00',	'1',	'1',	'8',	1000019,	1000020,	NULL,	1000015,	0,	400,	400,	15,	385,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1019,	'FINO_OR_017',	'CMP7K9D2M4Q8X',	'FINO_SH_017',	'PRDBH3698KS80',	'MCH1DYMQJH9S4',	'2025-03-08 06:00:00',	'2025-03-08 14:00:00',	'1',	'1',	'8',	1000021,	1000022,	NULL,	1000016,	0,	720,	720,	28,	692,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1020,	'FINO_OR_018',	'CMP7K9D2M4Q8X',	'FINO_SH_018',	'PRDRSPGVC1YKX',	'MCHZHDVPRF2JD',	'2025-03-10 06:00:00',	'2025-03-10 14:00:00',	'1',	'1',	'8',	1000023,	1000024,	NULL,	1000017,	0,	1000,	1000,	40,	960,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1021,	'PRES_OR_003',	'CMPN3R5T8W2ZA',	'PRES_SH_003',	'PRD143CQB42AX',	'MCHDNCP7JKKZP',	'2025-02-08 06:00:00',	'2025-02-08 14:00:00',	'1',	'1',	'8',	1000029,	1000030,	NULL,	1000013,	0,	60,	60,	3,	57,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1022,	'PRES_OR_004',	'CMPN3R5T8W2ZA',	'PRES_SH_004',	'PRDBP8H5XTAQF',	'MCH77AZA1WWJD',	'2025-02-10 06:00:00',	'2025-02-10 14:00:00',	'1',	'1',	'8',	1000031,	1000032,	NULL,	1000014,	0,	240,	240,	12,	228,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1023,	'PRES_OR_005',	'CMPN3R5T8W2ZA',	'PRES_SH_005',	'PRDNB05JNK148',	'MCHC0N30R1C4J',	'2025-02-12 06:00:00',	'2025-02-12 14:00:00',	'1',	'1',	'8',	1000033,	1000034,	NULL,	1000015,	0,	800,	800,	35,	765,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1024,	'PRES_OR_006',	'CMPN3R5T8W2ZA',	'PRES_SH_006',	'PRD1TJ14MD12G',	'MCHSQKTXKSGHK',	'2025-02-14 06:00:00',	'2025-02-14 14:00:00',	'1',	'1',	'8',	1000035,	1000036,	NULL,	1000016,	0,	160,	160,	8,	152,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1025,	'PRES_OR_007',	'CMPN3R5T8W2ZA',	'PRES_SH_007',	'PRDWMGJHD80PX',	'MCHCHH2QB0CCA',	'2025-02-16 06:00:00',	'2025-02-16 14:00:00',	'1',	'1',	'8',	1000037,	1000014,	NULL,	1000017,	0,	320,	320,	15,	305,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1026,	'PRES_OR_008',	'CMPN3R5T8W2ZA',	'PRES_SH_008',	'PRDHKRXWEH29B',	'MCHCVZ9T0WEEQ',	'2025-02-18 06:00:00',	'2025-02-18 14:00:00',	'1',	'1',	'8',	1000015,	1000016,	NULL,	1000018,	0,	48,	48,	2,	46,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1027,	'PRES_OR_009',	'CMPN3R5T8W2ZA',	'PRES_SH_009',	'PRDQYEK086ND0',	'MCHX3XBGWK9BE',	'2025-02-20 06:00:00',	'2025-02-20 14:00:00',	'1',	'1',	'8',	1000017,	1000018,	NULL,	1000019,	0,	200,	200,	10,	190,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1028,	'PRES_OR_010',	'CMPN3R5T8W2ZA',	'PRES_SH_010',	'PRDDAT61XJWC4',	'MCHYGK3XCK9TK',	'2025-02-22 06:00:00',	'2025-02-22 14:00:00',	'1',	'1',	'8',	1000019,	1000020,	NULL,	1000020,	0,	120,	120,	6,	114,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1029,	'PRES_OR_011',	'CMPN3R5T8W2ZA',	'PRES_SH_011',	'PRDDSG73JMQ35',	'MCHJR4SDY71F7',	'2025-02-24 06:00:00',	'2025-02-24 14:00:00',	'1',	'1',	'8',	1000021,	1000022,	NULL,	1000021,	0,	240,	240,	12,	228,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1030,	'PRES_OR_012',	'CMPN3R5T8W2ZA',	'PRES_SH_012',	'PRD1Q8G67FZR8',	'MCH78R0M4V8C4',	'2025-02-26 06:00:00',	'2025-02-26 14:00:00',	'1',	'1',	'8',	1000023,	1000024,	NULL,	1000022,	0,	400,	400,	18,	382,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1031,	'PRES_OR_013',	'CMPN3R5T8W2ZA',	'PRES_SH_013',	'PRDN1KRV0X6M6',	'MCHKDXYEKJQSB',	'2025-02-28 06:00:00',	'2025-02-28 14:00:00',	'1',	'1',	'8',	1000025,	1000026,	NULL,	1000023,	0,	32,	32,	2,	30,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1032,	'PRES_OR_014',	'CMPN3R5T8W2ZA',	'PRES_SH_014',	'PRD77YTWXJV76',	'MCHVJVWJG0RVD',	'2025-03-02 06:00:00',	'2025-03-02 14:00:00',	'1',	'1',	'8',	1000027,	1000028,	NULL,	1000024,	0,	600,	600,	25,	575,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1033,	'PRES_OR_015',	'CMPN3R5T8W2ZA',	'PRES_SH_015',	'PRD487F9ZB74N',	'MCHXAE6JWB135',	'2025-03-04 06:00:00',	'2025-03-04 14:00:00',	'1',	'1',	'8',	1000029,	1000030,	NULL,	1000025,	0,	160,	160,	8,	152,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1034,	'PRES_OR_016',	'CMPN3R5T8W2ZA',	'PRES_SH_016',	'PRDFC8F8Y27K8',	'MCHF0ZS2VEYZ5',	'2025-03-06 06:00:00',	'2025-03-06 14:00:00',	'1',	'1',	'8',	1000031,	1000032,	NULL,	1000026,	0,	1200,	1200,	50,	1150,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1035,	'PRES_OR_017',	'CMPN3R5T8W2ZA',	'PRES_SH_017',	'PRDYNAMGNRSNH',	'MCHNE64XVHHRX',	'2025-03-08 06:00:00',	'2025-03-08 14:00:00',	'1',	'1',	'8',	1000033,	1000034,	NULL,	1000027,	0,	80,	80,	4,	76,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1036,	'PRES_OR_018',	'CMPN3R5T8W2ZA',	'PRES_SH_018',	'PRD3V8QPKGWP3',	'MCHQEDSHNXZ1X',	'2025-03-10 06:00:00',	'2025-03-10 14:00:00',	'1',	'1',	'8',	1000035,	1000036,	NULL,	1000028,	0,	140,	140,	7,	133,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1),
(1037,	'PRES_OR_019',	'CMPN3R5T8W2ZA',	'PRES_SH_019',	'PRD523PQXYY2Z',	'MCH78R0M4V8C4',	'2025-03-12 06:00:00',	'2025-03-12 14:00:00',	'1',	'1',	'8',	1000037,	1000012,	NULL,	1000029,	0,	320,	320,	15,	305,	'Y',	'',	'2026-02-08 12:49:45',	'2026-02-08 12:50:08',	NULL,	NULL,	0,	1);
-- --------------------------------------------------------

--
-- Table structure for table `mst_seller`
--

--
-- Dumping data for table `mst_seller`
--

INSERT INTO `mst_seller` (`seller_seq`, `seller_id`, `company_id`, `seller_name`, `seller_address`, `seller_phone`, `seller_email`, `create_date`, `update_date`, `is_deleted`, `is_active`) VALUES
(1001, 'FINO_SL_001', 'CMP7K9D2M4Q8X', 'PVC Resin Suppliers Pvt Ltd', 'Coimbatore, Tamil Nadu', '9876543220', 'sales@pvcresin.com', NOW(), NOW(), 0, 1),
(1002, 'FINO_SL_002', 'CMP7K9D2M4Q8X', 'Polymer Trading Corporation', 'Hyderabad, Telangana', '9876543221', 'info@polytrading.com', NOW(), NOW(), 0, 1),
(1003, 'PRES_SL_001', 'CMPN3R5T8W2ZA', 'Aluminum Alloy Hub', 'Pune, Maharashtra', '9876543222', 'sales@aluhub.com', NOW(), NOW(), 0, 1),
(1004, 'PRES_SL_002', 'CMPN3R5T8W2ZA', 'Die Cast Metals Supplier', 'Ahmedabad, Gujarat', '9876543223', 'orders@diecastmetals.com', NOW(), NOW(), 0, 1),
(1005, 'FINO_SL_003', 'CMP7K9D2M4Q8X', 'Chemical Compounds Ltd', 'Mumbai, Maharashtra', '9876543248', 'sales@chemcomp.com', NOW(), NOW(), 0, 1),
(1006, 'FINO_SL_004', 'CMP7K9D2M4Q8X', 'Plastic Raw Materials Co', 'Delhi, NCR', '9876543249', 'info@plasticraw.com', NOW(), NOW(), 0, 1),
(1007, 'FINO_SL_005', 'CMP7K9D2M4Q8X', 'Polymer Solutions Pvt Ltd', 'Pune, Maharashtra', '9876543250', 'sales@polysol.com', NOW(), NOW(), 0, 1),
(1008, 'FINO_SL_006', 'CMP7K9D2M4Q8X', 'PVC Compound Suppliers', 'Ahmedabad, Gujarat', '9876543251', 'orders@pvccomp.com', NOW(), NOW(), 0, 1),
(1009, 'FINO_SL_007', 'CMP7K9D2M4Q8X', 'Resin Trading Corporation', 'Surat, Gujarat', '9876543252', 'info@resintrading.com', NOW(), NOW(), 0, 1),
(1010, 'FINO_SL_008', 'CMP7K9D2M4Q8X', 'Chemical Raw Materials Hub', 'Vadodara, Gujarat', '9876543253', 'sales@chemraw.com', NOW(), NOW(), 0, 1),
(1011, 'FINO_SL_009', 'CMP7K9D2M4Q8X', 'Plastic Additives Co', 'Rajkot, Gujarat', '9876543254', 'orders@plasticadd.com', NOW(), NOW(), 0, 1),
(1012, 'FINO_SL_010', 'CMP7K9D2M4Q8X', 'PVC Resin Distributors', 'Jaipur, Rajasthan', '9876543255', 'info@pvcresindist.com', NOW(), NOW(), 0, 1),
(1013, 'FINO_SL_011', 'CMP7K9D2M4Q8X', 'Polymer Raw Materials Ltd', 'Indore, Madhya Pradesh', '9876543256', 'sales@polyraw.com', NOW(), NOW(), 0, 1),
(1014, 'FINO_SL_012', 'CMP7K9D2M4Q8X', 'Chemical Supply Chain Co', 'Bhopal, Madhya Pradesh', '9876543257', 'orders@chemsupply.com', NOW(), NOW(), 0, 1),
(1015, 'FINO_SL_013', 'CMP7K9D2M4Q8X', 'Plastic Compounds Hub', 'Nagpur, Maharashtra', '9876543258', 'info@plasticcomphub.com', NOW(), NOW(), 0, 1),
(1016, 'FINO_SL_014', 'CMP7K9D2M4Q8X', 'Resin Suppliers Network', 'Aurangabad, Maharashtra', '9876543259', 'sales@resinsupnet.com', NOW(), NOW(), 0, 1),
(1017, 'FINO_SL_015', 'CMP7K9D2M4Q8X', 'PVC Materials Trading', 'Nashik, Maharashtra', '9876543260', 'orders@pvcmat.com', NOW(), NOW(), 0, 1),
(1018, 'FINO_SL_016', 'CMP7K9D2M4Q8X', 'Chemical Distributors Co', 'Solapur, Maharashtra', '9876543261', 'info@chemdist.com', NOW(), NOW(), 0, 1),
(1019, 'FINO_SL_017', 'CMP7K9D2M4Q8X', 'Polymer Trading Hub', 'Kolhapur, Maharashtra', '9876543262', 'sales@polytradehub.com', NOW(), NOW(), 0, 1),
(1020, 'FINO_SL_018', 'CMP7K9D2M4Q8X', 'Plastic Raw Materials Network', 'Sangli, Maharashtra', '9876543263', 'orders@plasticrawnet.com', NOW(), NOW(), 0, 1),
(1021, 'PRES_SL_003', 'CMPN3R5T8W2ZA', 'Aluminum Casting Materials', 'Bangalore, Karnataka', '9876543264', 'sales@alucast.com', NOW(), NOW(), 0, 1),
(1022, 'PRES_SL_004', 'CMPN3R5T8W2ZA', 'Die Cast Alloys Pvt Ltd', 'Chennai, Tamil Nadu', '9876543265', 'info@diecastalloys.com', NOW(), NOW(), 0, 1),
(1023, 'PRES_SL_005', 'CMPN3R5T8W2ZA', 'Metal Alloy Suppliers', 'Hyderabad, Telangana', '9876543266', 'sales@metalalloy.com', NOW(), NOW(), 0, 1),
(1024, 'PRES_SL_006', 'CMPN3R5T8W2ZA', 'Aluminum Raw Materials Co', 'Coimbatore, Tamil Nadu', '9876543267', 'orders@aluraw.com', NOW(), NOW(), 0, 1),
(1025, 'PRES_SL_007', 'CMPN3R5T8W2ZA', 'Casting Alloys Hub', 'Kochi, Kerala', '9876543268', 'info@castalloyhub.com', NOW(), NOW(), 0, 1),
(1026, 'PRES_SL_008', 'CMPN3R5T8W2ZA', 'Metal Suppliers Network', 'Thiruvananthapuram, Kerala', '9876543269', 'sales@metalsupnet.com', NOW(), NOW(), 0, 1),
(1027, 'PRES_SL_009', 'CMPN3R5T8W2ZA', 'Aluminum Alloy Trading', 'Madurai, Tamil Nadu', '9876543270', 'orders@alutrade.com', NOW(), NOW(), 0, 1),
(1028, 'PRES_SL_010', 'CMPN3R5T8W2ZA', 'Die Casting Materials Ltd', 'Tiruchirappalli, Tamil Nadu', '9876543271', 'info@diecastmat.com', NOW(), NOW(), 0, 1),
(1029, 'PRES_SL_011', 'CMPN3R5T8W2ZA', 'Alloy Distributors Co', 'Salem, Tamil Nadu', '9876543272', 'sales@alloydist.com', NOW(), NOW(), 0, 1),
(1030, 'PRES_SL_012', 'CMPN3R5T8W2ZA', 'Metal Raw Materials Hub', 'Erode, Tamil Nadu', '9876543273', 'orders@metalrawhub.com', NOW(), NOW(), 0, 1),
(1031, 'PRES_SL_013', 'CMPN3R5T8W2ZA', 'Aluminum Supply Chain', 'Vellore, Tamil Nadu', '9876543274', 'info@alusupchain.com', NOW(), NOW(), 0, 1),
(1032, 'PRES_SL_014', 'CMPN3R5T8W2ZA', 'Casting Alloys Network', 'Tirunelveli, Tamil Nadu', '9876543275', 'sales@castalloynet.com', NOW(), NOW(), 0, 1),
(1033, 'PRES_SL_015', 'CMPN3R5T8W2ZA', 'Metal Alloy Hub', 'Thanjavur, Tamil Nadu', '9876543276', 'orders@metalalloyhub.com', NOW(), NOW(), 0, 1),
(1034, 'PRES_SL_016', 'CMPN3R5T8W2ZA', 'Aluminum Materials Co', 'Dindigul, Tamil Nadu', '9876543277', 'info@alumat.com', NOW(), NOW(), 0, 1),
(1035, 'PRES_SL_017', 'CMPN3R5T8W2ZA', 'Die Cast Supply Network', 'Karur, Tamil Nadu', '9876543278', 'sales@diecastsupnet.com', NOW(), NOW(), 0, 1),
(1036, 'PRES_SL_018', 'CMPN3R5T8W2ZA', 'Alloy Raw Materials Ltd', 'Namakkal, Tamil Nadu', '9876543279', 'orders@alloyraw.com', NOW(), NOW(), 0, 1),
(1037, 'PRES_SL_019', 'CMPN3R5T8W2ZA', 'Metal Casting Suppliers', 'Cuddalore, Tamil Nadu', '9876543280', 'info@metalcastsup.com', NOW(), NOW(), 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `txn_stock`
--

--
-- Dumping data for table `txn_stock`
--

INSERT INTO `txn_stock` (`stock_seq`, `company_id`, `seller_id`, `stock_id`, `stock_date`, `raw_material`, `no_of_bars`, `weight`, `create_date`, `update_date`, `is_deleted`, `is_active`) VALUES
(1001, 'CMP7K9D2M4Q8X', 'FINO_SL_001', 'FINO_ST_001', '2025-01-15 00:00:00', 'PVC Resin Grade S-65', 100, 5000.0000, NOW(), NOW(), 0, 1),
(1002, 'CMP7K9D2M4Q8X', 'FINO_SL_002', 'FINO_ST_002', '2025-01-20 00:00:00', 'PVC Compound K-67', 80, 4000.0000, NOW(), NOW(), 0, 1),
(1003, 'CMPN3R5T8W2ZA', 'PRES_SL_001', 'PRES_ST_001', '2025-01-18 00:00:00', 'Aluminum Alloy ADC-12', 40, 2000.0000, NOW(), NOW(), 0, 1),
(1004, 'CMPN3R5T8W2ZA', 'PRES_SL_002', 'PRES_ST_002', '2025-01-25 00:00:00', 'Aluminum Alloy A380', 35, 2100.0000, NOW(), NOW(), 0, 1),
(1005, 'CMP7K9D2M4Q8X', 'FINO_SL_003', 'FINO_ST_003', '2025-01-22 00:00:00', 'PVC Resin Grade S-70', 90, 4500.0000, NOW(), NOW(), 0, 1),
(1006, 'CMP7K9D2M4Q8X', 'FINO_SL_004', 'FINO_ST_004', '2025-01-24 00:00:00', 'PVC Compound K-70', 85, 4250.0000, NOW(), NOW(), 0, 1),
(1007, 'CMP7K9D2M4Q8X', 'FINO_SL_005', 'FINO_ST_005', '2025-01-26 00:00:00', 'PVC Resin Grade S-75', 95, 4750.0000, NOW(), NOW(), 0, 1),
(1008, 'CMP7K9D2M4Q8X', 'FINO_SL_006', 'FINO_ST_006', '2025-01-28 00:00:00', 'PVC Compound K-75', 88, 4400.0000, NOW(), NOW(), 0, 1),
(1009, 'CMP7K9D2M4Q8X', 'FINO_SL_007', 'FINO_ST_007', '2025-01-30 00:00:00', 'PVC Resin Grade S-80', 92, 4600.0000, NOW(), NOW(), 0, 1),
(1010, 'CMP7K9D2M4Q8X', 'FINO_SL_008', 'FINO_ST_008', '2025-02-01 00:00:00', 'PVC Compound K-80', 87, 4350.0000, NOW(), NOW(), 0, 1),
(1011, 'CMP7K9D2M4Q8X', 'FINO_SL_009', 'FINO_ST_009', '2025-02-03 00:00:00', 'PVC Resin Grade S-85', 93, 4650.0000, NOW(), NOW(), 0, 1),
(1012, 'CMP7K9D2M4Q8X', 'FINO_SL_010', 'FINO_ST_010', '2025-02-05 00:00:00', 'PVC Compound K-85', 89, 4450.0000, NOW(), NOW(), 0, 1),
(1013, 'CMP7K9D2M4Q8X', 'FINO_SL_011', 'FINO_ST_011', '2025-02-07 00:00:00', 'PVC Resin Grade S-90', 91, 4550.0000, NOW(), NOW(), 0, 1),
(1014, 'CMP7K9D2M4Q8X', 'FINO_SL_012', 'FINO_ST_012', '2025-02-09 00:00:00', 'PVC Compound K-90', 86, 4300.0000, NOW(), NOW(), 0, 1),
(1015, 'CMP7K9D2M4Q8X', 'FINO_SL_013', 'FINO_ST_013', '2025-02-11 00:00:00', 'PVC Resin Grade S-95', 94, 4700.0000, NOW(), NOW(), 0, 1),
(1016, 'CMP7K9D2M4Q8X', 'FINO_SL_014', 'FINO_ST_014', '2025-02-13 00:00:00', 'PVC Compound K-95', 90, 4500.0000, NOW(), NOW(), 0, 1),
(1017, 'CMP7K9D2M4Q8X', 'FINO_SL_015', 'FINO_ST_015', '2025-02-15 00:00:00', 'PVC Resin Grade S-100', 96, 4800.0000, NOW(), NOW(), 0, 1),
(1018, 'CMP7K9D2M4Q8X', 'FINO_SL_016', 'FINO_ST_016', '2025-02-17 00:00:00', 'PVC Compound K-100', 84, 4200.0000, NOW(), NOW(), 0, 1),
(1019, 'CMP7K9D2M4Q8X', 'FINO_SL_017', 'FINO_ST_017', '2025-02-19 00:00:00', 'PVC Resin Grade S-105', 97, 4850.0000, NOW(), NOW(), 0, 1),
(1020, 'CMP7K9D2M4Q8X', 'FINO_SL_018', 'FINO_ST_018', '2025-02-21 00:00:00', 'PVC Compound K-105', 83, 4150.0000, NOW(), NOW(), 0, 1),
(1021, 'CMPN3R5T8W2ZA', 'PRES_SL_003', 'PRES_ST_003', '2025-01-22 00:00:00', 'Aluminum Alloy ADC-10', 38, 1900.0000, NOW(), NOW(), 0, 1),
(1022, 'CMPN3R5T8W2ZA', 'PRES_SL_004', 'PRES_ST_004', '2025-01-24 00:00:00', 'Aluminum Alloy A356', 42, 2100.0000, NOW(), NOW(), 0, 1),
(1023, 'CMPN3R5T8W2ZA', 'PRES_SL_005', 'PRES_ST_005', '2025-01-26 00:00:00', 'Aluminum Alloy ADC-14', 36, 1800.0000, NOW(), NOW(), 0, 1),
(1024, 'CMPN3R5T8W2ZA', 'PRES_SL_006', 'PRES_ST_006', '2025-01-28 00:00:00', 'Aluminum Alloy A383', 44, 2200.0000, NOW(), NOW(), 0, 1),
(1025, 'CMPN3R5T8W2ZA', 'PRES_SL_007', 'PRES_ST_007', '2025-01-30 00:00:00', 'Aluminum Alloy ADC-1', 39, 1950.0000, NOW(), NOW(), 0, 1),
(1026, 'CMPN3R5T8W2ZA', 'PRES_SL_008', 'PRES_ST_008', '2025-02-01 00:00:00', 'Aluminum Alloy A384', 41, 2050.0000, NOW(), NOW(), 0, 1),
(1027, 'CMPN3R5T8W2ZA', 'PRES_SL_009', 'PRES_ST_009', '2025-02-03 00:00:00', 'Aluminum Alloy ADC-3', 37, 1850.0000, NOW(), NOW(), 0, 1),
(1028, 'CMPN3R5T8W2ZA', 'PRES_SL_010', 'PRES_ST_010', '2025-02-05 00:00:00', 'Aluminum Alloy A390', 43, 2150.0000, NOW(), NOW(), 0, 1),
(1029, 'CMPN3R5T8W2ZA', 'PRES_SL_011', 'PRES_ST_011', '2025-02-07 00:00:00', 'Aluminum Alloy ADC-5', 40, 2000.0000, NOW(), NOW(), 0, 1),
(1030, 'CMPN3R5T8W2ZA', 'PRES_SL_012', 'PRES_ST_012', '2025-02-09 00:00:00', 'Aluminum Alloy A413', 45, 2250.0000, NOW(), NOW(), 0, 1),
(1031, 'CMPN3R5T8W2ZA', 'PRES_SL_013', 'PRES_ST_013', '2025-02-11 00:00:00', 'Aluminum Alloy ADC-6', 38, 1900.0000, NOW(), NOW(), 0, 1),
(1032, 'CMPN3R5T8W2ZA', 'PRES_SL_014', 'PRES_ST_014', '2025-02-13 00:00:00', 'Aluminum Alloy A518', 46, 2300.0000, NOW(), NOW(), 0, 1),
(1033, 'CMPN3R5T8W2ZA', 'PRES_SL_015', 'PRES_ST_015', '2025-02-15 00:00:00', 'Aluminum Alloy ADC-8', 39, 1950.0000, NOW(), NOW(), 0, 1),
(1034, 'CMPN3R5T8W2ZA', 'PRES_SL_016', 'PRES_ST_016', '2025-02-17 00:00:00', 'Aluminum Alloy A535', 47, 2350.0000, NOW(), NOW(), 0, 1),
(1035, 'CMPN3R5T8W2ZA', 'PRES_SL_017', 'PRES_ST_017', '2025-02-19 00:00:00', 'Aluminum Alloy ADC-9', 41, 2050.0000, NOW(), NOW(), 0, 1),
(1036, 'CMPN3R5T8W2ZA', 'PRES_SL_018', 'PRES_ST_018', '2025-02-21 00:00:00', 'Aluminum Alloy A712', 48, 2400.0000, NOW(), NOW(), 0, 1),
(1037, 'CMPN3R5T8W2ZA', 'PRES_SL_019', 'PRES_ST_019', '2025-02-23 00:00:00', 'Aluminum Alloy ADC-11', 42, 2100.0000, NOW(), NOW(), 0, 1);

--
-- Table structure for table `txn_invoice`
--

--
-- Dumping data for table `txn_invoice`
--

INSERT INTO `txn_invoice` (`invoice_seq`, `invoice_id`, `invoice_date`, `company_id`, `buyer_id`, `product_id`, `quantity`, `unit_price`, `cgst_rate`, `cgst_amount`, `sgst_rate`, `sgst_amount`, `total_amount`, `sac_code`, `buyr_gstin`, `create_date`, `update_date`, `is_deleted`, `is_active`) VALUES
(1001, 'IN10000001', '2025-02-15 00:00:00', 'CMP7K9D2M4Q8X', 'FINO_BY_001', 'PRDBNTMDABPFM', 500, 25.00, 9.00, 1125.00, 9.00, 1125.00, 14750.00, 'SAC998314', '33AABCA1234A1Z5', NOW(), NOW(), 0, 1),
(1002, 'IN10000002', '2025-02-20 00:00:00', 'CMP7K9D2M4Q8X', 'FINO_BY_002', 'PRDTKAT6K4PGJ', 1000, 8.50, 9.00, 765.00, 9.00, 765.00, 10030.00, 'SAC998314', '29AABCA1234B1Z5', NOW(), NOW(), 0, 1),
(1003, 'IN10000003', '2025-02-18 00:00:00', 'CMPN3R5T8W2ZA', 'PRES_BY_001', 'PRDE8RQ343S1F', 100, 120.00, 9.00, 1080.00, 9.00, 1080.00, 14160.00, 'SAC998313', '27AABCA1234C1Z5', NOW(), NOW(), 0, 1),
(1004, 'IN10000004', '2025-02-10 00:00:00', 'CMPN3R5T8W2ZA', 'PRES_BY_002', 'PRDGQRDXTTCK8', 400, 35.00, 9.00, 1260.00, 9.00, 1260.00, 16520.00, 'SAC998313', '07AABCA1234D1Z5', NOW(), NOW(), 0, 1),
(1005, 'IN10000005', '2025-02-25 00:00:00', 'CMP7K9D2M4Q8X', 'FINO_BY_003', 'PRDX8VSJC9G72', 800, 30.00, 9.00, 2160.00, 9.00, 2160.00, 28320.00, 'SAC998314', '27AABCA1234E1Z5', NOW(), NOW(), 0, 1),
(1006, 'IN10000006', '2025-02-28 00:00:00', 'CMP7K9D2M4Q8X', 'FINO_BY_004', 'PRDAWHC88JT61', 1500, 12.00, 9.00, 1620.00, 9.00, 1620.00, 21240.00, 'SAC998314', '36AABCA1234F1Z5', NOW(), NOW(), 0, 1),
(1007, 'IN10000007', '2025-03-02 00:00:00', 'CMP7K9D2M4Q8X', 'FINO_BY_005', 'PRDA3QCGFFQAA', 1200, 15.00, 9.00, 1620.00, 9.00, 1620.00, 21240.00, 'SAC998314', '33AABCA1234G1Z5', NOW(), NOW(), 0, 1),
(1008, 'IN10000008', '2025-03-05 00:00:00', 'CMP7K9D2M4Q8X', 'FINO_BY_006', 'PRD0EV2ENEH1C', 2000, 8.00, 9.00, 1440.00, 9.00, 1440.00, 18880.00, 'SAC998314', '32AABCA1234H1Z5', NOW(), NOW(), 0, 1),
(1009, 'IN10000009', '2025-03-08 00:00:00', 'CMP7K9D2M4Q8X', 'FINO_BY_007', 'PRD43D98EBJCT', 1800, 10.50, 9.00, 1701.00, 9.00, 1701.00, 22302.00, 'SAC998314', '24AABCA1234I1Z5', NOW(), NOW(), 0, 1),
(1010, 'IN10000010', '2025-03-10 00:00:00', 'CMP7K9D2M4Q8X', 'FINO_BY_008', 'PRD08JAW9QNK4', 600, 28.00, 9.00, 1512.00, 9.00, 1512.00, 19824.00, 'SAC998314', '08AABCA1234J1Z5', NOW(), NOW(), 0, 1),
(1011, 'IN10000011', '2025-03-12 00:00:00', 'CMP7K9D2M4Q8X', 'FINO_BY_009', 'PRD9WRZNKDD2N', 1400, 18.00, 9.00, 2268.00, 9.00, 2268.00, 29736.00, 'SAC998314', '09AABCA1234K1Z5', NOW(), NOW(), 0, 1),
(1012, 'IN10000012', '2025-03-15 00:00:00', 'CMP7K9D2M4Q8X', 'FINO_BY_010', 'PRDBH3698KS80', 1000, 20.00, 9.00, 1800.00, 9.00, 1800.00, 23600.00, 'SAC998314', '23AABCA1234L1Z5', NOW(), NOW(), 0, 1),
(1013, 'IN10000013', '2025-03-18 00:00:00', 'CMP7K9D2M4Q8X', 'FINO_BY_011', 'PRDRSPGVC1YKX', 400, 45.00, 9.00, 1620.00, 9.00, 1620.00, 21240.00, 'SAC998314', '03AABCA1234M1Z5', NOW(), NOW(), 0, 1),
(1014, 'IN10000014', '2025-03-20 00:00:00', 'CMP7K9D2M4Q8X', 'FINO_BY_012', 'PRDV3Y3JC8YFR', 1600, 14.00, 9.00, 2016.00, 9.00, 2016.00, 26432.00, 'SAC998314', '10AABCA1234N1Z5', NOW(), NOW(), 0, 1),
(1015, 'IN10000015', '2025-03-22 00:00:00', 'CMP7K9D2M4Q8X', 'FINO_BY_013', 'PRDDX5V59HVNX', 800, 35.00, 9.00, 2520.00, 9.00, 2520.00, 33040.00, 'SAC998314', '18AABCA1234O1Z5', NOW(), NOW(), 0, 1),
(1016, 'IN10000016', '2025-03-25 00:00:00', 'CMP7K9D2M4Q8X', 'FINO_BY_014', 'PRDRPDGA67EX7', 300, 65.00, 9.00, 1755.00, 9.00, 1755.00, 23010.00, 'SAC998314', '20AABCA1234P1Z5', NOW(), NOW(), 0, 1),
(1017, 'IN10000017', '2025-03-28 00:00:00', 'CMP7K9D2M4Q8X', 'FINO_BY_015', 'PRD6B66MMSC7G', 1200, 22.00, 9.00, 2376.00, 9.00, 2376.00, 31152.00, 'SAC998314', '22AABCA1234Q1Z5', NOW(), NOW(), 0, 1),
(1018, 'IN10000018', '2025-03-30 00:00:00', 'CMP7K9D2M4Q8X', 'FINO_BY_016', 'PRDT2HRC21DCM', 1000, 25.00, 9.00, 2250.00, 9.00, 2250.00, 29500.00, 'SAC998314', '05AABCA1234R1Z5', NOW(), NOW(), 0, 1),
(1019, 'IN10000019', '2025-04-02 00:00:00', 'CMP7K9D2M4Q8X', 'FINO_BY_017', 'PRDYKY2J09T65', 1800, 13.50, 9.00, 2187.00, 9.00, 2187.00, 28674.00, 'SAC998314', '02AABCA1234S1Z5', NOW(), NOW(), 0, 1),
(1020, 'IN10000020', '2025-04-05 00:00:00', 'CMP7K9D2M4Q8X', 'FINO_BY_018', 'PRDEG10VDVD4F', 2500, 6.00, 9.00, 1350.00, 9.00, 1350.00, 17700.00, 'SAC998314', '01AABCA1234T1Z5', NOW(), NOW(), 0, 1),
(1021, 'IN10000021', '2025-02-25 00:00:00', 'CMPN3R5T8W2ZA', 'PRES_BY_003', 'PRD143CQB42AX', 150, 180.00, 9.00, 2430.00, 9.00, 2430.00, 31860.00, 'SAC998313', '19AABCA1234U1Z5', NOW(), NOW(), 0, 1),
(1022, 'IN10000022', '2025-02-28 00:00:00', 'CMPN3R5T8W2ZA', 'PRES_BY_004', 'PRDBP8H5XTAQF', 600, 45.00, 9.00, 2430.00, 9.00, 2430.00, 31860.00, 'SAC998313', '33AABCA1234V1Z5', NOW(), NOW(), 0, 1),
(1023, 'IN10000023', '2025-03-02 00:00:00', 'CMPN3R5T8W2ZA', 'PRES_BY_005', 'PRDNB05JNK148', 2000, 8.50, 9.00, 1530.00, 9.00, 1530.00, 20060.00, 'SAC998313', '29AABCA1234W1Z5', NOW(), NOW(), 0, 1),
(1024, 'IN10000024', '2025-03-05 00:00:00', 'CMPN3R5T8W2ZA', 'PRES_BY_006', 'PRD1TJ14MD12G', 400, 85.00, 9.00, 3060.00, 9.00, 3060.00, 40120.00, 'SAC998313', '36AABCA1234X1Z5', NOW(), NOW(), 0, 1),
(1025, 'IN10000025', '2025-03-08 00:00:00', 'CMPN3R5T8W2ZA', 'PRES_BY_007', 'PRDWMGJHD80PX', 800, 25.00, 9.00, 1800.00, 9.00, 1800.00, 23600.00, 'SAC998313', '27AABCA1234Y1Z5', NOW(), NOW(), 0, 1),
(1026, 'IN10000026', '2025-03-10 00:00:00', 'CMPN3R5T8W2ZA', 'PRES_BY_008', 'PRDHKRXWEH29B', 120, 220.00, 9.00, 2376.00, 9.00, 2376.00, 31152.00, 'SAC998313', '27AABCA1234Z1Z5', NOW(), NOW(), 0, 1),
(1027, 'IN10000027', '2025-03-12 00:00:00', 'CMPN3R5T8W2ZA', 'PRES_BY_009', 'PRDQYEK086ND0', 500, 35.00, 9.00, 1575.00, 9.00, 1575.00, 20650.00, 'SAC998313', '24AABCA1235A1Z5', NOW(), NOW(), 0, 1),
(1028, 'IN10000028', '2025-03-15 00:00:00', 'CMPN3R5T8W2ZA', 'PRES_BY_010', 'PRDDAT61XJWC4', 300, 95.00, 9.00, 2565.00, 9.00, 2565.00, 33630.00, 'SAC998313', '24AABCA1235B1Z5', NOW(), NOW(), 0, 1),
(1029, 'IN10000029', '2025-03-18 00:00:00', 'CMPN3R5T8W2ZA', 'PRES_BY_011', 'PRDDSG73JMQ35', 600, 55.00, 9.00, 2970.00, 9.00, 2970.00, 38940.00, 'SAC998313', '24AABCA1235C1Z5', NOW(), NOW(), 0, 1),
(1030, 'IN10000030', '2025-03-20 00:00:00', 'CMPN3R5T8W2ZA', 'PRES_BY_012', 'PRD1Q8G67FZR8', 1000, 18.00, 9.00, 1620.00, 9.00, 1620.00, 21240.00, 'SAC998313', '24AABCA1235D1Z5', NOW(), NOW(), 0, 1),
(1031, 'IN10000031', '2025-03-22 00:00:00', 'CMPN3R5T8W2ZA', 'PRES_BY_013', 'PRDN1KRV0X6M6', 80, 280.00, 9.00, 2016.00, 9.00, 2016.00, 26432.00, 'SAC998313', '08AABCA1235E1Z5', NOW(), NOW(), 0, 1),
(1032, 'IN10000032', '2025-03-25 00:00:00', 'CMPN3R5T8W2ZA', 'PRES_BY_014', 'PRD77YTWXJV76', 1500, 12.00, 9.00, 1620.00, 9.00, 1620.00, 21240.00, 'SAC998313', '23AABCA1235F1Z5', NOW(), NOW(), 0, 1),
(1033, 'IN10000033', '2025-03-28 00:00:00', 'CMPN3R5T8W2ZA', 'PRES_BY_015', 'PRD487F9ZB74N', 400, 65.00, 9.00, 2340.00, 9.00, 2340.00, 30680.00, 'SAC998313', '23AABCA1235G1Z5', NOW(), NOW(), 0, 1),
(1034, 'IN10000034', '2025-03-30 00:00:00', 'CMPN3R5T8W2ZA', 'PRES_BY_016', 'PRDFC8F8Y27K8', 3000, 4.50, 9.00, 1215.00, 9.00, 1215.00, 15930.00, 'SAC998313', '27AABCA1235H1Z5', NOW(), NOW(), 0, 1),
(1035, 'IN10000035', '2025-04-02 00:00:00', 'CMPN3R5T8W2ZA', 'PRES_BY_017', 'PRDYNAMGNRSNH', 200, 125.00, 9.00, 2250.00, 9.00, 2250.00, 29500.00, 'SAC998313', '27AABCA1235I1Z5', NOW(), NOW(), 0, 1),
(1036, 'IN10000036', '2025-04-05 00:00:00', 'CMPN3R5T8W2ZA', 'PRES_BY_018', 'PRD3V8QPKGWP3', 350, 75.00, 9.00, 2362.50, 9.00, 2362.50, 30975.00, 'SAC998313', '27AABCA1235J1Z5', NOW(), NOW(), 0, 1),
(1037, 'IN10000037', '2025-04-08 00:00:00', 'CMPN3R5T8W2ZA', 'PRES_BY_019', 'PRD523PQXYY2Z', 800, 32.00, 9.00, 2304.00, 9.00, 2304.00, 30208.00, 'SAC998313', '27AABCA1235K1Z5', NOW(), NOW(), 0, 1);

-- --------------------------------------------------------
--
-- Table structure for table `mst_assets`
--

-- Seed data for mst_assets (file type samples)
INSERT INTO `mst_assets` (`module`, `sub_module`, `identifier`, `original_name`, `stored_name`, `mime_type`, `size_bytes`, `storage_path`, `visibility`, `company_id`, `created_by`, `updated_by`, `metadata`, `create_date`, `update_date`, `is_deleted`, `is_active`) VALUES
('seed','samples','filetypes','sample.csv','b1510eef-9243-41fe-b0e0-0ef85cc2a1ff_sample.csv','text/csv',23,'seed/samples/b1510eef-9243-41fe-b0e0-0ef85cc2a1ff_sample.csv','public','CMP7K9D2M4Q8X',1,1,JSON_OBJECT('seed', true, 'fileType', 'csv'), NOW(), NOW(), 0, 1),
('seed','samples','filetypes','sample.txt','4a87878d-110f-43f4-ad12-e785575485de_sample.txt','text/plain',30,'seed/samples/4a87878d-110f-43f4-ad12-e785575485de_sample.txt','public','CMP7K9D2M4Q8X',1,1,JSON_OBJECT('seed', true, 'fileType', 'txt'), NOW(), NOW(), 0, 1),
('seed','samples','filetypes','sample.pdf','a2949208-58b5-4dad-b73d-77aa0487c203_sample.pdf','application/pdf',45,'seed/samples/a2949208-58b5-4dad-b73d-77aa0487c203_sample.pdf','public','CMP7K9D2M4Q8X',1,1,JSON_OBJECT('seed', true, 'fileType', 'pdf'), NOW(), NOW(), 0, 1),
('seed','samples','filetypes','sample.docx','1cb6c67a-dfb3-492b-874a-def894877924_sample.docx','application/vnd.openxmlformats-officedocument.wordprocessingml.document',151,'seed/samples/1cb6c67a-dfb3-492b-874a-def894877924_sample.docx','public','CMP7K9D2M4Q8X',1,1,JSON_OBJECT('seed', true, 'fileType', 'docx'), NOW(), NOW(), 0, 1),
('seed','samples','filetypes','sample.xlsx','24f7df5d-95b4-4f78-97f2-e037d64e2814_sample.xlsx','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',151,'seed/samples/24f7df5d-95b4-4f78-97f2-e037d64e2814_sample.xlsx','public','CMP7K9D2M4Q8X',1,1,JSON_OBJECT('seed', true, 'fileType', 'xlsx'), NOW(), NOW(), 0, 1),
('seed','samples','filetypes','sample.xls','36ed1d57-fe95-44bd-924a-d5deda94fd84_sample.xls','application/vnd.ms-excel',16,'seed/samples/36ed1d57-fe95-44bd-924a-d5deda94fd84_sample.xls','public','CMP7K9D2M4Q8X',1,1,JSON_OBJECT('seed', true, 'fileType', 'xls'), NOW(), NOW(), 0, 1),
('seed','samples','filetypes','sample.zip','26ff74df-70e5-4472-9528-b025d60ecf21_sample.zip','application/zip',128,'seed/samples/26ff74df-70e5-4472-9528-b025d60ecf21_sample.zip','public','CMP7K9D2M4Q8X',1,1,JSON_OBJECT('seed', true, 'fileType', 'zip'), NOW(), NOW(), 0, 1),
('seed','samples','filetypes','sample.apk','c1d9cb48-10ea-4273-b922-43cbeec72c7b_sample.apk','application/vnd.android.package-archive',157,'seed/samples/c1d9cb48-10ea-4273-b922-43cbeec72c7b_sample.apk','public','CMP7K9D2M4Q8X',1,1,JSON_OBJECT('seed', true, 'fileType', 'apk'), NOW(), NOW(), 0, 1),
('seed','samples','filetypes','sample.png','842086d1-8fc2-45b4-a885-68ccbaf55b95_sample.png','image/png',68,'seed/samples/842086d1-8fc2-45b4-a885-68ccbaf55b95_sample.png','public','CMP7K9D2M4Q8X',1,1,JSON_OBJECT('seed', true, 'fileType', 'png'), NOW(), NOW(), 0, 1),
('seed','samples','filetypes','sample.jpg','f5b99a6e-889f-49bc-94e6-d24f009787d7_sample.jpg','image/jpeg',282,'seed/samples/f5b99a6e-889f-49bc-94e6-d24f009787d7_sample.jpg','public','CMP7K9D2M4Q8X',1,1,JSON_OBJECT('seed', true, 'fileType', 'jpg'), NOW(), NOW(), 0, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- Tamil (User ID: 1) - OWNER
INSERT INTO map_user_role (user_id, role_id, is_deleted, is_active) VALUES (1001, 1, 0, 1);

-- Nandha (User ID: 2) - OWNER
INSERT INTO map_user_role (user_id, role_id, is_deleted, is_active) VALUES (1002, 1, 0, 1);

-- Alice Johnson (User ID: 3) - ADMIN
INSERT INTO map_user_role (user_id, role_id, is_deleted, is_active) VALUES (1003, 2, 0, 1);

-- Bob Smith (User ID: 4) - PLANT_HEAD
INSERT INTO map_user_role (user_id, role_id, is_deleted, is_active) VALUES (1004, 3, 0, 1);

-- Charlie Brown (User ID: 5) - SHIFT_INCHARGE
INSERT INTO map_user_role (user_id, role_id, is_deleted, is_active) VALUES (1005, 4, 0, 1);

-- Diana Prince (User ID: 6) - STORES_INCHARGE
INSERT INTO map_user_role (user_id, role_id, is_deleted, is_active) VALUES (1006, 5, 0, 1);

-- Ethan Hunt (User ID: 7) - PRODUCTION_EMPLOYEE
INSERT INTO map_user_role (user_id, role_id, is_deleted, is_active) VALUES (1007, 6, 0, 1);

-- Fiona Gallagher (User ID: 8) - PRODUCTION_EMPLOYEE
INSERT INTO map_user_role (user_id, role_id, is_deleted, is_active) VALUES (1008, 6, 0, 1);

-- George Miller (User ID: 9) - SECONDARY_PROCESS_EMPLOYEE
INSERT INTO map_user_role (user_id, role_id, is_deleted, is_active) VALUES (1009, 7, 0, 1);

-- Hannah Lee (User ID: 10) - SECONDARY_PROCESS_EMPLOYEE
INSERT INTO map_user_role (user_id, role_id, is_deleted, is_active) VALUES (1010, 7, 0, 1);

-- Ian Curtis (User ID: 11) - ACCOUNTANT
INSERT INTO map_user_role (user_id, role_id, is_deleted, is_active) VALUES (1011, 8, 0, 1);

-- Jasmine Patel (User ID: 12) - PRODUCTION_EMPLOYEE
INSERT INTO map_user_role (user_id, role_id, is_deleted, is_active) VALUES (1012, 6, 0, 1);

-- Kevin Wu (User ID: 13) - STORES_INCHARGE
INSERT INTO map_user_role (user_id, role_id, is_deleted, is_active) VALUES (1013, 5, 0, 1);

-- Rajesh Kumar (User ID: 14) - ADMIN
INSERT INTO map_user_role (user_id, role_id, is_deleted, is_active) VALUES (1014, 2, 0, 1);

-- Priya Menon (User ID: 15) - PLANT_HEAD
INSERT INTO map_user_role (user_id, role_id, is_deleted, is_active) VALUES (1015, 3, 0, 1);

-- Amit Sharma (User ID: 16) - SHIFT_INCHARGE
INSERT INTO map_user_role (user_id, role_id, is_deleted, is_active) VALUES (1016, 4, 0, 1);

-- Sunita Singh (User ID: 17) - PRODUCTION_EMPLOYEE
INSERT INTO map_user_role (user_id, role_id, is_deleted, is_active) VALUES (1017, 6, 0, 1);

-- Vikram Reddy (User ID: 18) - ACCOUNTANT
INSERT INTO map_user_role (user_id, role_id, is_deleted, is_active) VALUES (1018, 8, 0, 1);

-- Additional user roles for remaining users (19-37)
INSERT INTO map_user_role (user_id, role_id, is_deleted, is_active) VALUES
(1019, 3, 0, 1), -- Sanjay Dutt - PLANT_HEAD
(1020, 3, 0, 1), -- Tanvi Mehta - PLANT_HEAD
(1021, 4, 0, 1), -- Uday Kiran - SHIFT_INCHARGE
(1022, 4, 0, 1), -- Varun Tej - SHIFT_INCHARGE
(1023, 4, 0, 1), -- Wajid Khan - SHIFT_INCHARGE
(1024, 4, 0, 1), -- Xavi Fernandez - SHIFT_INCHARGE
(1025, 5, 0, 1), -- Yamini Reddy - STORES_INCHARGE
(1026, 5, 0, 1), -- Zara Sheikh - STORES_INCHARGE
(1027, 5, 0, 1), -- Arjun Das - STORES_INCHARGE
(1028, 6, 0, 1), -- Bhavana Menon - PRODUCTION_EMPLOYEE
(1029, 6, 0, 1), -- Chetan Bhagat - PRODUCTION_EMPLOYEE
(1030, 6, 0, 1), -- Divya Bharti - PRODUCTION_EMPLOYEE
(1031, 6, 0, 1), -- Eshwar Prasad - PRODUCTION_EMPLOYEE
(1032, 6, 0, 1), -- Falguni Pathak - PRODUCTION_EMPLOYEE
(1033, 6, 0, 1), -- Gautam Adani - PRODUCTION_EMPLOYEE
(1034, 7, 0, 1), -- Hema Malini - SECONDARY_PROCESS_EMPLOYEE
(1035, 7, 0, 1), -- Ishaan Khatter - SECONDARY_PROCESS_EMPLOYEE
(1036, 7, 0, 1), -- Janhvi Kapoor - SECONDARY_PROCESS_EMPLOYEE
(1037, 7, 0, 1); -- Kartik Aaryan - SECONDARY_PROCESS_EMPLOYEE

-- Role Distribution Summary:
-- OWNER: 2 users (Tamil - FINO001, Nandha - PRES001)
-- ADMIN: 2 users
-- PLANT_HEAD: 4 users
-- SHIFT_INCHARGE: 6 users
-- STORES_INCHARGE: 5 users
-- PRODUCTION_EMPLOYEE: 10 users
-- SECONDARY_PROCESS_EMPLOYEE: 6 users
-- ACCOUNTANT: 2 users
-- Total: 37 users

COMMIT;
