/*
  Warnings:

  - You are about to drop the column `brand` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Food` table. All the data in the column will be lost.
  - Added the required column `brandEn` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandKo` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameKo` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Allergy" AS ENUM ('HYDROLYZED', 'GLUTEN_FREE', 'GRAIN_FREE', 'LID');

-- CreateEnum
CREATE TYPE "Certification" AS ENUM ('AAFCO', 'FEDIAF', 'FDA', 'HACCP', 'ISO22000', 'GMP', 'FSSC22000', 'ECOCERT', 'ORGANIC');

-- AlterEnum
ALTER TYPE "LifeStage" ADD VALUE 'all';

-- DropIndex
DROP INDEX "Food_brand_idx";

-- AlterTable
ALTER TABLE "Food" DROP COLUMN "brand",
DROP COLUMN "name",
ADD COLUMN     "allergies" "Allergy"[],
ADD COLUMN     "brandEn" TEXT NOT NULL,
ADD COLUMN     "brandKo" TEXT NOT NULL,
ADD COLUMN     "certifications" "Certification"[],
ADD COLUMN     "kibbleSize" DOUBLE PRECISION,
ADD COLUMN     "nameEn" TEXT NOT NULL,
ADD COLUMN     "nameKo" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Food_brandKo_idx" ON "Food"("brandKo");

-- CreateIndex
CREATE INDEX "Food_brandEn_idx" ON "Food"("brandEn");

-- CreateIndex
CREATE INDEX "Food_price_idx" ON "Food"("price");

-- CreateIndex
CREATE INDEX "Food_nameKo_idx" ON "Food"("nameKo");
