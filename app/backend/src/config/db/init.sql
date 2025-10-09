-- Create database if not exists
CREATE DATABASE IF NOT EXISTS restaurant;
USE restaurant;

-- Table structure for table `roles`
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data for table `roles`
INSERT INTO `roles` VALUES 
(4,'customer'),
(2,'owner'),
(3,'staff'),
(1,'super_admin');

-- Table structure for table `users`
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int NOT NULL,
  `email_status` tinyint(1) DEFAULT '0' COMMENT '0=not_verified,1=pending,2=verified,3=failed',
  `mobile_status` tinyint(1) DEFAULT '0' COMMENT '0=not_verified,1=pending,2=verified,3=failed',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `mobile` (`mobile`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data for table `users` 
-- INSERT INTO `users` VALUES 
-- (13,'test0012','arjund.albiorix@gmail.com','9876543220',
-- '$2b$10$hX7DAX8DApdLC277zaWzw.JfysX5rJv9pamYPWfbCNHt804PoPorW',4,2,0,
-- '2025-09-08 12:49:20','2025-09-08 12:49:44');

-- Table structure for table `verification_tokens`
DROP TABLE IF EXISTS `verification_tokens`;
CREATE TABLE `verification_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `type` enum('email','mobile') NOT NULL DEFAULT 'email',
  `expires_at` datetime NOT NULL,
  `used` tinyint(1) DEFAULT '0' COMMENT '0 = not used, 1 = used',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_unique` (`token`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `verification_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data for table `verification_tokens`
