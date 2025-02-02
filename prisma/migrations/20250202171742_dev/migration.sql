/*
  Warnings:

  - You are about to drop the column `forcedReservation` on the `Gift` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gift" DROP COLUMN "forcedReservation";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "forcedReservation" BOOLEAN NOT NULL DEFAULT false;
