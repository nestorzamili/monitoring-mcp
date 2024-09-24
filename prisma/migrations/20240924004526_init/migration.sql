/*
  Warnings:

  - You are about to drop the column `total_progress` on the `Perencanaan` table. All the data in the column will be lost.
  - You are about to drop the column `perencanaan_id` on the `SubPerencanaan` table. All the data in the column will be lost.
  - You are about to drop the column `progress` on the `SubPerencanaan` table. All the data in the column will be lost.
  - You are about to drop the `Dokumen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StatusLaporan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `progres` to the `Perencanaan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target` to the `Perencanaan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perencanaanId` to the `SubPerencanaan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progres` to the `SubPerencanaan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target` to the `SubPerencanaan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dokumen" DROP CONSTRAINT "Dokumen_sub_perencanaan_id_fkey";

-- DropForeignKey
ALTER TABLE "StatusLaporan" DROP CONSTRAINT "StatusLaporan_dokumen_id_fkey";

-- DropForeignKey
ALTER TABLE "SubPerencanaan" DROP CONSTRAINT "SubPerencanaan_perencanaan_id_fkey";

-- AlterTable
ALTER TABLE "Perencanaan" DROP COLUMN "total_progress",
ADD COLUMN     "keterangan" TEXT,
ADD COLUMN     "progres" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "tanggal_lapor" TIMESTAMP(3),
ADD COLUMN     "tanggal_verifikasi" TIMESTAMP(3),
ADD COLUMN     "target" INTEGER NOT NULL,
ALTER COLUMN "nama_perencanaan" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "SubPerencanaan" DROP COLUMN "perencanaan_id",
DROP COLUMN "progress",
ADD COLUMN     "perencanaanId" INTEGER NOT NULL,
ADD COLUMN     "progres" INTEGER NOT NULL,
ADD COLUMN     "target" INTEGER NOT NULL,
ALTER COLUMN "nama_sub_perencanaan" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Dokumen";

-- DropTable
DROP TABLE "StatusLaporan";

-- CreateTable
CREATE TABLE "ItemSubPerencanaan" (
    "id" SERIAL NOT NULL,
    "subPerencanaanId" INTEGER NOT NULL,
    "nama_item" TEXT NOT NULL,
    "target" INTEGER NOT NULL,
    "progres" INTEGER NOT NULL,
    "penanggung_jawab" TEXT NOT NULL,

    CONSTRAINT "ItemSubPerencanaan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubPerencanaan" ADD CONSTRAINT "SubPerencanaan_perencanaanId_fkey" FOREIGN KEY ("perencanaanId") REFERENCES "Perencanaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSubPerencanaan" ADD CONSTRAINT "ItemSubPerencanaan_subPerencanaanId_fkey" FOREIGN KEY ("subPerencanaanId") REFERENCES "SubPerencanaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
