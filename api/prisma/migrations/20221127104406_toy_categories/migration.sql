/*
  Warnings:

  - The `category` column on the `Toy` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ToyCategories" AS ENUM ('FIGURES', 'ANIMALS', 'CARS', 'RADIO_CONTROLLED', 'CONSTRUCTION', 'CREATIVE', 'DOLLS', 'EDUCATIONAL', 'ELECTRONIC', 'EXECUTIVE', 'FOOD_RELATED', 'GAMES', 'PLAYGOUND', 'PUZZLE', 'LEGO', 'SCIENCE', 'SOUND', 'SPINNING', 'WOODEN', 'OTHER');

-- AlterTable
ALTER TABLE "Toy" DROP COLUMN "category",
ADD COLUMN     "category" "ToyCategories" NOT NULL DEFAULT 'OTHER';
