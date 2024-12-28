-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: telemed_db
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `admins_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`admins_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'admin','hashedpassword123','SuperAdmin'),(22,'admin1','hashedpasswordadmin1','SuperAdmin'),(23,'admin2','hashedpasswordadmin2','Manager');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `appointments_id` int NOT NULL AUTO_INCREMENT,
  `patients_id` int DEFAULT NULL,
  `doctors_id` int DEFAULT NULL,
  `appointment_date` varchar(45) NOT NULL,
  `status` enum('Scheduled','Completed','Cancelled') DEFAULT 'Scheduled',
  PRIMARY KEY (`appointments_id`),
  KEY `patients_id_idx` (`patients_id`),
  KEY `doctors_id_idx` (`doctors_id`),
  CONSTRAINT `patients_id` FOREIGN KEY (`patients_id`) REFERENCES `patients` (`patients_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,5,9,'2024-12-05','Scheduled'),(2,6,11,'2024-12-06','Completed'),(3,3,7,'2024-12-07','Cancelled');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors` (
  `doctors_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `specialization` varchar(45) NOT NULL,
  `email_address` varchar(45) DEFAULT NULL,
  `phone_number` varchar(50) NOT NULL,
  `schedule` varchar(45) NOT NULL,
  PRIMARY KEY (`doctors_id`),
  UNIQUE KEY `email_address_UNIQUE` (`email_address`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (1,'Dr. Alice','Brenan','Cardiology','alice.brenan@example.com','987654321','Monday, Wednesday, Friday'),(7,'David','Williams','Cardiologist','david.williams@example.com','1231231234','Mon-Wed: 9am-5pm'),(8,'Emily','Davis','Dermatologist','emily.davis@example.com','2342342345','Tue-Thu: 10am-4pm'),(9,'Frank','Garcia','Pediatrician','frank.garcia@example.com','3453453456','Mon-Fri: 8am-2pm'),(10,'Camilla','Rockbell','Gynaecologist','cam.rockbell@example.com','3664453456','Mon-Thur: 9am-3pm'),(11,'Louis','Armstrong','Neurosurgeon','lou.armstrong@example.com','3453456848','Mon,Wed,Fri: 10am-3pm');
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `patients_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email_address` varchar(50) DEFAULT NULL,
  `password_hash` varchar(45) NOT NULL,
  `phone_number` varchar(45) NOT NULL,
  `date_of_birth` varchar(45) DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `address` varchar(45) NOT NULL,
  PRIMARY KEY (`patients_id`),
  UNIQUE KEY `patientscol_UNIQUE` (`email_address`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (1,'John','Booth','john.booth@example.com','hashedpassword123','1234567890','1990-01-01','Male','123 Main St'),(2,'Alice','Smith','alice.smith@example.com','hashedpassword1','9876543210','1985-07-15','Female','456 Elm St'),(3,'Bob','Johnson','bob.johnson@example.com','hashedpassword2','8765432109','1992-03-22','Male','789 Pine Ave'),(4,'Cathy','Brown','cathy.brown@example.com','hashedpassword3','7654321098','1998-11-08','Female','101 Maple Rd'),(5,'Roy','Mustang','roy.mustang@example.com','hashedpassword3','7655921098','1996-11-28','Male','101 Oak Rd'),(6,'Edward','Elric','ed.elric@example.com','hashedpassword3','7655925698','2000-01-08','Male','69 Oak St'),(7,'May','Hawkeye','may.hawk@example.com','hashedpassword3','7655926848','1998-11-18','Female','101 Oak Rd'),(8,'Alphose','Elric','al.elric@example.com','hashedpassword3','7655305698','2001-10-10','Male','69 Oak St');
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-22 12:00:22
