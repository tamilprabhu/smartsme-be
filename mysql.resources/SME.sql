-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: 168.231.121.56:3306
-- Generation Time: Sep 20, 2025 at 01:05 PM
-- Server version: 10.11.14-MariaDB-0+deb12u2
-- PHP Version: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `SME`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`smartsmeusr`@`%` PROCEDURE `DC_INSRT_BREAKDOWN_PROC` (`company_id` VARCHAR(20), `ip_order_id` VARCHAR(20), `ip_date` VARCHAR(20), `ip_hrs` INT, `ip_reason` VARCHAR(100), OUT `res_flag` INT)  BEGIN

DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
      	
	GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
 	@errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	ROLLBACK;
INSERT INTO smartsme.DC_ALL_ERR VALUES ('INSRT_BREAKDOWN',@sqlstate,@errno,@text,sysdate());
          SET res_flag := 3;
          COMMIT;
    END;



START TRANSACTION;



INSERT INTO smartsme.DC_INSRT_BREAKDOWN (COMP_ID,ORDER_ID, BREAKDOWN_DATE, BREAKDOWN_HRS,BREAKDOWN_RSN ,CREATE_DATE,UPDATE_DATE)
values(company_id,ip_order_id,STR_TO_DATE(ip_date,'%d/%m/%Y')  ,ip_hrs,ip_reason,sysdate(),sysdate());




SET res_flag := 1;



COMMIT;

END$$

CREATE DEFINER=`smartsmeusr`@`%` PROCEDURE `DC_INSRT_BUYR_PROC` (`ins_type` CHAR(1), `company_id` VARCHAR(20), `ip_buyr_id` VARCHAR(20), `ip_buyr_name` VARCHAR(50), `ip_buyr_add` VARCHAR(100), `ip_buyr_phone` VARCHAR(10), `ip_buyr_email` VARCHAR(30), `ip_buyr_gst` VARCHAR(20), OUT `res_flag` INT)  BEGIN

DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
      	
	GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
 	@errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	ROLLBACK;
INSERT INTO smartsme.DC_ALL_ERR VALUES ('INSRT_BUYER',@sqlstate,@errno,@text,sysdate());
          SET res_flag := 3;
          COMMIT;
    END;



START TRANSACTION;




IF INS_TYPE = 'A'

THEN



INSERT INTO smartsme.DC_INSRT_BUYER (COMP_ID,BUYR_NAME , BUYR_ADDRESS, BUYR_PHONE,BUYR_EMAIL,BUYR_GSTIN,CREATE_DATE,UPDATE_DATE)
values(company_id,ip_buyr_name,ip_buyr_add  ,ip_buyr_phone ,ip_buyr_email,ip_buyr_gst,sysdate(),sysdate());



UPDATE smartsme.DC_INSRT_BUYER SET BUYR_ID = concat('BY',BUYR_ID_SEQ) WHERE BUYR_NAME = ip_buyr_name;

SET res_flag := 1;



ELSEIF INS_TYPE = 'P'


THEN


UPDATE smartsme.DC_INSRT_BUYER SET BUYR_NAME =ip_buyr_name , BUYR_ADDRESS =ip_buyr_add,BUYR_PHONE=ip_buyr_phone,
BUYR_EMAIL=ip_buyr_email,BUYR_GSTIN=ip_buyr_gst,UPDATE_DATE=SYSDATE() WHERE BUYR_ID= ip_buyr_id;

SET res_flag := 2;

END IF;

COMMIT;

END$$

CREATE DEFINER=`smartsmeusr`@`%` PROCEDURE `DC_INSRT_COMP_PROC` (`ins_type` CHAR(1), `comp_name` VARCHAR(100), `busi_cons` VARCHAR(20), `comp_type` VARCHAR(20), `address` VARCHAR(255), `pincode` INT, `prop_name` VARCHAR(30), `direct_ph` VARCHAR(12), `office_ph` VARCHAR(12), `mgmt_ph` VARCHAR(12), `mail_id` VARCHAR(50), `nat_of_business` VARCHAR(20), `auth_pers` VARCHAR(30), `resmobile_no` VARCHAR(10), `hash_val` VARCHAR(255), OUT `user_id` VARCHAR(10), OUT `res_flag` INT)  BEGIN

DECLARE COMP_VAR  VARCHAR(12);
DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
      	
	GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
 	@errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	ROLLBACK;
INSERT INTO smartsme.DC_ALL_ERR VALUES ('INSRT_COMP',@sqlstate,@errno,@text,sysdate());
          SET res_flag := 3;
          COMMIT;
    END;

DECLARE EXIT HANDLER FOR 1062
   BEGIN
	
	GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
 	@errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	ROLLBACK;
INSERT INTO smartsme.DC_ALL_ERR VALUES ('INSRT_COMP',@sqlstate,@errno,@text,sysdate());
          SET res_flag := 4;
	  COMMIT;
          
    END;

DECLARE EXIT HANDLER FOR 1172
   BEGIN
	
	GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
 	@errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	ROLLBACK;
INSERT INTO smartsme.DC_ALL_ERR VALUES ('INSRT_COMP',@sqlstate,@errno,@text,sysdate());
          SET res_flag := 5;
	  COMMIT;
          
    END;

START TRANSACTION;




IF INS_TYPE = 'A'

THEN

INSERT INTO smartsme.DC_INSRT_COMP(COMP_NAME , BUSINESS_CONS, COMPANY_TYPE, ADDRESS, PINCODE,PROP_NAME ,DIRECT_PHONE ,OFFICE_PHONE,MGMT_PHONE,MAIL_ID,
NATURE_OF_BUSINESS,AUTH_PERSON,MOBILE_NO, CREATE_DATE,UPDATE_DATE)
 VALUES(comp_name ,busi_cons ,comp_type ,address ,pincode ,prop_name ,direct_ph ,office_ph ,mgmt_ph , mail_id,nat_of_business ,auth_pers ,resmobile_no,sysdate(),sysdate());


UPDATE smartsme.DC_INSRT_COMP SET COMP_ID= CONCAT(LEFT(COMP_NAME,2),COMP_ID_SEQ,date_format(sysdate(),"%m%y")) where MOBILE_NO = resmobile_no;

SELECT COMP_ID INTO COMP_VAR FROM smartsme.DC_INSRT_COMP WHERE MOBILE_NO=resmobile_no;

INSERT INTO smartsme.DC_INSRT_EMP (EMP_NAME , MOBILE_NO, USERNAME, HASH, COMP_ID,ROLE_ID,ACTIVE_FLAG,SALARY,CREATE_DATE,UPDATE_DATE)
values(auth_pers,resmobile_no,concat(left(auth_pers,2),right(resmobile_no,4)),hash_val,comp_VAR,1,'Y',0,sysdate(),sysdate());

SELECT USERNAME INTO USER_ID FROM smartsme.DC_INSRT_EMP WHERE MOBILE_NO=resmobile_no;

SET res_flag := 1;


ELSEIF INS_TYPE = 'P'


THEN


UPDATE smartsme.DC_INSRT_EMP SET HASH = HASH_VAL, UPDATE_DATE=SYSDATE() WHERE MOBILE_NO = resmobile_no;

SELECT USERNAME INTO USER_ID FROM smartsme.DC_INSRT_EMP WHERE MOBILE_NO=resmobile_no;

SET res_flag := 2;

END IF;

COMMIT;

END$$

CREATE DEFINER=`smartsmeusr`@`%` PROCEDURE `DC_INSRT_DESP_PROC` (`company_id` VARCHAR(20), `ip_ord_id` VARCHAR(20), `ip_prod_id` VARCHAR(20), `ip_desp_date` VARCHAR(20), `ip_quan` INT, `ip_no_packs` INT, `ip_total_weight` DECIMAL(10,4), `ip_normal_weight` DECIMAL(10,4), `ip_norms_weight` DECIMAL(10,4), OUT `res_flag` INT)  BEGIN

DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
      	
	GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
 	@errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	ROLLBACK;
INSERT INTO smartsme.DC_ALL_ERR VALUES ('INSRT_DESPATCH',@sqlstate,@errno,@text,sysdate());
          SET res_flag := 3;
          COMMIT;
    END;



START TRANSACTION;




INSERT INTO smartsme.DC_INSRT_DESPATCH (COMP_ID,PROD_ID , ORDER_ID,DESP_DATE, QUANTITY,NO_OF_PACKS,TOTAL_WEIGHT,NORMAL_WEIGHT,NORMS_WEIGHT,CREATE_DATE,UPDATE_DATE)
values(company_id,ip_prod_id ,ip_ord_id  ,STR_TO_DATE(ip_desp_date,'%d/%m/%Y'),ip_quan,ip_no_packs,ip_total_weight,ip_normal_weight,ip_norms_weight,sysdate(),sysdate());




UPDATE smartsme.DC_INSRT_DESPATCH SET DESP_ID=CONCAT('DL',LAST_INSERT_ID()) where DESP_ID_SEQ=LAST_INSERT_ID();

SET res_flag := 1;



COMMIT;

END$$

CREATE DEFINER=`smartsmeusr`@`%` PROCEDURE `DC_INSRT_EMP_PROC` (`ins_type` CHAR(1), `emp_id` VARCHAR(10), `empl_name` VARCHAR(50), `mobile_num` VARCHAR(10), `rol_id` CHAR(1), `company_id` VARCHAR(15), `salary_val` INT, `act_flag` CHAR(1), OUT `res_flag` INT)  BEGIN
DECLARE COUNT_ID  INT DEFAULT 0;
DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
      	
	GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
 	@errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	ROLLBACK;
INSERT INTO smartsme.DC_ALL_ERR VALUES ('INSRT_EMP',@sqlstate,@errno,@text,sysdate());
          SET res_flag := 3;
          COMMIT;
    END;

