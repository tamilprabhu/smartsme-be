CREATE TABLE `users` (
    `id` int NOT NULL,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `first_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `last_name` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `mobile` VARCHAR(10) NOT NULL UNIQUE,
    `address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `password` VARCHAR(255) NOT NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
    `created_by` INT DEFAULT NULL,
    `updated_by` INT DEFAULT NULL,
    `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,      -- e.g. ADMIN, MANAGER, VIEWER
  description TEXT,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `created_by` INT DEFAULT NULL,
  `updated_by` INT DEFAULT NULL,
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE actions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) UNIQUE NOT NULL,        -- e.g. READ, CREATE, UPDATE, DELETE
  description TEXT,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `created_by` INT DEFAULT NULL,
  `updated_by` INT DEFAULT NULL,
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE permissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  resource VARCHAR(100) NOT NULL,          -- e.g. USER, ORDER, PRODUCT
  action_id INT NOT NULL,
  name VARCHAR(150) UNIQUE NOT NULL,       -- e.g. USER_READ, ORDER_DELETE
  description TEXT,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `created_by` INT DEFAULT NULL,
  `updated_by` INT DEFAULT NULL,
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (action_id) REFERENCES actions(id)
);

CREATE TABLE map_role_permission (
  role_id INT NOT NULL,
  permission_id INT NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `created_by` INT DEFAULT NULL,
  `updated_by` INT DEFAULT NULL,
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (role_id, permission_id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

CREATE TABLE map_role_action (
  role_id INT NOT NULL,
  action_id INT NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `created_by` INT DEFAULT NULL,
  `updated_by` INT DEFAULT NULL,
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (role_id, action_id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (action_id) REFERENCES actions(id)
);

CREATE TABLE map_user_role (
  `user_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `created_by` INT DEFAULT NULL,
  `updated_by` INT DEFAULT NULL,
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE `buyer` (
  `buyer_id_seq` int NOT NULL,
  `buyer_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `buyer_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `buyer_address` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `buyer_phone` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `buyer_email` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `buyer_gstin` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` INT DEFAULT NULL,
  `updated_by` INT DEFAULT NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`buyer_id_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `update_date` datetime NOT NULL,
  `created_by` INT DEFAULT NULL,
  `updated_by` INT DEFAULT NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`company_id_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` INT DEFAULT NULL,
  `updated_by` INT DEFAULT NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`dispatch_id_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `employee` (
  `employee_id_seq` int NOT NULL,
  `user_id` INT NOT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `salary` int DEFAULT NULL,
  `active_flag` char(1) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  `created_by` INT DEFAULT NULL,
  `updated_by` INT DEFAULT NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`employee_id_seq`),
  KEY `idx_employee_id_seq` (`employee_id_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `machine` (
  `machine_id_seq` int NOT NULL,
  `machine_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `machine_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `machine_type` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `capacity` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `model` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `active_flag` char(1) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` INT DEFAULT NULL,
  `updated_by` INT DEFAULT NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`machine_id_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` INT DEFAULT NULL,
  `updated_by` INT DEFAULT NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`order_id_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` INT DEFAULT NULL,
  `updated_by` INT DEFAULT NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` INT DEFAULT NULL,
  `updated_by` INT DEFAULT NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`prod_id_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=1000000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `production_entry` (
  `order_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shift_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shift_start_time` datetime DEFAULT NULL,
  `shift_end_time` datetime DEFAULT NULL,
  `opening_count` int DEFAULT NULL,
  `closing_count` int DEFAULT NULL,
  `production` int DEFAULT NULL,
  `created_by` INT DEFAULT NULL,
  `updated_by` INT DEFAULT NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `production_shift` (
  `shift_id_seq` int NOT NULL,
  `order_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shift_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
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
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` INT DEFAULT NULL,
  `updated_by` INT DEFAULT NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`shift_id_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `seller` (
  `seller_id_seq` int NOT NULL,
  `seller_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seller_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seller_address` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seller_phone` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seller_email` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` INT DEFAULT NULL,
  `updated_by` INT DEFAULT NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`seller_id_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `stock` (
  `stock_id_seq` int NOT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `seller_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `stock_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `stock_date` datetime DEFAULT NULL,
  `raw_material` varchar(25) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `no_of_bars` int DEFAULT NULL,
  `weight` decimal(10,4) DEFAULT NULL,
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` INT DEFAULT NULL,
  `updated_by` INT DEFAULT NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`stock_id_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `invoice` (
  `invoice_seq` int NOT NULL,
  `invoice_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `invoice_date` datetime DEFAULT NULL,
  `comp_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `buyr_id` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `prod_id` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `cgst_rate` decimal(10,2) DEFAULT NULL,
  `cgst_amount` decimal(10,2) DEFAULT NULL,
  `sgst_rate` decimal(10,2) DEFAULT NULL,
  `sgst_amount` decimal(10,2) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `sac_code` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `buyr_gstin` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` INT DEFAULT NULL,
  `updated_by` INT DEFAULT NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`invoice_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `assets` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `module` VARCHAR(50) NOT NULL,
  `sub_module` VARCHAR(50) NOT NULL,
  `identifier` VARCHAR(100) NOT NULL,
  `original_name` VARCHAR(255) NOT NULL,
  `stored_name` VARCHAR(255) NOT NULL,
  `mime_type` VARCHAR(100) NOT NULL,
  `size_bytes` INT NOT NULL,
  `storage_path` VARCHAR(500) NOT NULL,
  `visibility` ENUM('public','private') NOT NULL DEFAULT 'private',
  `company_id` VARCHAR(20) DEFAULT NULL,
  `metadata` JSON DEFAULT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `created_by` INT DEFAULT NULL,
  `updated_by` INT DEFAULT NULL,
  `create_date` DATETIME NOT NULL,
  `update_date` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;