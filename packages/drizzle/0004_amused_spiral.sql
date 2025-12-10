CREATE TABLE `verification_codes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`phone` char(12) NOT NULL,
	`code` text NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `verification_codes_id` PRIMARY KEY(`id`)
);
