/*
SQLyog Ultimate v9.63 
MySQL - 5.5.5-10.1.38-MariaDB : Database - udaparcial2
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`udaparcial2` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `udaparcial2`;

/*Table structure for table `domicilio` */

DROP TABLE IF EXISTS `domicilio`;

CREATE TABLE `domicilio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `calle` varchar(255) DEFAULT NULL,
  `numero` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=latin1;

/*Data for the table `domicilio` */

insert  into `domicilio`(`id`,`calle`,`numero`) values (47,'Avellaneda',250),(48,'Lima',1050),(49,'Jardin',320);

/*Table structure for table `persona` */

DROP TABLE IF EXISTS `persona`;

CREATE TABLE `persona` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `apellido` varchar(255) DEFAULT NULL,
  `cuil` int(11) NOT NULL,
  `edad` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `pers_fk_dom` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKro2mc1u64xupiefccmvw8a8i0` (`pers_fk_dom`),
  CONSTRAINT `FKro2mc1u64xupiefccmvw8a8i0` FOREIGN KEY (`pers_fk_dom`) REFERENCES `domicilio` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

/*Data for the table `persona` */

insert  into `persona`(`id`,`apellido`,`cuil`,`edad`,`nombre`,`pers_fk_dom`) values (1,'Ortiz',123456,20,'Tomás',47),(5,'Martinez',412412,21,'Juan',48),(17,'Lopez',123123,25,'Sofia',49);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
