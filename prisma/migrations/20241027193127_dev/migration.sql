/*
  Warnings:

  - You are about to drop the column `name` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Guest` table. All the data in the column will be lost.
  - Added the required column `brunch` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cocktail` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diner` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eglise` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Guest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "brunch" TEXT NOT NULL,
ADD COLUMN     "cocktail" TEXT NOT NULL,
ADD COLUMN     "diet" TEXT,
ADD COLUMN     "diner" TEXT NOT NULL,
ADD COLUMN     "eglise" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "guests" JSONB[],
ADD COLUMN     "hebergement" TEXT,
ADD COLUMN     "hebergement_details" JSONB[],
ADD COLUMN     "intolerances" TEXT,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "other" TEXT;
