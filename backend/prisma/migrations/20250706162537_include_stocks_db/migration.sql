-- CreateTable
CREATE TABLE "Investments" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Investments_pkey" PRIMARY KEY ("id")
);
