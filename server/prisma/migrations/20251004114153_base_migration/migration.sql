/*
  Warnings:

  - Made the column `value` on table `app_config` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `app_config` MODIFY `value` JSON NOT NULL;
