/*
  Warnings:

  - The `diet` column on the `Guest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `intolerances` column on the `Guest` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "diet",
ADD COLUMN     "diet" TEXT[],
DROP COLUMN "intolerances",
ADD COLUMN     "intolerances" TEXT[];
