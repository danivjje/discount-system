CREATE TABLE `app_config` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(30) NOT NULL,
	`value` json,
	CONSTRAINT `app_config_id` PRIMARY KEY(`id`),
	CONSTRAINT `app_config_key_unique` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `customers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`phone` varchar(12) NOT NULL,
	`total_sum` decimal(10,2) DEFAULT 0,
	`bonuses` decimal(10,2) DEFAULT 0,
	CONSTRAINT `customers_id` PRIMARY KEY(`id`),
	CONSTRAINT `customers_phone_unique` UNIQUE(`phone`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(16) NOT NULL,
	`password` text NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
