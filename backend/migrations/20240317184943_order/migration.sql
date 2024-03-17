/*
  Warnings:

  - The primary key for the `OrderProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `size` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OrderProduct` DROP PRIMARY KEY,
    ADD COLUMN `size` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`orderId`, `productId`, `size`);