DECLARE EXIT HANDLER FOR 1062
   BEGIN
	
	GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
 	@errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	ROLLBACK;
INSERT INTO smartsme.DC_ALL_ERR VALUES ('INSRT_EMP',@sqlstate,@errno,@text,sysdate());
          SET res_flag := 4;
	  COMMIT;
          
    END;

DECLARE EXIT HANDLER FOR 1172
   BEGIN
	
	GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
 	@errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	ROLLBACK;
INSERT INTO smartsme.DC_ALL_ERR VALUES ('INSRT_EMP',@sqlstate,@errno,@text,sysdate());
          SET res_flag := 5;
	  COMMIT;
          
    END;

START TRANSACTION;




IF INS_TYPE = 'A'

THEN

SELECT COUNT(*) INTO COUNT_ID  FROM smartsme.DC_INSRT_EMP WHERE MOBILE_NO=mobile_num;

IF COUNT_ID = 0

THEN

INSERT INTO smartsme.DC_INSRT_EMP (EMP_NAME , MOBILE_NO, USERNAME,  COMP_ID,ROLE_ID,SALARY,ACTIVE_FLAG,CREATE_DATE,UPDATE_DATE)
values(empl_name,mobile_num,concat(left(empl_name,2),right(mobile_num,4)),company_id,rol_id,salary_val,'Y',sysdate(),sysdate());


SET res_flag := 1;

ELSE

SET res_flag := 6;

END IF;

ELSEIF INS_TYPE = 'P'


THEN


UPDATE smartsme.DC_INSRT_EMP SET EMP_NAME =empl_name , MOBILE_NO= mobile_num,ROLE_ID=rol_id,salary=salary_val,active_flag=act_flag,UPDATE_DATE=SYSDATE() WHERE EMP_ID_SEQ= emp_id;

SET res_flag := 2;

END IF;

COMMIT;

END$$

CREATE DEFINER=`smartsmeusr`@`%` PROCEDURE `DC_INSRT_INV_PROC` (`ins_type` CHAR(1), `company_id` VARCHAR(20), `ip_inv_id` VARCHAR(20), `ip_inv_date` VARCHAR(12), `ip_buy_id` VARCHAR(20), `ip_prod_id` VARCHAR(20), `ip_quantity` INT, `ip_unit_price` DECIMAL(10,2), `ip_cgst` DECIMAL(10,2), `ip_cgst_amt` DECIMAL(10,2), `ip_sgst` DECIMAL(10,2), `ip_sgst_amt` DECIMAL(10,2), `ip_total_amt` DECIMAL(10,2), `ip_sac_code` VARCHAR(20), `ip_buy_gstin` VARCHAR(20), OUT `res_flag` INT)  BEGIN

DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
      	
	GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
 	@errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	ROLLBACK;
INSERT INTO smartsme.DC_ALL_ERR VALUES ('INSRT_INVOICE',@sqlstate,@errno,@text,sysdate());
          SET res_flag := 3;
          COMMIT;
    END;



START TRANSACTION;




IF INS_TYPE = 'A'

THEN



INSERT INTO smartsme.DC_INSRT_INVOICE (COMP_ID,INV_DATE , BUYR_ID, PROD_ID,QUANTITY,UNIT_PRICE,CGST_RATE,CGST_AMOUNT,SGST_RATE,SGST_AMOUNT,TOTAL_AMOUNT,SAC_CODE,BUYR_GSTIN,CREATE_DATE,UPDATE_DATE)
values(company_id,STR_TO_DATE(ip_inv_date,'%d/%m/%Y'),ip_buy_id,ip_prod_id,ip_quantity ,ip_unit_price , ip_cgst,ip_cgst_amt ,ip_sgst ,ip_sgst_amt,ip_total_amt,ip_sac_code ,ip_buy_gstin ,sysdate(),sysdate());

UPDATE smartsme.DC_INSRT_INVOICE SET INV_ID = concat('IN',INV_ID_SEQ) WHERE COMP_ID = company_id and PROD_ID = ip_prod_id;

SET res_flag := 1;



ELSEIF INS_TYPE = 'P'


THEN


UPDATE smartsme.DC_INSRT_INVOICE SET INV_DATE=STR_TO_DATE(ip_inv_date,'%d/%m/%Y') , SAC_CODE=ip_sac_code,QUANTITY=ip_quantity,UNIT_PRICE=ip_unit_price,CGST_RATE=ip_cgst,CGST_AMOUNT=ip_cgst_amt,SGST_RATE=ip_sgst,SGST_AMOUNT=ip_sgst_amt,TOTAL_AMOUNT=ip_total_amt,UPDATE_DATE=SYSDATE() WHERE INV_ID= ip_inv_id;

SET res_flag := 2;

END IF;

COMMIT;

END$$

CREATE DEFINER=`smartsmeusr`@`%` PROCEDURE `DC_INSRT_MACH_PROC` (`ins_type` CHAR(1), `company_id` VARCHAR(20), `mch_id` VARCHAR(20), `mch_name` VARCHAR(50), `mch_type` VARCHAR(30), `capcity` VARCHAR(10), `no_of_mach` INT, `modl` VARCHAR(30), `act_flag` CHAR(1), OUT `res_flag` INT)  BEGIN
DECLARE x  INT DEFAULT 0;
DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
      	
	GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
 	@errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	ROLLBACK;
INSERT INTO smartsme.DC_ALL_ERR VALUES ('INSRT_MACH',@sqlstate,@errno,@text,sysdate());
          SET res_flag := 3;
          COMMIT;
    END;



START TRANSACTION;

SET x=0;


IF INS_TYPE = 'A'

THEN

Start_Loop: LOOP

	IF x > no_of_mach-1 then
		LEAVE Start_Loop;
	END IF;

SET x=x+1;

INSERT INTO smartsme.DC_INSRT_MACH (COMP_ID,MACH_NAME , MACH_TYPE, CAPACITY,  MODEL,ACTIVE_FLAG,CREATE_DATE,UPDATE_DATE)
values(company_id,concat(mch_name,'_',x),mch_type,capcity,modl,'Y',sysdate(),sysdate());



UPDATE smartsme.DC_INSRT_MACH SET MACH_ID = concat('MA',MACH_ID_SEQ) WHERE MACH_NAME = concat(mch_name,'_',x);

SET res_flag := 1;

END LOOP;

ELSEIF INS_TYPE = 'P'


THEN


UPDATE smartsme.DC_INSRT_MACH SET MACH_NAME =mch_name , MACH_TYPE= mch_type,CAPACITY=capcity,MODEL=modl,active_flag=act_flag,UPDATE_DATE=SYSDATE() WHERE MACH_ID= mch_id;

SET res_flag := 2;

END IF;

COMMIT;

END$$

CREATE DEFINER=`smartsmeusr`@`%` PROCEDURE `DC_INSRT_ORD_PROC` (`ins_type` CHAR(1), `company_id` VARCHAR(20), `ip_ord_id` VARCHAR(20), `ip_prod_id` VARCHAR(20), `ip_buyr_id` VARCHAR(20), `ip_ord_status` VARCHAR(20), `ip_ord_date` VARCHAR(12), `ip_tar_date` VARCHAR(12), `ip_quantity` INT, `ip_price` DECIMAL(10,2), `ip_discount` DECIMAL(10,2), `ip_tot_price` DECIMAL(10,2), OUT `res_flag` INT)  BEGIN

DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
      	
	GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
 	@errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	ROLLBACK;
INSERT INTO smartsme.DC_ALL_ERR VALUES ('INSRT_ORDER',@sqlstate,@errno,@text,sysdate());
          SET res_flag := 3;
          COMMIT;
    END;



START TRANSACTION;




IF INS_TYPE = 'A'

THEN



INSERT INTO smartsme.DC_INSRT_ORDER (COMP_ID,PROD_ID , BUYR_ID,ORD_STATUS,ORD_DATE,TAR_DATE,ORD_QUANTITY ,PRICE,DISCOUNT ,TOTAL_PRICE,CREATE_DATE,UPDATE_DATE)
values(company_id,ip_prod_id,ip_buyr_id,ip_ord_status,STR_TO_DATE(ip_ord_date,'%d/%m/%Y'),STR_TO_DATE(ip_tar_date,'%d/%m/%Y'),ip_quantity,ip_price,ip_discount,ip_tot_price,sysdate(),sysdate());



UPDATE smartsme.DC_INSRT_ORDER SET ORD_ID = concat('OR',ORD_ID_SEQ) WHERE PROD_ID = ip_prod_id and BUYR_ID = ip_buyr_id and COMP_ID = company_id and ORD_STATUS='NEW';

INSERT INTO smartsme.DC_INSRT_ORDER_QUAN
VALUES ((SELECT ORD_ID FROM smartsme.DC_INSRT_ORDER WHERE PROD_ID = ip_prod_id and BUYR_ID = ip_buyr_id and COMP_ID = company_id and ORD_STATUS='NEW'),company_id,
ip_quantity,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,sysdate(),sysdate());


SET res_flag := 1;



ELSEIF INS_TYPE = 'P'


THEN


UPDATE smartsme.DC_INSRT_ORDER SET ORD_STATUS =ip_ord_status ,ORD_DATE= STR_TO_DATE(ip_ord_date,'%d/%m/%Y'),TAR_DATE=STR_TO_DATE(ip_tar_date,'%d/%m/%Y'),
ORD_QUANTITY =ip_quantity,PRICE=ip_price,DISCOUNT=ip_discount ,TOTAL_PRICE=ip_tot_price,UPDATE_DATE=SYSDATE() WHERE ORD_ID= ip_ord_id;

SET res_flag := 2;

END IF;

COMMIT;

END$$

