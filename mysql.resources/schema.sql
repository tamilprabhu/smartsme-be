/* ** Root ** */
DROP DATABASE IF EXISTS `smartsme`;
CREATE DATABASE `smartsme`;
DROP USER IF EXISTS 'smartsmeusr' @'%';
CREATE USER 'smartsmeusr' @'%' IDENTIFIED WITH mysql_native_password BY 'sm@rtsmepwd';
GRANT ALL PRIVILEGES ON smartsme.* TO 'smartsmeusr' @'%' WITH GRANT OPTION;

USE smartsme;
