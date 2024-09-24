/*
  Warnings:

  - Added the required column `progres` to the `ItemSubPerencanaan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `SubPerencanaan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItemSubPerencanaan" ADD COLUMN     "progres" BOOLEAN NOT NULL,
ALTER COLUMN "status" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "SubPerencanaan" ADD COLUMN     "status" TEXT NOT NULL;