CREATE DEFINER=`smartsmeusr`@`%` PROCEDURE `DC_INSRT_OTHR_PROC` (`company_id` VARCHAR(20), `order_id` VARCHAR(20), `str_ip1` INT, `str_acp1` INT, `str_rej1` INT, `str_ip2` INT, `str_acp2` INT, `str_rej2` INT, `str_ip3` INT, `str_acp3` INT, `str_rej3` INT, `str_ip4` INT, `str_acp4` INT, `str_rej4` INT, `str_ip5` INT, `str_acp5` INT, `str_rej5` INT, `str_ip6` INT, `str_acp6` INT, `str_rej6` INT, `str_ip7` INT, `str_acp7` INT, `str_rej7` INT, `str_ip8` INT, `str_acp8` INT, `str_rej8` INT, `str_ip9` INT, `str_acp9` INT, `str_rej9` INT, OUT `res_flag` INT)  BEGIN

DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
      	
	GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
 	@errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	ROLLBACK;
INSERT INTO smartsme.DC_ALL_ERR VALUES ('INSRT_OTHER',@sqlstate,@errno,@text,sysdate());
          SET res_flag := 3;
          COMMIT;
    END;



START TRANSACTION;


UPDATE smartsme.DC_INSRT_ORDER_QUAN SET 
FETTL_IP_QUANTITY=FETTL_IP_QUANTITY+str_ip1,
FETTL_AC_QUANTITY=FETTL_AC_QUANTITY+str_acp1,
FETTL_RJ_QUANTITY=FETTL_RJ_QUANTITY+str_rej1 ,
DRILL_IP_QUANTITY=DRILL_IP_QUANTITY+str_ip2 ,
DRILL_AC_QUANTITY=DRILL_AC_QUANTITY+str_acp2 ,
DRILL_RJ_QUANTITY=DRILL_RJ_QUANTITY+str_rej2, 
TAPP_IP_QUANTITY=TAPP_IP_QUANTITY+str_ip3 ,
TAPP_AC_QUANTITY=TAPP_AC_QUANTITY+str_acp3 ,
TAPP_RJ_QUANTITY=TAPP_RJ_QUANTITY+str_rej3 ,
MACH_IP_QUANTITY=MACH_IP_QUANTITY+str_ip4 ,
MACH_AC_QUANTITY=MACH_AC_QUANTITY+str_acp4, 
MACH_RJ_QUANTITY=MACH_RJ_QUANTITY+str_rej4 ,
TRIM_IP_QUANTITY=TRIM_IP_QUANTITY+str_ip5 ,
TRIM_AC_QUANTITY=TRIM_AC_QUANTITY+str_acp5 ,
TRIM_RJ_QUANTITY=TRIM_RJ_QUANTITY+str_rej5 ,
SHOTB_IP_QUANTITY=SHOTB_IP_QUANTITY+str_ip6 ,
SHOTB_AC_QUANTITY=SHOTB_AC_QUANTITY+str_acp6 ,
SHOTB_RJ_QUANTITY=SHOTB_RJ_QUANTITY+str_rej6 ,
PWDR_IP_QUANTITY=PWDR_IP_QUANTITY+str_ip7 ,
PWDR_AC_QUANTITY=PWDR_AC_QUANTITY+str_acp7 ,
PWDR_RJ_QUANTITY=PWDR_RJ_QUANTITY+str_rej7 ,
ASSMBL_IP_QUANTITY=ASSMBL_IP_QUANTITY+str_ip8, 
ASSMBL_AC_QUANTITY=ASSMBL_AC_QUANTITY+str_acp8, 
ASSMBL_RJ_QUANTITY=ASSMBL_RJ_QUANTITY+str_rej8 ,
QLINS_IP_QUANTITY=QLINS_IP_QUANTITY+str_ip9,
QLINS_AC_QUANTITY=QLINS_AC_QUANTITY+str_acp9, 
QLINS_RJ_QUANTITY=QLINS_RJ_QUANTITY+str_rej9,
UPDATE_DATE=sysdate()
WHERE ORD_ID=order_id AND COMP_ID=company_id;

SET res_flag := 1;


COMMIT;

END$$

CREATE DEFINER=`smartsmeusr`@`%` PROCEDURE `DC_INSRT_PROD_HRLY_PROC` (`company_id` VARCHAR(20), `ip_ord_id` VARCHAR(20), `ip_prod_name` VARCHAR(50), `ip_machine_id` VARCHAR(20), `ip_shift_start` VARCHAR(20), `ip_shift_end` VARCHAR(20), `ip_entry_type` VARCHAR(6), `ip_shift_type` CHAR(1), `ip_operator1` VARCHAR(20), `ip_operator2` VARCHAR(20), `ip_operator3` VARCHAR(20), `ip_supervisor` VARCHAR(20), `open_count` INT, `close_count` INT, `production` INT, `rejection` INT, `net_production` INT, `ip_incentive` CHAR(1), `ip_less80` VARCHAR(50), `ip_start1` VARCHAR(20), `ip_start2` VARCHAR(20), `ip_start3` VARCHAR(20), `ip_start4` VARCHAR(20), `ip_start5` VARCHAR(20), `ip_start6` VARCHAR(20), `ip_start7` VARCHAR(20), `ip_start8` VARCHAR(20), `ip_start9` VARCHAR(20), `ip_start10` VARCHAR(20), `ip_start11` VARCHAR(20), `ip_start12` VARCHAR(20), `ip_end1` VARCHAR(20), `ip_end2` VARCHAR(20), `ip_end3` VARCHAR(20), `ip_end4` VARCHAR(20), `ip_end5` VARCHAR(20), `ip_end6` VARCHAR(20), `ip_end7` VARCHAR(20), `ip_end8` VARCHAR(20), `ip_end9` VARCHAR(20), `ip_end10` VARCHAR(20), `ip_end11` VARCHAR(20), `ip_end12` VARCHAR(20), `ip_open1` INT, `ip_open2` INT, `ip_open3` INT, `ip_open4` INT, `ip_open5` INT, `ip_open6` INT, `ip_open7` INT, `ip_open8` INT, `ip_open9` INT, `ip_open10` INT, `ip_open11` INT, `ip_open12` INT, `ip_close1` INT, `ip_close2` INT, `ip_close3` INT, `ip_close4` INT, `ip_close5` INT, `ip_close6` INT, `ip_close7` INT, `ip_close8` INT, `ip_close9` INT, `ip_close10` INT, `ip_close11` INT, `ip_close12` INT, `ip_prod1` INT, `ip_prod2` INT, `ip_prod3` INT, `ip_prod4` INT, `ip_prod5` INT, `ip_prod6` INT, `ip_prod7` INT, `ip_prod8` INT, `ip_prod9` INT, `ip_prod10` INT, `ip_prod11` INT, `ip_prod12` INT, OUT `res_flag` INT)  BEGIN

DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
      	
	GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
 	@errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	ROLLBACK;
INSERT INTO smartsme.DC_ALL_ERR VALUES ('PROD_HRLY',@sqlstate,@errno,@text,sysdate());
          SET res_flag := 3;
          COMMIT;
    END;



START TRANSACTION;






INSERT INTO smartsme.DC_INSRT_PROD_SHIFT(ORD_ID,COMP_ID,PROD_NAME,MACHINE_ID,SHIFT_START_DATE ,SHIFT_END_DATE ,ENTRY_TYPE,SHIFT_TYPE,OPERATOR1,OPERATOR2 ,OPERATOR3 ,SUPERVISOR ,OPENING_COUNT 
,CLOSING_COUNT ,PRODUCTION ,REJECTION ,NET_PRODUCTION ,INCENTIVE ,LESS_80_REASON ,CREATE_DATE,UPDATE_DATE)
values(ip_ord_id,company_id,ip_prod_name,ip_machine_id,STR_TO_DATE(ip_start1,'%d/%m/%Y %H:%i'),STR_TO_DATE(ip_end12,'%d/%m/%Y %H:%i'),ip_entry_type,ip_shift_type,ip_operator1,ip_operator2,
ip_operator3,ip_supervisor,ip_open1,ip_close12,production,rejection,net_production,ip_incentive,ip_less80,sysdate(),sysdate());

UPDATE smartsme.DC_INSRT_PROD_SHIFT SET SHIFT_ID=CONCAT('SH',LAST_INSERT_ID()) where SHFT_ID_SEQ=LAST_INSERT_ID();

