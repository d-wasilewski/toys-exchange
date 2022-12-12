/*
  Warnings:

  - You are about to drop the column `confirmed` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "UserStatus" ADD VALUE 'UNCONFIRMED';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "confirmed",
ALTER COLUMN "status" SET DEFAULT 'UNCONFIRMED';
