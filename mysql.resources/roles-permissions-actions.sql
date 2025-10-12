CREATE TABLE roles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
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
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
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
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  resource VARCHAR(100) NOT NULL,          -- e.g. USER, ORDER, PRODUCT
  action_id BIGINT NOT NULL,
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

CREATE TABLE role_permissions (
  role_id BIGINT NOT NULL,
  permission_id BIGINT NOT NULL,
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

CREATE TABLE role_actions (
  role_id BIGINT NOT NULL,
  action_id BIGINT NOT NULL,
  PRIMARY KEY (role_id, action_id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (action_id) REFERENCES actions(id)
);

-- SHIFT_INCHARGE - Create, Read, Update, Approve
INSERT INTO role_actions (role_id, action_id) VALUES
(4, 1), (4, 2), (4, 3), (4, 5);

CREATE TABLE user_roles (
  user_id BIGINT NOT NULL,
  role_id BIGINT NOT NULL,
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

