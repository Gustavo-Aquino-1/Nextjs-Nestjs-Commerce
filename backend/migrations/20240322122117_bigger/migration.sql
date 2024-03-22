/*
  Warnings:

  - You are about to alter the column `name` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1000)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(1000) NOT NULL;
