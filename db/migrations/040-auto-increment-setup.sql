ALTER TABLE `mst_users` ADD KEY `id` (`id`);
ALTER TABLE `mst_users` MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;
ALTER TABLE `map_user_role` ADD FOREIGN KEY (user_id) REFERENCES mst_users(id) ON DELETE CASCADE;
ALTER TABLE `mst_buyer` MODIFY `buyer_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;

ALTER TABLE `mst_company` MODIFY `company_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;
ALTER TABLE `mst_company` ADD KEY `mst_company_company_id` (`company_id`);

ALTER TABLE `txn_dispatch` MODIFY `dispatch_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;
ALTER TABLE `mst_employee` MODIFY `employee_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;
ALTER TABLE `mst_employee` ADD FOREIGN KEY (`user_id`) REFERENCES `mst_users`(`id`) ON DELETE CASCADE;

ALTER TABLE `mst_machine` MODIFY `machine_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;
ALTER TABLE `mst_machine` ADD KEY `mst_machine_machine_id` (`machine_id`);

ALTER TABLE `txn_order` MODIFY `order_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;
ALTER TABLE `txn_order` ADD KEY `order_order_id` (`order_id`);

ALTER TABLE `mst_product` MODIFY `product_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;
ALTER TABLE `mst_product` ADD KEY `product_product_id` (`product_id`);

ALTER TABLE `txn_production_shift` MODIFY `shift_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;
ALTER TABLE `txn_production_shift` ADD FOREIGN KEY (`product_id`) REFERENCES `mst_product`(`product_id`) ON DELETE CASCADE;
ALTER TABLE `txn_production_shift` ADD FOREIGN KEY (`order_id`) REFERENCES `txn_order`(`order_id`) ON DELETE CASCADE;
ALTER TABLE `txn_production_shift` ADD FOREIGN KEY (`company_id`) REFERENCES `mst_company`(`company_id`) ON DELETE CASCADE;
ALTER TABLE `txn_production_shift` ADD FOREIGN KEY (`machine_id`) REFERENCES `mst_machine`(`machine_id`) ON DELETE CASCADE;

ALTER TABLE `mst_seller` MODIFY `seller_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;
ALTER TABLE `txn_stock` MODIFY `stock_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;
ALTER TABLE `txn_invoice` MODIFY `invoice_seq` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;
