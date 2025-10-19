/*
  Warnings:

  - You are about to alter the column `bonuses` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,2)`.
  - You are about to alter the column `totalSum` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,2)`.

*/
-- AlterTable
ALTER TABLE `customers` MODIFY `bonuses` DECIMAL(65, 2) NOT NULL DEFAULT 0,
    MODIFY `totalSum` DECIMAL(65, 2) NOT NULL DEFAULT 0;
