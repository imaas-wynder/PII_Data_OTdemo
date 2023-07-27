CREATE TABLE `imservicesdb`.`lab_reports` (
  `report_id` int NOT NULL AUTO_INCREMENT COMMENT 'Auto generated id',
  `patient_name` varchar(45) NOT NULL COMMENT 'Patient name',
  `patient_dob` datetime NOT NULL COMMENT 'Patient date of birth',
  `physician_name` varchar(45) DEFAULT NULL COMMENT 'Referring physician',
  `accession_number` varchar(45) DEFAULT NULL COMMENT 'Lab report accession number',
  `date_collected` datetime NOT NULL COMMENT 'Date sample collected',
  `date_received` datetime NOT NULL COMMENT 'Date sample received by lab',
  `date_completed` datetime NOT NULL COMMENT 'Date testing completed',
  `lab_name` varchar(45) DEFAULT NULL COMMENT 'Lab name',
  `lab_address` varchar(45) DEFAULT NULL COMMENT 'Lab address',
  `lab_phone` varchar(45) DEFAULT NULL COMMENT 'Lab phone number',
  PRIMARY KEY (`report_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table contains data extracted from lab_reports using OpenText Capture Service';
