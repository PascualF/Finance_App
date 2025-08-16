-- AlterTable
ALTER TABLE "Investments" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Investments" ADD CONSTRAINT "Investments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
