-- CreateTable
CREATE TABLE "FoodViewLog" (
    "id" SERIAL NOT NULL,
    "foodId" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'VIEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoodViewLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FoodViewLog_foodId_idx" ON "FoodViewLog"("foodId");

-- CreateIndex
CREATE INDEX "FoodViewLog_createdAt_idx" ON "FoodViewLog"("createdAt");

-- AddForeignKey
ALTER TABLE "FoodViewLog" ADD CONSTRAINT "FoodViewLog_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;
