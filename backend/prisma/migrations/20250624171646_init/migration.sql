/*
  Warnings:

  - A unique constraint covering the columns `[title,amount,transactionDate,userId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Transaction_title_amount_transactionDate_userId_key" ON "Transaction"("title", "amount", "transactionDate", "userId");
