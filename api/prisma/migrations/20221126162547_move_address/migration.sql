/*
  Warnings:

  - You are about to drop the column `address` on the `Toy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Toy" DROP COLUMN "address";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT;
