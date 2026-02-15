INSERT INTO mst_roles (id, name, description, is_deleted, is_active) VALUES
(1, 'OWNER', 'Owner with all rights and permissions', 0, 1),
(2, 'ADMIN', 'Administrator with all rights and permissions', 0, 1),
(3, 'PLANT_HEAD', 'Plant Head with all rights except billing', 0, 1),
(4, 'SHIFT_INCHARGE', 'Shift Incharge managing production and secondary processes', 0, 1),
(5, 'STORES_INCHARGE', 'Stores Incharge managing inward, usages, and despatch', 0, 1),
(6, 'PRODUCTION_EMPLOYEE', 'Production employee with production access', 0, 1),
(7, 'SECONDARY_PROCESS_EMPLOYEE', 'Secondary process employee', 0, 1),
(8, 'ACCOUNTANT', 'Accountant managing despatch and billing', 0, 1);

INSERT INTO mst_actions (id, name, description, is_deleted, is_active) VALUES
(1, 'CREATE', 'Create new records', 0, 1),
(2, 'READ', 'View/Read records', 0, 1),
(3, 'UPDATE', 'Update existing records', 0, 1),
(4, 'DELETE', 'Delete records', 0, 1),
(5, 'APPROVE', 'Approve records or transactions', 0, 1),
(6, 'EXPORT', 'Export data', 0, 1);

-- Production Permissions
INSERT INTO mst_permissions (id, resource, action_id, name, description, is_deleted, is_active) VALUES
(1, 'PRODUCTION', 1, 'PRODUCTION_CREATE', 'Create production records', 0, 1),
(2, 'PRODUCTION', 2, 'PRODUCTION_READ', 'View production records', 0, 1),
(3, 'PRODUCTION', 3, 'PRODUCTION_UPDATE', 'Update production records', 0, 1),
(4, 'PRODUCTION', 4, 'PRODUCTION_DELETE', 'Delete production records', 0, 1),
(5, 'PRODUCTION', 5, 'PRODUCTION_APPROVE', 'Approve production records', 0, 1),
(6, 'PRODUCTION', 6, 'PRODUCTION_EXPORT', 'Export production data', 0, 1);

-- Secondary Process Permissions
INSERT INTO mst_permissions (id, resource, action_id, name, description, is_deleted, is_active) VALUES
(7, 'SECONDARY_PROCESS', 1, 'SECONDARY_PROCESS_CREATE', 'Create secondary process records', 0, 1),
(8, 'SECONDARY_PROCESS', 2, 'SECONDARY_PROCESS_READ', 'View secondary process records', 0, 1),
(9, 'SECONDARY_PROCESS', 3, 'SECONDARY_PROCESS_UPDATE', 'Update secondary process records', 0, 1),
(10, 'SECONDARY_PROCESS', 4, 'SECONDARY_PROCESS_DELETE', 'Delete secondary process records', 0, 1),
(11, 'SECONDARY_PROCESS', 5, 'SECONDARY_PROCESS_APPROVE', 'Approve secondary process records', 0, 1),
(12, 'SECONDARY_PROCESS', 6, 'SECONDARY_PROCESS_EXPORT', 'Export secondary process data', 0, 1);

-- Company Permissions
INSERT INTO mst_permissions (id, resource, action_id, name, description, is_deleted, is_active) VALUES
(13, 'COMPANY', 1, 'COMPANY_CREATE', 'Create company records', 0, 1),
(14, 'COMPANY', 2, 'COMPANY_READ', 'View company records', 0, 1),
(15, 'COMPANY', 3, 'COMPANY_UPDATE', 'Update company records', 0, 1),
(16, 'COMPANY', 4, 'COMPANY_DELETE', 'Delete company records', 0, 1),
(17, 'COMPANY', 5, 'COMPANY_APPROVE', 'Approve company records', 0, 1),
(18, 'COMPANY', 6, 'COMPANY_EXPORT', 'Export company data', 0, 1);

-- SHIFT_INCHARGE (Role ID: 4) - Production, Secondary Process
INSERT INTO map_role_permission (role_id, permission_id, is_deleted, is_active) VALUES
-- Production permissions
(4, 1, 0, 1), (4, 2, 0, 1), (4, 3, 0, 1), (4, 4, 0, 1), (4, 5, 0, 1), (4, 6, 0, 1),
-- Secondary Process permissions
(4, 7, 0, 1), (4, 8, 0, 1), (4, 9, 0, 1), (4, 10, 0, 1), (4, 11, 0, 1), (4, 12, 0, 1);

-- OWNER (Role ID: 1) - All permissions
INSERT INTO map_role_permission (role_id, permission_id, is_deleted, is_active) VALUES
(1, 1, 0, 1), (1, 2, 0, 1), (1, 3, 0, 1), (1, 4, 0, 1), (1, 5, 0, 1), (1, 6, 0, 1),
(1, 7, 0, 1), (1, 8, 0, 1), (1, 9, 0, 1), (1, 10, 0, 1), (1, 11, 0, 1), (1, 12, 0, 1),
(1, 13, 0, 1), (1, 14, 0, 1), (1, 15, 0, 1), (1, 16, 0, 1), (1, 17, 0, 1), (1, 18, 0, 1);

-- ADMIN (Role ID: 2) - All permissions
INSERT INTO map_role_permission (role_id, permission_id, is_deleted, is_active) VALUES
(2, 1, 0, 1), (2, 2, 0, 1), (2, 3, 0, 1), (2, 4, 0, 1), (2, 5, 0, 1), (2, 6, 0, 1),
(2, 7, 0, 1), (2, 8, 0, 1), (2, 9, 0, 1), (2, 10, 0, 1), (2, 11, 0, 1), (2, 12, 0, 1),
(2, 13, 0, 1), (2, 14, 0, 1), (2, 15, 0, 1), (2, 16, 0, 1), (2, 17, 0, 1), (2, 18, 0, 1);

-- PLANT_HEAD (Role ID: 3) - All except delete
INSERT INTO map_role_permission (role_id, permission_id, is_deleted, is_active) VALUES
(3, 1, 0, 1), (3, 2, 0, 1), (3, 3, 0, 1), (3, 5, 0, 1), (3, 6, 0, 1),
(3, 7, 0, 1), (3, 8, 0, 1), (3, 9, 0, 1), (3, 11, 0, 1), (3, 12, 0, 1),
(3, 13, 0, 1), (3, 14, 0, 1), (3, 15, 0, 1), (3, 17, 0, 1), (3, 18, 0, 1);

-- SHIFT_INCHARGE - Create, Read, Update, Approve
INSERT INTO map_role_action (role_id, action_id, is_deleted, is_active) VALUES
(4, 1, 0, 1), (4, 2, 0, 1), (4, 3, 0, 1), (4, 5, 0, 1);
