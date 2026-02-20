CREATE TABLE `mst_users` (
    `id` int NOT NULL,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `first_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `last_name` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `mobile` VARCHAR(20) NOT NULL UNIQUE,
    `address` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `password` VARCHAR(255) NOT NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
    `created_by` INT DEFAULT NULL,
    `updated_by` INT DEFAULT NULL,
    `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE mst_roles (
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

CREATE TABLE mst_actions (
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

CREATE TABLE ref_states (
  id INT PRIMARY KEY AUTO_INCREMENT,
  state_name VARCHAR(100) NOT NULL,
  state_code VARCHAR(2) NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `unique_state` (`state_name`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE ref_districts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  state_id INT NOT NULL,
  district_name VARCHAR(100) NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (state_id) REFERENCES ref_states(id),
  UNIQUE KEY `unique_district_per_state` (`state_id`, `district_name`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE ref_pincodes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_office_name VARCHAR(200) NOT NULL,
  pincode VARCHAR(10) NOT NULL,
  state_name VARCHAR(100) NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_pincode` (`pincode`),
  INDEX `idx_state` (`state_name`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE mst_permissions (
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
  FOREIGN KEY (action_id) REFERENCES mst_actions(id)
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
  FOREIGN KEY (role_id) REFERENCES mst_roles(id),
  FOREIGN KEY (permission_id) REFERENCES mst_permissions(id)
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
  FOREIGN KEY (role_id) REFERENCES mst_roles(id),
  FOREIGN KEY (action_id) REFERENCES mst_actions(id)
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
  FOREIGN KEY (role_id) REFERENCES mst_roles(id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE `mst_buyer` (
  `buyer_seq` int NOT NULL,
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
  PRIMARY KEY (`buyer_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `mst_company` (
  `company_seq` int NOT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
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
  PRIMARY KEY (`company_seq`),
  UNIQUE KEY `uq_company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `txn_dispatch` (
  `dispatch_seq` int NOT NULL,
  `product_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dispatch_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
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
  PRIMARY KEY (`dispatch_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `mst_employee` (
  `employee_seq` int NOT NULL,
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
  PRIMARY KEY (`employee_seq`),
  KEY `idx_employee_seq` (`employee_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `mst_machine` (
  `machine_seq` int NOT NULL,
  `machine_id` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
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
  PRIMARY KEY (`machine_seq`),
  UNIQUE KEY `uq_machine_id` (`machine_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `txn_order` (
  `order_seq` int NOT NULL,
  `order_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
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
  PRIMARY KEY (`order_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `txn_order_quantity` (
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

CREATE TABLE `mst_product` (
  `product_seq` int NOT NULL,
  `product_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `raw_material` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `weight` decimal(10,4) DEFAULT NULL,
  `wastage` int DEFAULT NULL,
  `norms` decimal(10,4) DEFAULT NULL,
  `total_weight` decimal(10,4) DEFAULT NULL,
  `cavity` int DEFAULT NULL,
  `shot_rate` decimal(10,2) DEFAULT NULL,
  `per_item_rate` decimal(10,2) DEFAULT NULL,
  `incentive_limit` int DEFAULT NULL,
  `sales_type` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sales_code` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sales_percent` decimal(10,2) DEFAULT NULL,
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` INT DEFAULT NULL,
  `updated_by` INT DEFAULT NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`product_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=1000000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `txn_production_shift` (
  `shift_seq` int NOT NULL,
  `order_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shift_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `machine_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shift_start_date` datetime DEFAULT NULL,
  `shift_end_date` datetime DEFAULT NULL,
  `entry_type` varchar(6) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shift_type` char(1) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shift_hours` varchar(2) COLLATE utf8mb4_general_ci DEFAULT NULL,
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
  PRIMARY KEY (`shift_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `mst_seller` (
  `seller_seq` int NOT NULL,
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
  PRIMARY KEY (`seller_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `txn_stock` (
  `stock_seq` int NOT NULL,
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
  PRIMARY KEY (`stock_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `txn_invoice` (
  `invoice_seq` int NOT NULL,
  `invoice_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `invoice_date` datetime DEFAULT NULL,
  `company_id` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `buyer_id` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_id` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
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

CREATE TABLE `mst_assets` (
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
