/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACCEPTED', 'DECLINED', 'PENDING');

-- AlterTable
ALTER TABLE "Toy" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "senderUserId" INTEGER NOT NULL,
    "receiverUserId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "toyFromSenderId" INTEGER NOT NULL,
    "toyFromReceiverId" INTEGER NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_senderUserId_fkey" FOREIGN KEY ("senderUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_receiverUserId_fkey" FOREIGN KEY ("receiverUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_toyFromSenderId_fkey" FOREIGN KEY ("toyFromSenderId") REFERENCES "Toy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_toyFromReceiverId_fkey" FOREIGN KEY ("toyFromReceiverId") REFERENCES "Toy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
