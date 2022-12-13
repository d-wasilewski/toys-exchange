/*
  Warnings:

  - You are about to drop the column `confirmed` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ToyStatus" AS ENUM ('ACTIVE', 'UNCONFIRMED', 'FINISHED');

-- AlterTable
ALTER TABLE "Toy" ADD COLUMN     "status" "ToyStatus" NOT NULL DEFAULT 'UNCONFIRMED';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "confirmed";
