/*
  Warnings:

  - Added the required column `cep` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `cep` VARCHAR(191) NOT NULL,
    ADD COLUMN `number` INTEGER NOT NULL;
