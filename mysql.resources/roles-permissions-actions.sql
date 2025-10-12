CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,      -- e.g. ADMIN, MANAGER, VIEWER
  description TEXT
);

INSERT INTO roles (id, name, description) VALUES
(1, 'OWNER', 'Owner with all rights and permissions'),
(2, 'ADMIN', 'Administrator with all rights and permissions'),
(3, 'PLANT_HEAD', 'Plant Head with all rights except billing'),
(4, 'SHIFT_INCHARGE', 'Shift Incharge managing production and secondary processes'),
(5, 'STORES_INCHARGE', 'Stores Incharge managing inward, usages, and despatch'),
(6, 'PRODUCTION_EMPLOYEE', 'Production employee with production access'),
(7, 'SECONDARY_PROCESS_EMPLOYEE', 'Secondary process employee'),
(8, 'ACCOUNTANT', 'Accountant managing despatch and billing');

CREATE TABLE actions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) UNIQUE NOT NULL,        -- e.g. READ, CREATE, UPDATE, DELETE
  description TEXT
);

INSERT INTO actions (id, name, description) VALUES
(1, 'CREATE', 'Create new records'),
(2, 'READ', 'View/Read records'),
(3, 'UPDATE', 'Update existing records'),
(4, 'DELETE', 'Delete records'),
(5, 'APPROVE', 'Approve records or transactions'),
(6, 'EXPORT', 'Export data');

CREATE TABLE permissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  resource VARCHAR(100) NOT NULL,          -- e.g. USER, ORDER, PRODUCT
  action_id INT NOT NULL,
  name VARCHAR(150) UNIQUE NOT NULL,       -- e.g. USER_READ, ORDER_DELETE
  description TEXT,
  FOREIGN KEY (action_id) REFERENCES actions(id)
);

-- Production Permissions
INSERT INTO permissions (id, resource, action_id, name, description) VALUES
(1, 'PRODUCTION', 1, 'PRODUCTION_CREATE', 'Create production records'),
(2, 'PRODUCTION', 2, 'PRODUCTION_READ', 'View production records'),
(3, 'PRODUCTION', 3, 'PRODUCTION_UPDATE', 'Update production records'),
(4, 'PRODUCTION', 4, 'PRODUCTION_DELETE', 'Delete production records'),
(5, 'PRODUCTION', 5, 'PRODUCTION_APPROVE', 'Approve production records'),
(6, 'PRODUCTION', 6, 'PRODUCTION_EXPORT', 'Export production data');

-- Secondary Process Permissions
INSERT INTO permissions (id, resource, action_id, name, description) VALUES
(7, 'SECONDARY_PROCESS', 1, 'SECONDARY_PROCESS_CREATE', 'Create secondary process records'),
(8, 'SECONDARY_PROCESS', 2, 'SECONDARY_PROCESS_READ', 'View secondary process records'),
(9, 'SECONDARY_PROCESS', 3, 'SECONDARY_PROCESS_UPDATE', 'Update secondary process records'),
(10, 'SECONDARY_PROCESS', 4, 'SECONDARY_PROCESS_DELETE', 'Delete secondary process records'),
(11, 'SECONDARY_PROCESS', 5, 'SECONDARY_PROCESS_APPROVE', 'Approve secondary process records'),
(12, 'SECONDARY_PROCESS', 6, 'SECONDARY_PROCESS_EXPORT', 'Export secondary process data');

-- Company Permissions
INSERT INTO permissions (id, resource, action_id, name, description) VALUES
(13, 'COMPANY', 1, 'COMPANY_CREATE', 'Create company records'),
(14, 'COMPANY', 2, 'COMPANY_READ', 'View company records'),
(15, 'COMPANY', 3, 'COMPANY_UPDATE', 'Update company records'),
(16, 'COMPANY', 4, 'COMPANY_DELETE', 'Delete company records'),
(17, 'COMPANY', 5, 'COMPANY_APPROVE', 'Approve company records'),
(18, 'COMPANY', 6, 'COMPANY_EXPORT', 'Export company data');

