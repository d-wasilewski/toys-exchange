/*
  Warnings:

  - The values [UNCONFIRMED] on the enum `ToyStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ToyStatus_new" AS ENUM ('ACTIVE', 'REPORTED', 'FINISHED');
ALTER TABLE "Toy" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Toy" ALTER COLUMN "status" TYPE "ToyStatus_new" USING ("status"::text::"ToyStatus_new");
ALTER TYPE "ToyStatus" RENAME TO "ToyStatus_old";
ALTER TYPE "ToyStatus_new" RENAME TO "ToyStatus";
DROP TYPE "ToyStatus_old";
ALTER TABLE "Toy" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterTable
ALTER TABLE "Toy" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
