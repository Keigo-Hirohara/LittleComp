-- Setup MySQL Database server!
-- This will be used for running Docker container later 
CREATE DATABASE IF NOT EXISTS `gent`;

use `gent`;

DROP TABLE IF EXISTS `stories`;

CREATE TABLE `stories` (
  `id` MEDIUMINT NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (id)
)
