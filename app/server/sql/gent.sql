CREATE DATABASE IF NOT EXISTS `gent`;

use `gent`;

DROP TABLE IF EXISTS `stories`;

CREATE TABLE `basons` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
)
