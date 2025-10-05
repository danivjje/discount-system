/*
  Warnings:

  - You are about to alter the column `bonuses` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to drop the column `approved` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `AppConfig` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `customers` MODIFY `bonuses` DECIMAL(65, 30) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `approved`;

-- DropTable
DROP TABLE `AppConfig`;

-- CreateTable
CREATE TABLE `app_config` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(191) NOT NULL,
    `value` JSON NULL,

    UNIQUE INDEX `app_config_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
