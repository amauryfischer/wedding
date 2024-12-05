/*
  Warnings:

  - You are about to drop the column `externId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `externalId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "externId",
ADD COLUMN     "externalId" TEXT NOT NULL;
