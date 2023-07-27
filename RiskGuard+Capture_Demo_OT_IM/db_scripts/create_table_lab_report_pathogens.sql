CREATE TABLE `imservicesdb`.`lab_report_pathogens` (
  `pathogen_id` int NOT NULL AUTO_INCREMENT COMMENT 'Auto generated id',
  `report_id` int NOT NULL COMMENT 'Report id (FK)',
  `pathogen_type` varchar(45) NOT NULL COMMENT 'Type of pathogen',
  `pathogen_name` varchar(45) NOT NULL COMMENT 'Name of the pathogen',
  `pathogen_result` varchar(45) NOT NULL COMMENT 'Test result',
  `pathogen_expected` varchar(45) NOT NULL COMMENT 'Normal readings',
  `pathogen_indicator` varchar(45) DEFAULT NULL COMMENT 'High/Low indicator',
  PRIMARY KEY (`pathogen_id`),
  KEY `report_id_idx` (`report_id`),
  CONSTRAINT `fk_report_id` FOREIGN KEY (`report_id`) REFERENCES `lab_reports` (`report_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table contains data extracted from lab_reports using OpenText Capture Service';
