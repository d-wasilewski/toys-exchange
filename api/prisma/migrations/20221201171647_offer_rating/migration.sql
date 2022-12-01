/*
  Warnings:

  - A unique constraint covering the columns `[offerId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "offerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Rating_offerId_key" ON "Rating"("offerId");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
