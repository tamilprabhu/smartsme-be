INSERT INTO `mst_users` (`id`, `username`, `first_name`, `last_name`, `name`, `email`, `mobile`, `address`, `password`, `is_active`, `is_deleted`, `created_by`, `updated_by`, `create_date`, `update_date`) VALUES
(911,  'root',    'SmartSME',  'Admin',    'SmartSME Admin',    'no-reply@smartsme.com',   '+91-9443661223',   'Chennai',  'set-no-password', 0,  1,  NULL,   NULL,   '2026-01-01 23:59:59',  '2026-01-01 23:59:59');

INSERT INTO mst_roles (`id`, `name`, `description`, `is_deleted`, `is_active`, `created_by`, `updated_by`, `create_date`, `update_date`) VALUES
(1, 'OWNER', 'Company Owner with all rights and permissions', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(2, 'ADMIN', 'Company Administrator/IT team with all rights and permissions', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(3, 'PLANT_HEAD', 'Plant Head with all rights except billing', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(4, 'SHIFT_INCHARGE', 'Shift Incharge managing production and secondary processes', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(5, 'STORES_INCHARGE', 'Stores Incharge managing inward, usages, and despatch', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(6, 'PRODUCTION_EMPLOYEE', 'Production employee with production access', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(7, 'SECONDARY_PROCESS_EMPLOYEE', 'Secondary process employee', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(8, 'ACCOUNTANT', 'Accountant managing despatch and billing', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(9, 'SMARTSME_ADMIN', 'SmartSME Platform Admin', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(10, 'SMARTSME_SUPPORT', 'SmartSME Platform Support Staff', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP());

INSERT INTO mst_actions (`id`, `name`, `description`, `is_deleted`, `is_active`, `created_by`, `updated_by`, `create_date`, `update_date`) VALUES
(1, 'CREATE', 'Create new records', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(2, 'READ', 'View/Read records', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(3, 'UPDATE', 'Update existing records', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(4, 'DELETE', 'Delete records', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(5, 'APPROVE', 'Approve records or transactions', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(6, 'EXPORT', 'Export data', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(7, 'LIST', 'List multiple items', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP());

-- Company Permissions
INSERT INTO mst_permissions (`id`, `resource`, `action_id`, `name`, `description`, `is_deleted`, `is_active`, `created_by`, `updated_by`, `create_date`, `update_date`) VALUES
(1, 'COMPANY', 1, 'COMPANY_CREATE', 'Create company records', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(2, 'COMPANY', 2, 'COMPANY_READ', 'View company records', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(3, 'COMPANY', 3, 'COMPANY_UPDATE', 'Update company records', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(4, 'COMPANY', 4, 'COMPANY_DELETE', 'Delete company records', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(5, 'COMPANY', 5, 'COMPANY_APPROVE', 'Approve company records', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(6, 'COMPANY', 6, 'COMPANY_EXPORT', 'Export company data', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(7, 'COMPANY', 7, 'COMPANY_LIST', 'List multiple company items', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP());

-- Production Permissions
INSERT INTO mst_permissions (`id`, `resource`, `action_id`, `name`, `description`, `is_deleted`, `is_active`, `created_by`, `updated_by`, `create_date`, `update_date`) VALUES
(8, 'PRODUCTION', 1, 'PRODUCTION_CREATE', 'Create production records', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(9, 'PRODUCTION', 2, 'PRODUCTION_READ', 'View production records', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(10, 'PRODUCTION', 3, 'PRODUCTION_UPDATE', 'Update production records', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(11, 'PRODUCTION', 4, 'PRODUCTION_DELETE', 'Delete production records', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(12, 'PRODUCTION', 5, 'PRODUCTION_APPROVE', 'Approve production records', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(13, 'PRODUCTION', 6, 'PRODUCTION_EXPORT', 'Export production data', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP()),
(14, 'PRODUCTION', 7, 'PRODUCTION_LIST', 'List multiple production items', 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP());

-- SMARTSME_ADMIN (Role ID: 9) - Company Creation Permissions
INSERT INTO map_role_permission (`role_id`, `permission_id`, `is_deleted`, `is_active`, `created_by`, `updated_by`, `create_date`, `update_date`) VALUES
( 9, 1, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 9, 2, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 9, 3, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 9, 4, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 9, 5, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 9, 6, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 9, 7, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() );

-- SMARTSME_SUPPORT (Role ID: 10) - Company Creation Permissions
INSERT INTO map_role_permission (`role_id`, `permission_id`, `is_deleted`, `is_active`, `created_by`, `updated_by`, `create_date`, `update_date`) VALUES
( 10, 1, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 10, 2, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 10, 3, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
-- ( 10, 4, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ), -- No permission for staff to delete the company
( 10, 5, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 10, 6, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 10, 7, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() );

-- OWNER (Role ID: 1) - Production Permissions
INSERT INTO map_role_permission (`role_id`, `permission_id`, `is_deleted`, `is_active`, `created_by`, `updated_by`, `create_date`, `update_date`) VALUES
( 1, 8, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 1, 9, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 1, 10,  0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 1, 11,  0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 1, 12,  0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 1, 13,  0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 1, 14,  0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() );

-- ADMIN (Role ID: 2) - Production Permissions
INSERT INTO map_role_permission (`role_id`, `permission_id`, `is_deleted`, `is_active`, `created_by`, `updated_by`, `create_date`, `update_date`) VALUES
( 2, 8, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 2, 9, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 2, 10,  0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 2, 11,  0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 2, 12,  0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 2, 13,  0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 2, 14,  0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() );

-- SMARTSME_ADMIN (Role ID: 9) - FUll PERMISSIONS TO ALL ACTIONS
INSERT INTO map_role_action (`role_id`, `action_id`, `is_deleted`, `is_active`, `created_by`, `updated_by`, `create_date`, `update_date`) VALUES
( 9, 1, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 9, 2, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 9, 3, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 9, 4, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 9, 5, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 9, 6, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() ),
( 9, 7, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP() );

-- MAP ROOT USER TO SMARTSME_ADMIN ROLE
INSERT INTO `map_user_role` (`user_id`, `role_id`, `is_active`, `is_deleted`, `created_by`, `updated_by`, `create_date`, `update_date`) VALUES
(911, 9, 0, 1, 911, 911, UTC_TIMESTAMP(), UTC_TIMESTAMP());
