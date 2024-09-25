/*
  Warnings:

  - You are about to drop the column `ItemSubPerencanaanId` on the `ItemPenganggaran` table. All the data in the column will be lost.
  - Added the required column `ItemSubPenganggaranId` to the `ItemPenganggaran` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ItemPenganggaran" DROP CONSTRAINT "ItemPenganggaran_ItemSubPerencanaanId_fkey";

-- AlterTable
ALTER TABLE "ItemPenganggaran" DROP COLUMN "ItemSubPerencanaanId",
ADD COLUMN     "ItemSubPenganggaranId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ItemPenganggaran" ADD CONSTRAINT "ItemPenganggaran_ItemSubPenganggaranId_fkey" FOREIGN KEY ("ItemSubPenganggaranId") REFERENCES "ItemSubPenganggaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
