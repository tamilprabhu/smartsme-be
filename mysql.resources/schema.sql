/* ** Root ** */
DROP DATABASE IF EXISTS `smartsme`;
CREATE DATABASE `smartsme`;
DROP USER IF EXISTS 'smartsmeusr' @'%';
CREATE USER 'smartsmeusr' @'%' IDENTIFIED WITH mysql_native_password BY '$m@rt$mepwd';
GRANT ALL PRIVILEGES ON smartsme.* TO 'smartsmeusr' @'%' WITH GRANT OPTION;

USE smartsme;