INSERT INTO DC_INSRT_PROD_HOURLY VALUES(ip_ord_id,company_id,CONCAT('SH',LAST_INSERT_ID()),STR_TO_DATE(ip_start1,'%d/%m/%Y %H:%i'),STR_TO_DATE(ip_end1,'%d/%m/%Y %H:%i'),ip_open1,ip_close1,ip_prod1);
INSERT INTO DC_INSRT_PROD_HOURLY VALUES(ip_ord_id,company_id,CONCAT('SH',LAST_INSERT_ID()),STR_TO_DATE(ip_start2,'%d/%m/%Y %H:%i'),STR_TO_DATE(ip_end2,'%d/%m/%Y %H:%i'),ip_open2,ip_close2,ip_prod2);
INSERT INTO DC_INSRT_PROD_HOURLY VALUES(ip_ord_id,company_id,CONCAT('SH',LAST_INSERT_ID()),STR_TO_DATE(ip_start3,'%d/%m/%Y %H:%i'),STR_TO_DATE(ip_end3,'%d/%m/%Y %H:%i'),ip_open3,ip_close3,ip_prod3);
INSERT INTO DC_INSRT_PROD_HOURLY VALUES(ip_ord_id,company_id,CONCAT('SH',LAST_INSERT_ID()),STR_TO_DATE(ip_start4,'%d/%m/%Y %H:%i'),STR_TO_DATE(ip_end4,'%d/%m/%Y %H:%i'),ip_open4,ip_close4,ip_prod4);
INSERT INTO DC_INSRT_PROD_HOURLY VALUES(ip_ord_id,company_id,CONCAT('SH',LAST_INSERT_ID()),STR_TO_DATE(ip_start5,'%d/%m/%Y %H:%i'),STR_TO_DATE(ip_end5,'%d/%m/%Y %H:%i'),ip_open5,ip_close5,ip_prod5);
INSERT INTO DC_INSRT_PROD_HOURLY VALUES(ip_ord_id,company_id,CONCAT('SH',LAST_INSERT_ID()),STR_TO_DATE(ip_start6,'%d/%m/%Y %H:%i'),STR_TO_DATE(ip_end6,'%d/%m/%Y %H:%i'),ip_open6,ip_close6,ip_prod6);
INSERT INTO DC_INSRT_PROD_HOURLY VALUES(ip_ord_id,company_id,CONCAT('SH',LAST_INSERT_ID()),STR_TO_DATE(ip_start7,'%d/%m/%Y %H:%i'),STR_TO_DATE(ip_end7,'%d/%m/%Y %H:%i'),ip_open7,ip_close7,ip_prod7);
INSERT INTO DC_INSRT_PROD_HOURLY VALUES(ip_ord_id,company_id,CONCAT('SH',LAST_INSERT_ID()),STR_TO_DATE(ip_start8,'%d/%m/%Y %H:%i'),STR_TO_DATE(ip_end8,'%d/%m/%Y %H:%i'),ip_open8,ip_close8,ip_prod8);
INSERT INTO DC_INSRT_PROD_HOURLY VALUES(ip_ord_id,company_id,CONCAT('SH',LAST_INSERT_ID()),STR_TO_DATE(ip_start9,'%d/%m/%Y %H:%i'),STR_TO_DATE(ip_end9,'%d/%m/%Y %H:%i'),ip_open9,ip_close9,ip_prod9);
INSERT INTO DC_INSRT_PROD_HOURLY VALUES(ip_ord_id,company_id,CONCAT('SH',LAST_INSERT_ID()),STR_TO_DATE(ip_start10,'%d/%m/%Y %H:%i'),STR_TO_DATE(ip_end10,'%d/%m/%Y %H:%i'),ip_open10,ip_close10,ip_prod10);
INSERT INTO DC_INSRT_PROD_HOURLY VALUES(ip_ord_id,company_id,CONCAT('SH',LAST_INSERT_ID()),STR_TO_DATE(ip_start11,'%d/%m/%Y %H:%i'),STR_TO_DATE(ip_end11,'%d/%m/%Y %H:%i'),ip_open11,ip_close11,ip_prod11);
INSERT INTO DC_INSRT_PROD_HOURLY VALUES(ip_ord_id,company_id,CONCAT('SH',LAST_INSERT_ID()),STR_TO_DATE(ip_start12,'%d/%m/%Y %H:%i'),STR_TO_DATE(ip_end12,'%d/%m/%Y %H:%i'),ip_open12,ip_close12,ip_prod12);

UPDATE smartsme.DC_INSRT_ORDER_QUAN SET PROD_QUANTITY=PROD_QUANTITY+net_production where COMP_ID=company_id and ORD_ID=ip_ord_id;
UPDATE smartsme.DC_INSRT_ORDER SET ORD_STATUS='In Progress' where ORD_ID=ip_ord_id;



SET res_flag := 1;



COMMIT;

END$$

CREATE DEFINER=`smartsmeusr`@`%` PROCEDURE `DC_INSRT_PROD_PROC` (`ins_type` CHAR(1), `company_id` VARCHAR(20), `ip_prod_id` VARCHAR(20), `ip_prod_name` VARCHAR(50), `ip_raw_mat` VARCHAR(30), `ip_weight` DECIMAL(10,4), `ip_wastage` INT, `ip_norms` DECIMAL(10,4), `ip_total_weight` DECIMAL(10,4), `ip_cavity` INT, `ip_shot_rate` DECIMAL(10,2), `ip_per_rate` DECIMAL(10,2), `ip_incen_lim` INT, OUT `res_flag` INT)  BEGIN

DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
      	
	GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
 	@errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	ROLLBACK;
INSERT INTO smartsme.DC_ALL_ERR VALUES ('INSRT_PRODUCT',@sqlstate,@errno,@text,sysdate());
          SET res_flag := 3;
          COMMIT;
    END;



START TRANSACTION;




IF INS_TYPE = 'A'

THEN



INSERT INTO smartsme.DC_INSRT_PRODUCT (COMP_ID,PROD_NAME , RAW_MATERIAL, WEIGHT,WASTAGE,NORMS,TOTAL_WEIGHT,CAVITY,SHOT_RATE,PER_ITEM_RATE,INCENTIVE_LIMIT,CREATE_DATE,UPDATE_DATE)
values(company_id,ip_prod_name,ip_raw_mat,ip_weight,ip_wastage ,ip_norms ,ip_total_weight ,ip_cavity ,ip_shot_rate ,ip_per_rate,ip_incen_lim,sysdate(),sysdate());



UPDATE smartsme.DC_INSRT_PRODUCT SET PROD_ID = concat('PR',PROD_ID_SEQ) WHERE PROD_NAME = ip_prod_name;

SET res_flag := 1;



ELSEIF INS_TYPE = 'P'


THEN


UPDATE smartsme.DC_INSRT_PRODUCT SET PROD_NAME =ip_prod_name , RAW_MATERIAL =ip_raw_mat,WEIGHT=ip_weight,WASTAGE=ip_wastage,NORMS=ip_norms,TOTAL_WEIGHT=ip_total_weight,CAVITY=ip_cavity,SHOT_RATE=ip_shot_rate,PER_ITEM_RATE=ip_per_rate,INCENTIVE_LIMIT=ip_incen_lim,UPDATE_DATE=SYSDATE() WHERE PROD_ID= ip_prod_id;

SET res_flag := 2;

END IF;

COMMIT;

END$$

CREATE DEFINER=`smartsmeusr`@`%` PROCEDURE `DC_INSRT_PROD_SHIFT_PROC` (`company_id` VARCHAR(20), `ip_ord_id` VARCHAR(20), `ip_prod_name` VARCHAR(50), `ip_machine_id` VARCHAR(20), `ip_shift_start` VARCHAR(20), `ip_shift_end` VARCHAR(20), `ip_entry_type` VARCHAR(6), `ip_shift_type` CHAR(1), `ip_operator1` VARCHAR(20), `ip_operator2` VARCHAR(20), `ip_operator3` VARCHAR(20), `ip_supervisor` VARCHAR(20), `open_count` INT, `close_count` INT, `production` INT, `rejection` INT, `net_production` INT, `ip_incentive` CHAR(1), `ip_less80` VARCHAR(50), OUT `res_flag` INT)  BEGIN

DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
      	
	GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
 	@errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	ROLLBACK;
INSERT INTO smartsme.DC_ALL_ERR VALUES ('PROD_SHFT',@sqlstate,@errno,@text,sysdate());
          SET res_flag := 3;
          COMMIT;
    END;



START TRANSACTION;






INSERT INTO smartsme.DC_INSRT_PROD_SHIFT(ORD_ID,COMP_ID,PROD_NAME,MACHINE_ID,SHIFT_START_DATE ,SHIFT_END_DATE ,ENTRY_TYPE,SHIFT_TYPE,OPERATOR1,OPERATOR2 ,OPERATOR3 ,SUPERVISOR ,OPENING_COUNT 
,CLOSING_COUNT ,PRODUCTION ,REJECTION ,NET_PRODUCTION ,INCENTIVE ,LESS_80_REASON ,CREATE_DATE,UPDATE_DATE)
values(ip_ord_id,company_id,ip_prod_name,ip_machine_id,STR_TO_DATE(ip_shift_start,'%d/%m/%Y %H:%i'),STR_TO_DATE(ip_shift_end,'%d/%m/%Y %H:%i'),ip_entry_type,ip_shift_type,ip_operator1,ip_operator2,
ip_operator3,ip_supervisor,open_count,close_count,production,rejection,net_production,ip_incentive,ip_less80,sysdate(),sysdate());

UPDATE smartsme.DC_INSRT_PROD_SHIFT SET SHIFT_ID=CONCAT('SH',LAST_INSERT_ID()) where SHFT_ID_SEQ=LAST_INSERT_ID();

UPDATE smartsme.DC_INSRT_ORDER_QUAN SET PROD_QUANTITY=PROD_QUANTITY+net_production where COMP_ID=company_id and ORD_ID=ip_ord_id;
UPDATE smartsme.DC_INSRT_ORDER SET ORD_STATUS='In Progress' where ORD_ID=ip_ord_id;



SET res_flag := 1;



COMMIT;

END$$

CREATE DEFINER=`smartsmeusr`@`%` PROCEDURE `DC_INSRT_SELR_PROC` (`ins_type` CHAR(1), `company_id` VARCHAR(20), `ip_selr_id` VARCHAR(20), `ip_selr_name` VARCHAR(50), `ip_selr_add` VARCHAR(100), `ip_selr_phone` VARCHAR(10), `ip_selr_email` VARCHAR(30), OUT `res_flag` INT)  BEGIN

DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
      	
	GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
 	@errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	ROLLBACK;
INSERT INTO smartsme.DC_ALL_ERR VALUES ('INSRT_SELLER',@sqlstate,@errno,@text,sysdate());
          SET res_flag := 3;
          COMMIT;
    END;



START TRANSACTION;




IF INS_TYPE = 'A'

THEN



INSERT INTO smartsme.DC_INSRT_SELLER (COMP_ID,SELR_NAME , SELR_ADDRESS, SELR_PHONE,SELR_EMAIL,CREATE_DATE,UPDATE_DATE)
values(company_id,ip_selr_name,ip_selr_add  ,ip_selr_phone ,ip_selr_email,sysdate(),sysdate());



