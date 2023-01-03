-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_toyFromReceiverId_fkey";

-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_toyFromSenderId_fkey";

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_toyFromSenderId_fkey" FOREIGN KEY ("toyFromSenderId") REFERENCES "Toy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_toyFromReceiverId_fkey" FOREIGN KEY ("toyFromReceiverId") REFERENCES "Toy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
