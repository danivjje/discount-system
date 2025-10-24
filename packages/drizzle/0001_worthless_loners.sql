ALTER TABLE `customers` MODIFY COLUMN `phone` char(12) NOT NULL;--> statement-breakpoint
ALTER TABLE `customers` MODIFY COLUMN `total_sum` decimal(10,2) NOT NULL;--> statement-breakpoint
ALTER TABLE `customers` MODIFY COLUMN `bonuses` decimal(10,2) NOT NULL;