-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
