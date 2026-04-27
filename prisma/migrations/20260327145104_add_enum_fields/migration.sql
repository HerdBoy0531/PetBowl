/*
  Warnings:

  - You are about to drop the column `mainProtein` on the `Food` table. All the data in the column will be lost.
  - Changed the type of `animalType` on the `Food` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `lifeStage` on the `Food` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AnimalType" AS ENUM ('dog', 'cat');

-- CreateEnum
CREATE TYPE "LifeStage" AS ENUM ('puppy', 'adult', 'senior');

-- AlterTable
ALTER TABLE "Food" DROP COLUMN "mainProtein",
DROP COLUMN "animalType",
ADD COLUMN     "animalType" "AnimalType" NOT NULL,
DROP COLUMN "lifeStage",
ADD COLUMN     "lifeStage" "LifeStage" NOT NULL;

-- CreateIndex
CREATE INDEX "Food_animalType_lifeStage_sizeCategory_idx" ON "Food"("animalType", "lifeStage", "sizeCategory");
