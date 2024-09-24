/*
  Warnings:

  - The primary key for the `ItemSubPerencanaan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `penanggung_jawab` on the `ItemSubPerencanaan` table. All the data in the column will be lost.
  - You are about to drop the column `progres` on the `ItemSubPerencanaan` table. All the data in the column will be lost.
  - You are about to drop the column `target` on the `ItemSubPerencanaan` table. All the data in the column will be lost.
  - The primary key for the `Perencanaan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SubPerencanaan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `instansi` to the `ItemSubPerencanaan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `ItemSubPerencanaan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ItemSubPerencanaan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Perencanaan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `SubPerencanaan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ItemSubPerencanaan" DROP CONSTRAINT "ItemSubPerencanaan_subPerencanaanId_fkey";

-- DropForeignKey
ALTER TABLE "SubPerencanaan" DROP CONSTRAINT "SubPerencanaan_perencanaanId_fkey";

-- AlterTable
ALTER TABLE "ItemSubPerencanaan" DROP CONSTRAINT "ItemSubPerencanaan_pkey",
DROP COLUMN "penanggung_jawab",
DROP COLUMN "progres",
DROP COLUMN "target",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "instansi" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "subPerencanaanId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ItemSubPerencanaan_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ItemSubPerencanaan_id_seq";

-- AlterTable
ALTER TABLE "Perencanaan" DROP CONSTRAINT "Perencanaan_pkey",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Perencanaan_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Perencanaan_id_seq";

-- AlterTable
ALTER TABLE "SubPerencanaan" DROP CONSTRAINT "SubPerencanaan_pkey",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "perencanaanId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SubPerencanaan_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SubPerencanaan_id_seq";

-- AddForeignKey
ALTER TABLE "SubPerencanaan" ADD CONSTRAINT "SubPerencanaan_perencanaanId_fkey" FOREIGN KEY ("perencanaanId") REFERENCES "Perencanaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSubPerencanaan" ADD CONSTRAINT "ItemSubPerencanaan_subPerencanaanId_fkey" FOREIGN KEY ("subPerencanaanId") REFERENCES "SubPerencanaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
