-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "description" TEXT,
    "sales" INTEGER NOT NULL DEFAULT 0,
    "ensembleId" INTEGER,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ensemble" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ensemble_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Composition" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "composer" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Composition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Musician" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "instrument" TEXT NOT NULL,
    "ensembleId" INTEGER NOT NULL,

    CONSTRAINT "Musician_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "foundedYear" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Top" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "items" TEXT[],

    CONSTRAINT "Top_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EnsembleCompositions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EnsembleCompositions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_RecordCompositions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_RecordCompositions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "_EnsembleCompositions_B_index" ON "_EnsembleCompositions"("B");

-- CreateIndex
CREATE INDEX "_RecordCompositions_B_index" ON "_RecordCompositions"("B");

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_ensembleId_fkey" FOREIGN KEY ("ensembleId") REFERENCES "Ensemble"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Musician" ADD CONSTRAINT "Musician_ensembleId_fkey" FOREIGN KEY ("ensembleId") REFERENCES "Ensemble"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnsembleCompositions" ADD CONSTRAINT "_EnsembleCompositions_A_fkey" FOREIGN KEY ("A") REFERENCES "Composition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnsembleCompositions" ADD CONSTRAINT "_EnsembleCompositions_B_fkey" FOREIGN KEY ("B") REFERENCES "Ensemble"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecordCompositions" ADD CONSTRAINT "_RecordCompositions_A_fkey" FOREIGN KEY ("A") REFERENCES "Composition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecordCompositions" ADD CONSTRAINT "_RecordCompositions_B_fkey" FOREIGN KEY ("B") REFERENCES "Record"("id") ON DELETE CASCADE ON UPDATE CASCADE;
