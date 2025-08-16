/*
  Warnings:

  - A unique constraint covering the columns `[symbol]` on the table `Investments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Investments_symbol_key" ON "Investments"("symbol");