UPDATE smartsme.DC_INSRT_SELLER SET SELR_ID = concat('SL',SELR_ID_SEQ) WHERE SELR_NAME = ip_selr_name;

SET res_flag := 1;



ELSEIF INS_TYPE = 'P'


THEN


UPDATE smartsme.DC_INSRT_SELLER SET SELR_NAME =ip_selr_name , SELR_ADDRESS =ip_selr_add,SELR_PHONE=ip_selr_phone,
SELR_EMAIL=ip_selr_email,UPDATE_DATE=SYSDATE() WHERE SELR_ID= ip_selr_id;

SET res_flag := 2;

END IF;

COMMIT;

END$$

CREATE DEFINER=`smartsmeusr`@`%` PROCEDURE `DC_INSRT_STOCK_PROC` (`company_id` VARCHAR(20), `ip_raw_mat` VARCHAR(20), `ip_selr_id` VARCHAR(20), `ip_stock_date` VARCHAR(20), `ip_bars` INT, `ip_weight` DECIMAL(10,4), OUT `res_flag` INT)  BEGIN
DECLARE COUNT_STK  INT;
DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
      	
	GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
 	@errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
	ROLLBACK;
INSERT INTO smartsme.DC_ALL_ERR VALUES ('INSRT_STOCK',@sqlstate,@errno,@text,sysdate());
          SET res_flag := 3;
          COMMIT;
    END;



START TRANSACTION;







INSERT INTO smartsme.DC_INSRT_STOCK (COMP_ID,SELR_ID , STOCK_DATE, RAW_MAT,NO_OF_BARS,WEIGHT,CREATE_DATE,UPDATE_DATE)
values(company_id,ip_selr_id,STR_TO_DATE(ip_stock_date,'%d/%m/%Y'),ip_raw_mat  ,ip_bars ,ip_weight,sysdate(),sysdate());



UPDATE smartsme.DC_INSRT_STOCK SET STOCK_ID =CONCAT('ST',LAST_INSERT_ID()) where STOCK_ID_SEQ=LAST_INSERT_ID();

SELECT COUNT(*) INTO COUNT_STK FROM smartsme.DC_INSRT_AVAIL_STOCK WHERE RAW_MAT=ip_raw_mat and COMP_ID=company_id;

IF COUNT_STK =0 THEN
INSERT INTO smartsme.DC_INSRT_AVAIL_STOCK(COMP_ID,RAW_MAT,TOTAL_WEIGHT,CREATE_DATE,UPDATE_DATE)
VALUES (COmpany_id,ip_raw_mat,ip_weight,sysdate(),sysdate());

ELSEIF COUNT_STK=1 THEN

UPDATE  smartsme.DC_INSRT_AVAIL_STOCK SET TOTAL_WEIGHT=TOTAL_WEIGHT+ip_weight WHERE RAW_MAT=ip_raw_mat and COMP_ID=company_id;

END IF;
SET res_flag := 1;



COMMIT;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `DC_ALL_ERR`
--