CREATE TABLE role_permissions (
  role_id INT NOT NULL,
  permission_id INT NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

-- SHIFT_INCHARGE (Role ID: 4) - Production, Secondary Process
INSERT INTO role_permissions (role_id, permission_id) VALUES
-- Production permissions
(4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6),
-- Secondary Process permissions
(4, 7), (4, 8), (4, 9), (4, 10), (4, 11), (4, 12);

-- OWNER (Role ID: 1) - All permissions
INSERT INTO role_permissions (role_id, permission_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
(1, 7), (1, 8), (1, 9), (1, 10), (1, 11), (1, 12),
(1, 13), (1, 14), (1, 15), (1, 16), (1, 17), (1, 18);

-- ADMIN (Role ID: 2) - All permissions
INSERT INTO role_permissions (role_id, permission_id) VALUES
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6),
(2, 7), (2, 8), (2, 9), (2, 10), (2, 11), (2, 12),
(2, 13), (2, 14), (2, 15), (2, 16), (2, 17), (2, 18);

-- PLANT_HEAD (Role ID: 3) - All except delete
INSERT INTO role_permissions (role_id, permission_id) VALUES
(3, 1), (3, 2), (3, 3), (3, 5), (3, 6),
(3, 7), (3, 8), (3, 9), (3, 11), (3, 12),
(3, 13), (3, 14), (3, 15), (3, 17), (3, 18);

CREATE TABLE role_actions (
  role_id INT NOT NULL,
  action_id INT NOT NULL,
  PRIMARY KEY (role_id, action_id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (action_id) REFERENCES actions(id)
);

-- SHIFT_INCHARGE - Create, Read, Update, Approve
INSERT INTO role_actions (role_id, action_id) VALUES
(4, 1), (4, 2), (4, 3), (4, 5);

CREATE TABLE user_roles (
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Tamil (User ID: 1) - OWNER
INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);

-- Nandha (User ID: 2) - ADMIN
INSERT INTO user_roles (user_id, role_id) VALUES (2, 2);

-- Alice Johnson (User ID: 3) - PLANT_HEAD
INSERT INTO user_roles (user_id, role_id) VALUES (3, 3);

-- Bob Smith (User ID: 4) - SHIFT_INCHARGE
INSERT INTO user_roles (user_id, role_id) VALUES (4, 4);

-- Charlie Brown (User ID: 5) - SHIFT_INCHARGE
INSERT INTO user_roles (user_id, role_id) VALUES (5, 4);

-- Diana Prince (User ID: 6) - STORES_INCHARGE
INSERT INTO user_roles (user_id, role_id) VALUES (6, 5);

-- Ethan Hunt (User ID: 7) - PRODUCTION_EMPLOYEE
INSERT INTO user_roles (user_id, role_id) VALUES (7, 6);

-- Fiona Gallagher (User ID: 8) - PRODUCTION_EMPLOYEE
INSERT INTO user_roles (user_id, role_id) VALUES (8, 6);

-- George Miller (User ID: 9) - SECONDARY_PROCESS_EMPLOYEE
INSERT INTO user_roles (user_id, role_id) VALUES (9, 7);

-- Hannah Lee (User ID: 10) - SECONDARY_PROCESS_EMPLOYEE
INSERT INTO user_roles (user_id, role_id) VALUES (10, 7);

-- Ian Curtis (User ID: 11) - ACCOUNTANT
INSERT INTO user_roles (user_id, role_id) VALUES (11, 8);

-- Jasmine Patel (User ID: 12) - PRODUCTION_EMPLOYEE
INSERT INTO user_roles (user_id, role_id) VALUES (12, 6);

-- Kevin Wu (User ID: 13) - STORES_INCHARGE
INSERT INTO user_roles (user_id, role_id) VALUES (13, 5);

-- Rajesh Kumar (User ID: 14) - OWNER (Prestige)
INSERT INTO user_roles (user_id, role_id) VALUES (14, 1);

-- Priya Menon (User ID: 15) - PLANT_HEAD (Prestige)
INSERT INTO user_roles (user_id, role_id) VALUES (15, 3);

-- Amit Sharma (User ID: 16) - SHIFT_INCHARGE (Prestige)
INSERT INTO user_roles (user_id, role_id) VALUES (16, 4);

-- Sunita Singh (User ID: 17) - PRODUCTION_EMPLOYEE (Prestige)
INSERT INTO user_roles (user_id, role_id) VALUES (17, 6);

-- Vikram Reddy (User ID: 18) - ACCOUNTANT (Prestige)
INSERT INTO user_roles (user_id, role_id) VALUES (18, 8);

