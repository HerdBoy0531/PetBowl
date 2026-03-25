-- CreateTable
CREATE TABLE "GuaranteedAnalysis" (
    "id" SERIAL NOT NULL,
    "foodId" INTEGER NOT NULL,
    "protein" DOUBLE PRECISION,
    "fat" DOUBLE PRECISION,
    "fiber" DOUBLE PRECISION,
    "ash" DOUBLE PRECISION,
    "moisture" DOUBLE PRECISION,
    "calcium" DOUBLE PRECISION,
    "phosphorus" DOUBLE PRECISION,
    "sodium" DOUBLE PRECISION,
    "omega3" DOUBLE PRECISION,
    "omega6" DOUBLE PRECISION,

    CONSTRAINT "GuaranteedAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "foodId" INTEGER NOT NULL,
    "ingredientRaw" TEXT NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProteinSource" (
    "id" SERIAL NOT NULL,
    "foodId" INTEGER NOT NULL,
    "proteinType" TEXT NOT NULL,
    "sourceRaw" TEXT,
    "isPrimary" BOOLEAN NOT NULL,

    CONSTRAINT "ProteinSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarbohydrateSource" (
    "id" SERIAL NOT NULL,
    "foodId" INTEGER NOT NULL,
    "carbType" TEXT NOT NULL,
    "sourceRaw" TEXT,

    CONSTRAINT "CarbohydrateSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VegetableSource" (
    "id" SERIAL NOT NULL,
    "foodId" INTEGER NOT NULL,
    "vegetableType" TEXT NOT NULL,
    "sourceRaw" TEXT,

    CONSTRAINT "VegetableSource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuaranteedAnalysis_foodId_key" ON "GuaranteedAnalysis"("foodId");

-- CreateIndex
CREATE INDEX "Ingredient_foodId_idx" ON "Ingredient"("foodId");

-- CreateIndex
CREATE INDEX "ProteinSource_foodId_idx" ON "ProteinSource"("foodId");

-- CreateIndex
CREATE INDEX "ProteinSource_proteinType_idx" ON "ProteinSource"("proteinType");

-- CreateIndex
CREATE INDEX "CarbohydrateSource_foodId_idx" ON "CarbohydrateSource"("foodId");

-- CreateIndex
CREATE INDEX "VegetableSource_foodId_idx" ON "VegetableSource"("foodId");

-- CreateIndex
CREATE INDEX "Food_brand_idx" ON "Food"("brand");

-- CreateIndex
CREATE INDEX "Food_animalType_lifeStage_sizeCategory_idx" ON "Food"("animalType", "lifeStage", "sizeCategory");

-- AddForeignKey
ALTER TABLE "GuaranteedAnalysis" ADD CONSTRAINT "GuaranteedAnalysis_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProteinSource" ADD CONSTRAINT "ProteinSource_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarbohydrateSource" ADD CONSTRAINT "CarbohydrateSource_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VegetableSource" ADD CONSTRAINT "VegetableSource_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;