CREATE TABLE `DC_ALL_ERR` (
  `PROC` varchar(30) DEFAULT NULL,
  `SQL_STATE` varchar(20) DEFAULT NULL,
  `ERR_NO` varchar(20) DEFAULT NULL,
  `ERR_MSG` varchar(255) DEFAULT NULL,
  `CREATION_DATE` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `DC_ALL_ERR`
--

INSERT INTO `DC_ALL_ERR` (`PROC`, `SQL_STATE`, `ERR_NO`, `ERR_MSG`, `CREATION_DATE`) VALUES
('INSRT_COMP', '22001', '1406', 'Data too long for column \'OFFICE_PHONE\' at row 1', '2025-08-17'),
('INSRT_COMP', '22001', '1406', 'Data too long for column \'OFFICE_PHONE\' at row 1', '2025-08-17');

-- --------------------------------------------------------

--
-- Table structure for table `DC_EMP_ROLES`
--

CREATE TABLE `DC_EMP_ROLES` (
  `ROLE_ID` int(11) DEFAULT NULL,
  `ROLE_NAME` varchar(30) DEFAULT NULL,
  `ROLE_DESC` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `DC_EMP_ROLES`
--

INSERT INTO `DC_EMP_ROLES` (`ROLE_ID`, `ROLE_NAME`, `ROLE_DESC`) VALUES
(1, 'OWNER', 'Owner of the Company'),
(2, 'A/C MANAGER', 'Manager of Financial tasks'),
(3, 'ACCOUNTANT', 'Financial tasks operator'),
(4, 'PRODUCTION MANAGER', 'Manager of Production'),
(5, 'PRODUCTION INCHARGE', 'Incharge of Production'),
(6, 'SHIFT INCHARGE', 'Operator'),
(7, 'QUALITY INCHARGE', 'Quality inspection incharge'),
(8, 'CLIENT', 'Client'),
(9, 'DESPATCH CLERK', 'Stores despatch Clerk');

-- --------------------------------------------------------

--
-- Table structure for table `DC_EMP_ROLE_DTL`
--

CREATE TABLE `DC_EMP_ROLE_DTL` (
  `ROLE_ID` int(11) DEFAULT NULL,
  `MACHINE` int(11) DEFAULT NULL,
  `EMPLOYEE` int(11) DEFAULT NULL,
  `ORDERS` int(11) DEFAULT NULL,
  `STOCK_INWARD` int(11) DEFAULT NULL,
  `PRODUCT` int(11) DEFAULT NULL,
  `PRODUCTION` int(11) DEFAULT NULL,
  `PRE_INSPECTION` int(11) DEFAULT NULL,
  `FETTLING` int(11) DEFAULT NULL,
  `DRILLING` int(11) DEFAULT NULL,
  `TAPPING` int(11) DEFAULT NULL,
  `TRIMMING` int(11) DEFAULT NULL,
  `SHOT_BLASTING` int(11) DEFAULT NULL,
  `POWDER_COATING` int(11) DEFAULT NULL,
  `QUALITY_INSPECTION` int(11) DEFAULT NULL,
  `SHIPMENT` int(11) DEFAULT NULL,
  `INVOICE` int(11) DEFAULT NULL,
  `RECEIPT` int(11) DEFAULT NULL,
  `PAYMENT` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `DC_EMP_ROLE_DTL`
--

INSERT INTO `DC_EMP_ROLE_DTL` (`ROLE_ID`, `MACHINE`, `EMPLOYEE`, `ORDERS`, `STOCK_INWARD`, `PRODUCT`, `PRODUCTION`, `PRE_INSPECTION`, `FETTLING`, `DRILLING`, `TAPPING`, `TRIMMING`, `SHOT_BLASTING`, `POWDER_COATING`, `QUALITY_INSPECTION`, `SHIPMENT`, `INVOICE`, `RECEIPT`, `PAYMENT`) VALUES
(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
(2, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
(3, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
(4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0),
(5, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(6, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(7, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0),
(8, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0),
(9, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `DC_INSRT_AVAIL_STOCK`
--

CREATE TABLE `DC_INSRT_AVAIL_STOCK` (
  `COMP_ID` varchar(20) DEFAULT NULL,
  `RAW_MAT` varchar(20) DEFAULT NULL,
  `TOTAL_WEIGHT` decimal(10,4) DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `DC_INSRT_AVAIL_STOCK`
--

INSERT INTO `DC_INSRT_AVAIL_STOCK` (`COMP_ID`, `RAW_MAT`, `TOTAL_WEIGHT`, `CREATE_DATE`, `UPDATE_DATE`) VALUES
('AB1000000825', 'ADC-12', '1250.0000', '2025-09-16 07:15:59', '2025-09-16 07:15:59');

-- --------------------------------------------------------

--
-- Table structure for table `DC_INSRT_BREAKDOWN`
--

CREATE TABLE `DC_INSRT_BREAKDOWN` (
  `COMP_ID` varchar(20) DEFAULT NULL,
  `ORDER_ID` varchar(20) DEFAULT NULL,
  `BREAKDOWN_DATE` datetime DEFAULT NULL,
  `BREAKDOWN_HRS` int(11) DEFAULT NULL,
  `BREAKDOWN_RSN` varchar(100) DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `DC_INSRT_BUYER`
--

CREATE TABLE `DC_INSRT_BUYER` (
  `BUYR_ID_SEQ` int(11) NOT NULL,
  `BUYR_ID` varchar(20) DEFAULT NULL,
  `COMP_ID` varchar(20) DEFAULT NULL,
  `BUYR_NAME` varchar(50) DEFAULT NULL,
  `BUYR_ADDRESS` varchar(100) DEFAULT NULL,
  `BUYR_PHONE` varchar(10) DEFAULT NULL,
  `BUYR_EMAIL` varchar(30) DEFAULT NULL,
  `BUYR_GSTIN` varchar(20) DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `DC_INSRT_BUYER`
--

INSERT INTO `DC_INSRT_BUYER` (`BUYR_ID_SEQ`, `BUYR_ID`, `COMP_ID`, `BUYR_NAME`, `BUYR_ADDRESS`, `BUYR_PHONE`, `BUYR_EMAIL`, `BUYR_GSTIN`, `CREATE_DATE`, `UPDATE_DATE`) VALUES
(10000, 'BY10000', 'AB1000000825', 'scanner', 'abc', '546848848', 'ghsg23rrr@gmail.com', '7euuwrrr@gmail.com', '2025-09-16 07:18:14', '2025-09-16 07:18:14');

-- --------------------------------------------------------

--
-- Table structure for table `DC_INSRT_COMP`
--

CREATE TABLE `DC_INSRT_COMP` (
  `COMP_ID_SEQ` int(11) NOT NULL,
  `COMP_ID` varchar(12) DEFAULT NULL,
  `COMP_NAME` varchar(100) NOT NULL,
  `BUSINESS_CONS` varchar(20) NOT NULL,
  `COMPANY_TYPE` varchar(20) NOT NULL,
  `ADDRESS` varchar(255) DEFAULT NULL,
  `PINCODE` int(11) DEFAULT NULL,
  `PROP_NAME` varchar(30) NOT NULL,
  `DIRECT_PHONE` varchar(10) DEFAULT NULL,
  `OFFICE_PHONE` varchar(10) DEFAULT NULL,
  `MGMT_PHONE` varchar(10) DEFAULT NULL,
  `MAIL_ID` varchar(50) DEFAULT NULL,
  `NATURE_OF_BUSINESS` varchar(20) DEFAULT NULL,
  `AUTH_PERSON` varchar(30) DEFAULT NULL,
  `MOBILE_NO` varchar(10) DEFAULT NULL,
  `CREATE_DATE` datetime NOT NULL,
  `UPDATE_DATE` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `DC_INSRT_COMP`
--

INSERT INTO `DC_INSRT_COMP` (`COMP_ID_SEQ`, `COMP_ID`, `COMP_NAME`, `BUSINESS_CONS`, `COMPANY_TYPE`, `ADDRESS`, `PINCODE`, `PROP_NAME`, `DIRECT_PHONE`, `OFFICE_PHONE`, `MGMT_PHONE`, `MAIL_ID`, `NATURE_OF_BUSINESS`, `AUTH_PERSON`, `MOBILE_NO`, `CREATE_DATE`, `UPDATE_DATE`) VALUES
(100000, 'AB1000000825', 'ABC Private Limited', 'PROPRIETOR', 'SMALL SCALE', 'Chennai', 600106, 'Sakunthala', '65483279', '65483279', 'ghs628hb', 'Vinodeep123rrr@gmail.com', 'metal', 'Sakunthala', '8939642996', '2025-08-17 16:13:27', '2025-08-17 16:13:27');

-- --------------------------------------------------------

--
-- Table structure for table `DC_INSRT_DESPATCH`
--

CREATE TABLE `DC_INSRT_DESPATCH` (
  `DESP_ID_SEQ` int(11) NOT NULL,
  `PROD_ID` varchar(20) DEFAULT NULL,
  `COMP_ID` varchar(20) DEFAULT NULL,
  `ORDER_ID` varchar(20) DEFAULT NULL,
  `DESP_ID` varchar(20) DEFAULT NULL,
  `DESP_DATE` datetime DEFAULT NULL,
  `QUANTITY` int(11) DEFAULT NULL,
  `NO_OF_PACKS` int(11) DEFAULT NULL,
  `TOTAL_WEIGHT` decimal(10,4) DEFAULT NULL,
  `NORMAL_WEIGHT` decimal(10,4) DEFAULT NULL,
  `NORMS_WEIGHT` decimal(10,4) DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `DC_INSRT_DESPATCH`
--

INSERT INTO `DC_INSRT_DESPATCH` (`DESP_ID_SEQ`, `PROD_ID`, `COMP_ID`, `ORDER_ID`, `DESP_ID`, `DESP_DATE`, `QUANTITY`, `NO_OF_PACKS`, `TOTAL_WEIGHT`, `NORMAL_WEIGHT`, `NORMS_WEIGHT`, `CREATE_DATE`, `UPDATE_DATE`) VALUES
(1000009, 'PR1000000', 'AB1000000825', 'OR10000', 'DL1000009', '2025-09-16 00:00:00', 100, 10, '1000.0000', '10.0000', '2250.0000', '2025-09-16 07:20:02', '2025-09-16 07:20:02');

-- --------------------------------------------------------

--
-- Table structure for table `DC_INSRT_EMP`
--

CREATE TABLE `DC_INSRT_EMP` (
  `EMP_ID_SEQ` int(11) NOT NULL,
  `EMP_NAME` varchar(30) DEFAULT NULL,
  `MOBILE_NO` varchar(10) NOT NULL,
  `USERNAME` varchar(10) DEFAULT NULL,
  `HASH` varchar(255) DEFAULT NULL,
  `COMP_ID` varchar(20) DEFAULT NULL,
  `ROLE_ID` int(11) DEFAULT NULL,
  `SALARY` int(11) DEFAULT NULL,
  `ACTIVE_FLAG` char(1) DEFAULT NULL,
  `CREATE_DATE` datetime NOT NULL,
  `UPDATE_DATE` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `DC_INSRT_EMP`
--

INSERT INTO `DC_INSRT_EMP` (`EMP_ID_SEQ`, `EMP_NAME`, `MOBILE_NO`, `USERNAME`, `HASH`, `COMP_ID`, `ROLE_ID`, `SALARY`, `ACTIVE_FLAG`, `CREATE_DATE`, `UPDATE_DATE`) VALUES
(1000000, 'Sakunthala', '8939642996', 'Sa2996', '$2y$10$SUZF1NrulwM07qFMcZzrhu6YCGJH.JThjxIzDkbFyMXqnYwtr3mvu', 'AB1000000825', 1, 0, 'Y', '2025-08-17 16:13:27', '2025-08-17 16:41:22'),
(1000001, 'Test', '8870735098', 'Te5098', '$2y$10$pjQ//CCX9SdS7ecL2XZNsOpFKFjLr1jvp8tIJaZ2ozc7yeeszC/DG', 'AB1000000825', 1, 5000, 'Y', '2025-08-17 16:43:30', '2025-08-17 16:49:40'),
(1000002, 'sekar', '643646666', 'se6666', NULL, 'AB1000000825', 1, 10000, 'Y', '2025-09-16 07:25:05', '2025-09-16 07:25:05'),
(1000003, 'ramesh', '65166646', 'ra6646', NULL, 'AB1000000825', 4, 20000, 'Y', '2025-09-16 07:25:24', '2025-09-16 07:25:24'),
(1000004, 'guru', '3166166166', 'gu6166', NULL, 'AB1000000825', 9, 4000, 'Y', '2025-09-16 07:25:43', '2025-09-16 07:25:43');

-- --------------------------------------------------------

--
-- Table structure for table `DC_INSRT_INVOICE`
--

CREATE TABLE `DC_INSRT_INVOICE` (
  `INV_ID_SEQ` int(11) NOT NULL,
  `INV_ID` varchar(20) DEFAULT NULL,
  `INV_DATE` datetime DEFAULT NULL,
  `COMP_ID` varchar(20) DEFAULT NULL,
  `BUYR_ID` varchar(10) DEFAULT NULL,
  `PROD_ID` varchar(10) DEFAULT NULL,
  `QUANTITY` int(11) DEFAULT NULL,
  `UNIT_PRICE` decimal(10,2) DEFAULT NULL,
  `CGST_RATE` decimal(10,2) DEFAULT NULL,
  `CGST_AMOUNT` decimal(10,2) DEFAULT NULL,
  `SGST_RATE` decimal(10,2) DEFAULT NULL,
  `SGST_AMOUNT` decimal(10,2) DEFAULT NULL,
  `TOTAL_AMOUNT` decimal(10,2) DEFAULT NULL,
  `SAC_CODE` varchar(20) DEFAULT NULL,
  `BUYR_GSTIN` varchar(20) DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `DC_INSRT_INVOICE`
--

INSERT INTO `DC_INSRT_INVOICE` (`INV_ID_SEQ`, `INV_ID`, `INV_DATE`, `COMP_ID`, `BUYR_ID`, `PROD_ID`, `QUANTITY`, `UNIT_PRICE`, `CGST_RATE`, `CGST_AMOUNT`, `SGST_RATE`, `SGST_AMOUNT`, `TOTAL_AMOUNT`, `SAC_CODE`, `BUYR_GSTIN`, `CREATE_DATE`, `UPDATE_DATE`) VALUES
(10000000, 'IN10000000', '2025-09-16 00:00:00', 'AB1000000825', 'BY10000', 'PR1000000', 10, '125.00', '12.00', '150.00', '12.00', '150.00', '1550.00', 'tyeyyye', '7euuwrrr@gmail.com', '2025-09-16 07:18:57', '2025-09-16 07:18:57');

-- --------------------------------------------------------

--
-- Table structure for table `DC_INSRT_MACH`
--

CREATE TABLE `DC_INSRT_MACH` (
  `MACH_ID_SEQ` int(11) NOT NULL,
  `MACH_ID` varchar(20) DEFAULT NULL,
  `COMP_ID` varchar(20) DEFAULT NULL,
  `MACH_NAME` varchar(50) DEFAULT NULL,
  `MACH_TYPE` varchar(20) DEFAULT NULL,
  `CAPACITY` varchar(10) DEFAULT NULL,
  `MODEL` varchar(20) DEFAULT NULL,
  `ACTIVE_FLAG` char(1) DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `DC_INSRT_MACH`
--

INSERT INTO `DC_INSRT_MACH` (`MACH_ID_SEQ`, `MACH_ID`, `COMP_ID`, `MACH_NAME`, `MACH_TYPE`, `CAPACITY`, `MODEL`, `ACTIVE_FLAG`, `CREATE_DATE`, `UPDATE_DATE`) VALUES
(10000, 'MA10000', 'AB1000000825', 'castmoulder_1', 'ALUMINUM PRESSURE', '120', 'tx', 'Y', '2025-09-16 07:16:27', '2025-09-16 07:16:27'),
(10001, 'MA10001', 'AB1000000825', 'castmoulder_2', 'ALUMINUM PRESSURE', '120', 'tx', 'Y', '2025-09-16 07:16:27', '2025-09-16 07:16:27'),
(10002, 'MA10002', 'AB1000000825', 'castmoulder_3', 'ALUMINUM PRESSURE', '120', 'tx', 'Y', '2025-09-16 07:16:27', '2025-09-16 07:16:27'),
(10003, 'MA10003', 'AB1000000825', 'castmoulder_4', 'ALUMINUM PRESSURE', '120', 'tx', 'Y', '2025-09-16 07:16:27', '2025-09-16 07:16:27'),
(10004, 'MA10004', 'AB1000000825', 'castmoulder_5', 'ALUMINUM PRESSURE', '120', 'tx', 'Y', '2025-09-16 07:16:27', '2025-09-16 07:16:27'),
(10005, 'MA10005', 'AB1000000825', 'castmoulder_6', 'ALUMINUM PRESSURE', '120', 'tx', 'Y', '2025-09-16 07:16:27', '2025-09-16 07:16:27'),
(10006, 'MA10006', 'AB1000000825', 'castmoulder_7', 'ALUMINUM PRESSURE', '120', 'tx', 'Y', '2025-09-16 07:16:27', '2025-09-16 07:16:27'),
(10007, 'MA10007', 'AB1000000825', 'castmoulder_8', 'ALUMINUM PRESSURE', '120', 'tx', 'Y', '2025-09-16 07:16:27', '2025-09-16 07:16:27'),
(10008, 'MA10008', 'AB1000000825', 'castmoulder_9', 'ALUMINUM PRESSURE', '120', 'tx', 'Y', '2025-09-16 07:16:27', '2025-09-16 07:16:27'),
(10009, 'MA10009', 'AB1000000825', 'castmoulder_10', 'ALUMINUM PRESSURE', '120', 'tx', 'Y', '2025-09-16 07:16:27', '2025-09-16 07:16:27');

-- --------------------------------------------------------

--
-- Table structure for table `DC_INSRT_ORDER`
--

CREATE TABLE `DC_INSRT_ORDER` (
  `ORD_ID_SEQ` int(11) NOT NULL,
  `ORD_ID` varchar(20) DEFAULT NULL,
  `COMP_ID` varchar(20) DEFAULT NULL,
  `PROD_ID` varchar(20) DEFAULT NULL,
  `BUYR_ID` varchar(20) DEFAULT NULL,
  `ORD_STATUS` varchar(20) DEFAULT NULL,
  `ORD_DATE` datetime DEFAULT NULL,
  `TAR_DATE` datetime DEFAULT NULL,
  `ORD_QUANTITY` int(11) DEFAULT NULL,
  `PRICE` decimal(10,2) DEFAULT NULL,
  `DISCOUNT` decimal(10,2) DEFAULT NULL,
  `TOTAL_PRICE` decimal(10,2) DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `DC_INSRT_ORDER`
--

INSERT INTO `DC_INSRT_ORDER` (`ORD_ID_SEQ`, `ORD_ID`, `COMP_ID`, `PROD_ID`, `BUYR_ID`, `ORD_STATUS`, `ORD_DATE`, `TAR_DATE`, `ORD_QUANTITY`, `PRICE`, `DISCOUNT`, `TOTAL_PRICE`, `CREATE_DATE`, `UPDATE_DATE`) VALUES
(10000, 'OR10000', 'AB1000000825', 'PR1000000', 'BY10000', 'In Progress', '2025-09-16 00:00:00', '2025-09-16 00:00:00', 20, '125.00', '1.00', '2475.00', '2025-09-16 07:18:30', '2025-09-16 07:18:30');

-- --------------------------------------------------------

--
-- Table structure for table `DC_INSRT_ORDER_QUAN`
--

CREATE TABLE `DC_INSRT_ORDER_QUAN` (
  `ORD_ID` varchar(20) DEFAULT NULL,
  `COMP_ID` varchar(20) DEFAULT NULL,
  `ORD_QUANTITY` int(11) DEFAULT NULL,
  `PROD_QUANTITY` int(11) DEFAULT NULL,
  `FETTL_IP_QUANTITY` int(11) DEFAULT NULL,
  `FETTL_AC_QUANTITY` int(11) DEFAULT NULL,
  `FETTL_RJ_QUANTITY` int(11) DEFAULT NULL,
  `DRILL_IP_QUANTITY` int(11) DEFAULT NULL,
  `DRILL_AC_QUANTITY` int(11) DEFAULT NULL,
  `DRILL_RJ_QUANTITY` int(11) DEFAULT NULL,
  `TAPP_IP_QUANTITY` int(11) DEFAULT NULL,
  `TAPP_AC_QUANTITY` int(11) DEFAULT NULL,
  `TAPP_RJ_QUANTITY` int(11) DEFAULT NULL,
  `MACH_IP_QUANTITY` int(11) DEFAULT NULL,
  `MACH_AC_QUANTITY` int(11) DEFAULT NULL,
  `MACH_RJ_QUANTITY` int(11) DEFAULT NULL,
  `TRIM_IP_QUANTITY` int(11) DEFAULT NULL,
  `TRIM_AC_QUANTITY` int(11) DEFAULT NULL,
  `TRIM_RJ_QUANTITY` int(11) DEFAULT NULL,
  `SHOTB_IP_QUANTITY` int(11) DEFAULT NULL,
  `SHOTB_AC_QUANTITY` int(11) DEFAULT NULL,
  `SHOTB_RJ_QUANTITY` int(11) DEFAULT NULL,
  `PWDR_IP_QUANTITY` int(11) DEFAULT NULL,
  `PWDR_AC_QUANTITY` int(11) DEFAULT NULL,
  `PWDR_RJ_QUANTITY` int(11) DEFAULT NULL,
  `ASSMBL_IP_QUANTITY` int(11) DEFAULT NULL,
  `ASSMBL_AC_QUANTITY` int(11) DEFAULT NULL,
  `ASSMBL_RJ_QUANTITY` int(11) DEFAULT NULL,
  `QLINS_IP_QUANTITY` int(11) DEFAULT NULL,
  `QLINS_AC_QUANTITY` int(11) DEFAULT NULL,
  `QLINS_RJ_QUANTITY` int(11) DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `DC_INSRT_ORDER_QUAN`
--

INSERT INTO `DC_INSRT_ORDER_QUAN` (`ORD_ID`, `COMP_ID`, `ORD_QUANTITY`, `PROD_QUANTITY`, `FETTL_IP_QUANTITY`, `FETTL_AC_QUANTITY`, `FETTL_RJ_QUANTITY`, `DRILL_IP_QUANTITY`, `DRILL_AC_QUANTITY`, `DRILL_RJ_QUANTITY`, `TAPP_IP_QUANTITY`, `TAPP_AC_QUANTITY`, `TAPP_RJ_QUANTITY`, `MACH_IP_QUANTITY`, `MACH_AC_QUANTITY`, `MACH_RJ_QUANTITY`, `TRIM_IP_QUANTITY`, `TRIM_AC_QUANTITY`, `TRIM_RJ_QUANTITY`, `SHOTB_IP_QUANTITY`, `SHOTB_AC_QUANTITY`, `SHOTB_RJ_QUANTITY`, `PWDR_IP_QUANTITY`, `PWDR_AC_QUANTITY`, `PWDR_RJ_QUANTITY`, `ASSMBL_IP_QUANTITY`, `ASSMBL_AC_QUANTITY`, `ASSMBL_RJ_QUANTITY`, `QLINS_IP_QUANTITY`, `QLINS_AC_QUANTITY`, `QLINS_RJ_QUANTITY`, `CREATE_DATE`, `UPDATE_DATE`) VALUES
('OR10000', 'AB1000000825', 20, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2025-09-16 07:18:30', '2025-09-16 07:18:30');

-- --------------------------------------------------------

--
-- Table structure for table `DC_INSRT_PRODUCT`
--

CREATE TABLE `DC_INSRT_PRODUCT` (
  `PROD_ID_SEQ` int(11) NOT NULL,
  `PROD_ID` varchar(20) DEFAULT NULL,
  `COMP_ID` varchar(20) DEFAULT NULL,
  `PROD_NAME` varchar(50) DEFAULT NULL,
  `RAW_MATERIAL` varchar(20) DEFAULT NULL,
  `WEIGHT` decimal(10,4) DEFAULT NULL,
  `WASTAGE` int(11) DEFAULT NULL,
  `NORMS` decimal(10,4) DEFAULT NULL,
  `TOTAL_WEIGHT` decimal(10,4) DEFAULT NULL,
  `CAVITY` int(11) DEFAULT NULL,
  `SHOT_RATE` decimal(10,2) DEFAULT NULL,
  `PER_ITEM_RATE` decimal(10,2) DEFAULT NULL,
  `INCENTIVE_LIMIT` int(11) DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `DC_INSRT_PRODUCT`
--

INSERT INTO `DC_INSRT_PRODUCT` (`PROD_ID_SEQ`, `PROD_ID`, `COMP_ID`, `PROD_NAME`, `RAW_MATERIAL`, `WEIGHT`, `WASTAGE`, `NORMS`, `TOTAL_WEIGHT`, `CAVITY`, `SHOT_RATE`, `PER_ITEM_RATE`, `INCENTIVE_LIMIT`, `CREATE_DATE`, `UPDATE_DATE`) VALUES
(1000000, 'PR1000000', 'AB1000000825', 'ygf', 'ADC-12', '10.0000', 125, '12.5000', '22.5000', 10, '2.00', '0.20', 1, '2025-09-16 07:17:33', '2025-09-16 07:17:33');

-- --------------------------------------------------------

--
-- Table structure for table `DC_INSRT_PROD_HOURLY`
--

CREATE TABLE `DC_INSRT_PROD_HOURLY` (
  `ORD_ID` varchar(20) DEFAULT NULL,
  `COMP_ID` varchar(20) DEFAULT NULL,
  `SHIFT_ID` varchar(20) DEFAULT NULL,
  `SHIFT_START_TIME` datetime DEFAULT NULL,
  `SHIFT_END_TIME` datetime DEFAULT NULL,
  `OPENING_COUNT` int(11) DEFAULT NULL,
  `CLOSING_COUNT` int(11) DEFAULT NULL,
  `PRODUCTION` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `DC_INSRT_PROD_SHIFT`
--

CREATE TABLE `DC_INSRT_PROD_SHIFT` (
  `SHFT_ID_SEQ` int(11) NOT NULL,
  `ORD_ID` varchar(20) DEFAULT NULL,
  `COMP_ID` varchar(20) DEFAULT NULL,
  `SHIFT_ID` varchar(20) DEFAULT NULL,
  `PROD_NAME` varchar(50) DEFAULT NULL,
  `MACHINE_ID` varchar(20) DEFAULT NULL,
  `SHIFT_START_DATE` datetime DEFAULT NULL,
  `SHIFT_END_DATE` datetime DEFAULT NULL,
  `ENTRY_TYPE` varchar(6) DEFAULT NULL,
  `SHIFT_TYPE` char(1) DEFAULT NULL,
  `OPERATOR1` varchar(20) DEFAULT NULL,
  `OPERATOR2` varchar(20) DEFAULT NULL,
  `OPERATOR3` varchar(20) DEFAULT NULL,
  `SUPERVISOR` varchar(20) DEFAULT NULL,
  `OPENING_COUNT` int(11) DEFAULT NULL,
  `CLOSING_COUNT` int(11) DEFAULT NULL,
  `PRODUCTION` int(11) DEFAULT NULL,
  `REJECTION` int(11) DEFAULT NULL,
  `NET_PRODUCTION` int(11) DEFAULT NULL,
  `INCENTIVE` char(1) DEFAULT NULL,
  `LESS_80_REASON` varchar(50) DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `DC_INSRT_PROD_SHIFT`
--

INSERT INTO `DC_INSRT_PROD_SHIFT` (`SHFT_ID_SEQ`, `ORD_ID`, `COMP_ID`, `SHIFT_ID`, `PROD_NAME`, `MACHINE_ID`, `SHIFT_START_DATE`, `SHIFT_END_DATE`, `ENTRY_TYPE`, `SHIFT_TYPE`, `OPERATOR1`, `OPERATOR2`, `OPERATOR3`, `SUPERVISOR`, `OPENING_COUNT`, `CLOSING_COUNT`, `PRODUCTION`, `REJECTION`, `NET_PRODUCTION`, `INCENTIVE`, `LESS_80_REASON`, `CREATE_DATE`, `UPDATE_DATE`) VALUES
(10000000, 'OR10000', 'AB1000000825', 'SH10000000', 'ygf', 'MA10000', '2025-09-16 00:00:00', '2025-09-16 08:00:00', 'Shift', '1', '1000004', '1000004', '', '1000003', 0, 20, 20, 2, 18, 'Y', '', '2025-09-16 07:29:45', '2025-09-16 07:29:45');

-- --------------------------------------------------------

--
-- Table structure for table `DC_INSRT_SELLER`
--

CREATE TABLE `DC_INSRT_SELLER` (
  `SELR_ID_SEQ` int(11) NOT NULL,
  `SELR_ID` varchar(20) DEFAULT NULL,
  `COMP_ID` varchar(20) DEFAULT NULL,
  `SELR_NAME` varchar(50) DEFAULT NULL,
  `SELR_ADDRESS` varchar(100) DEFAULT NULL,
  `SELR_PHONE` varchar(10) DEFAULT NULL,
  `SELR_EMAIL` varchar(30) DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `DC_INSRT_SELLER`
--

INSERT INTO `DC_INSRT_SELLER` (`SELR_ID_SEQ`, `SELR_ID`, `COMP_ID`, `SELR_NAME`, `SELR_ADDRESS`, `SELR_PHONE`, `SELR_EMAIL`, `CREATE_DATE`, `UPDATE_DATE`) VALUES
(10000, 'SL10000', 'AB1000000825', 'test1', 'abc', '5468484888', 'sell123rrr@gmail.com', '2025-09-16 07:15:44', '2025-09-16 07:15:44');

-- --------------------------------------------------------

--
-- Table structure for table `DC_INSRT_STOCK`
--

CREATE TABLE `DC_INSRT_STOCK` (
  `STOCK_ID_SEQ` int(11) NOT NULL,
  `COMP_ID` varchar(20) DEFAULT NULL,
  `SELR_ID` varchar(20) DEFAULT NULL,
  `STOCK_ID` varchar(20) DEFAULT NULL,
  `STOCK_DATE` datetime DEFAULT NULL,
  `RAW_MAT` varchar(20) DEFAULT NULL,
  `NO_OF_BARS` int(11) DEFAULT NULL,
  `WEIGHT` decimal(10,4) DEFAULT NULL,
  `CREATE_DATE` datetime DEFAULT NULL,
  `UPDATE_DATE` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `DC_INSRT_STOCK`
--

INSERT INTO `DC_INSRT_STOCK` (`STOCK_ID_SEQ`, `COMP_ID`, `SELR_ID`, `STOCK_ID`, `STOCK_DATE`, `RAW_MAT`, `NO_OF_BARS`, `WEIGHT`, `CREATE_DATE`, `UPDATE_DATE`) VALUES
(1000000, 'AB1000000825', 'SL10000', 'ST1000000', '2025-09-16 00:00:00', 'ADC-12', 25, '1250.0000', '2025-09-16 07:15:59', '2025-09-16 07:15:59');

-- --------------------------------------------------------

--
-- Table structure for table `USERS`
--

CREATE TABLE `USERS` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `place` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `USERS`
--

INSERT INTO `USERS` (`id`, `name`, `place`) VALUES
(1, 'vino', 'pudukkottai'),
(1, 'vindepth', 'chennai');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `DC_INSRT_BUYER`
--
ALTER TABLE `DC_INSRT_BUYER`
  ADD PRIMARY KEY (`BUYR_ID_SEQ`);

--
-- Indexes for table `DC_INSRT_COMP`
--
ALTER TABLE `DC_INSRT_COMP`
  ADD PRIMARY KEY (`COMP_ID_SEQ`);

--
-- Indexes for table `DC_INSRT_DESPATCH`
--
ALTER TABLE `DC_INSRT_DESPATCH`
  ADD PRIMARY KEY (`DESP_ID_SEQ`);

--
-- Indexes for table `DC_INSRT_EMP`
--
ALTER TABLE `DC_INSRT_EMP`
  ADD PRIMARY KEY (`EMP_ID_SEQ`);

--
-- Indexes for table `DC_INSRT_INVOICE`
--
ALTER TABLE `DC_INSRT_INVOICE`
  ADD PRIMARY KEY (`INV_ID_SEQ`);

--
-- Indexes for table `DC_INSRT_MACH`
--
ALTER TABLE `DC_INSRT_MACH`
  ADD PRIMARY KEY (`MACH_ID_SEQ`);

--
-- Indexes for table `DC_INSRT_ORDER`
--
ALTER TABLE `DC_INSRT_ORDER`
  ADD PRIMARY KEY (`ORD_ID_SEQ`);

--
-- Indexes for table `DC_INSRT_PRODUCT`
--
ALTER TABLE `DC_INSRT_PRODUCT`
  ADD PRIMARY KEY (`PROD_ID_SEQ`);

--
-- Indexes for table `DC_INSRT_PROD_SHIFT`
--
ALTER TABLE `DC_INSRT_PROD_SHIFT`
  ADD PRIMARY KEY (`SHFT_ID_SEQ`);

--
-- Indexes for table `DC_INSRT_SELLER`
--
ALTER TABLE `DC_INSRT_SELLER`
  ADD PRIMARY KEY (`SELR_ID_SEQ`);

--
-- Indexes for table `DC_INSRT_STOCK`
--
ALTER TABLE `DC_INSRT_STOCK`
  ADD PRIMARY KEY (`STOCK_ID_SEQ`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `DC_INSRT_BUYER`
--
ALTER TABLE `DC_INSRT_BUYER`
  MODIFY `BUYR_ID_SEQ` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;
--
-- AUTO_INCREMENT for table `DC_INSRT_COMP`
--
ALTER TABLE `DC_INSRT_COMP`
  MODIFY `COMP_ID_SEQ` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100001;
--
-- AUTO_INCREMENT for table `DC_INSRT_DESPATCH`
--
ALTER TABLE `DC_INSRT_DESPATCH`
  MODIFY `DESP_ID_SEQ` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000010;
--
-- AUTO_INCREMENT for table `DC_INSRT_EMP`
--
ALTER TABLE `DC_INSRT_EMP`
  MODIFY `EMP_ID_SEQ` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000005;
--
-- AUTO_INCREMENT for table `DC_INSRT_INVOICE`
--
ALTER TABLE `DC_INSRT_INVOICE`
  MODIFY `INV_ID_SEQ` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10000001;
--
-- AUTO_INCREMENT for table `DC_INSRT_MACH`
--
ALTER TABLE `DC_INSRT_MACH`
  MODIFY `MACH_ID_SEQ` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10010;
--
-- AUTO_INCREMENT for table `DC_INSRT_ORDER`
--
ALTER TABLE `DC_INSRT_ORDER`
  MODIFY `ORD_ID_SEQ` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;
--
-- AUTO_INCREMENT for table `DC_INSRT_PRODUCT`
--
ALTER TABLE `DC_INSRT_PRODUCT`
  MODIFY `PROD_ID_SEQ` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000001;
--
-- AUTO_INCREMENT for table `DC_INSRT_PROD_SHIFT`
--
ALTER TABLE `DC_INSRT_PROD_SHIFT`
  MODIFY `SHFT_ID_SEQ` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10000001;
--
-- AUTO_INCREMENT for table `DC_INSRT_SELLER`
--
ALTER TABLE `DC_INSRT_SELLER`
  MODIFY `SELR_ID_SEQ` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;
--
-- AUTO_INCREMENT for table `DC_INSRT_STOCK`
--
ALTER TABLE `DC_INSRT_STOCK`
  MODIFY `STOCK_ID_SEQ` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000001;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
