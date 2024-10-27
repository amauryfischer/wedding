-- CreateTable
CREATE TABLE "Hebergement" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Hebergement_pkey" PRIMARY KEY ("id")
);
