/*
  Warnings:

  - You are about to drop the column `offerId` on the `Rating` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[senderOfferId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receiverOfferId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_offerId_fkey";

-- DropIndex
DROP INDEX "Rating_offerId_key";

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "offerId",
ADD COLUMN     "receiverOfferId" TEXT,
ADD COLUMN     "senderOfferId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Rating_senderOfferId_key" ON "Rating"("senderOfferId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_receiverOfferId_key" ON "Rating"("receiverOfferId");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_senderOfferId_fkey" FOREIGN KEY ("senderOfferId") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_receiverOfferId_fkey" FOREIGN KEY ("receiverOfferId") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
