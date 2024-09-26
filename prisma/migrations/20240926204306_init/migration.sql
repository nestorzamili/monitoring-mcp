-- CreateTable
CREATE TABLE "Perencanaan" (
    "id" SERIAL NOT NULL,
    "nama_perencanaan" TEXT NOT NULL,
    "target" INTEGER NOT NULL,
    "progres" INTEGER NOT NULL,
    "status" TEXT,
    "tanggal_lapor" TIMESTAMP(3),
    "tanggal_verifikasi" TIMESTAMP(3),
    "keterangan" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Perencanaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubPerencanaan" (
    "id" SERIAL NOT NULL,
    "perencanaanId" INTEGER NOT NULL,
    "nama_sub_perencanaan" TEXT NOT NULL,
    "target" INTEGER NOT NULL,
    "progres" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubPerencanaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemSubPerencanaan" (
    "id" SERIAL NOT NULL,
    "subPerencanaanId" INTEGER NOT NULL,
    "nama_item" TEXT NOT NULL,
    "progres" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "instansi" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemSubPerencanaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penganggaran" (
    "id" SERIAL NOT NULL,
    "nama_penganggaran" TEXT NOT NULL,
    "target" INTEGER NOT NULL,
    "progres" INTEGER NOT NULL,
    "status" TEXT,
    "tanggal_lapor" TIMESTAMP(3),
    "tanggal_verifikasi" TIMESTAMP(3),
    "keterangan" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Penganggaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubPenganggaran" (
    "id" SERIAL NOT NULL,
    "penganggaranId" INTEGER NOT NULL,
    "nama_sub_penganggaran" TEXT NOT NULL,
    "target" INTEGER NOT NULL,
    "progres" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubPenganggaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemSubPenganggaran" (
    "id" SERIAL NOT NULL,
    "SubPenganggaranId" INTEGER NOT NULL,
    "nama_item_sub_penganggaran" TEXT NOT NULL,
    "target" INTEGER NOT NULL,
    "progres" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemSubPenganggaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemPenganggaran" (
    "id" SERIAL NOT NULL,
    "ItemSubPenganggaranId" INTEGER NOT NULL,
    "nama_item" TEXT NOT NULL,
    "progres" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "instansi" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemPenganggaran_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubPerencanaan" ADD CONSTRAINT "SubPerencanaan_perencanaanId_fkey" FOREIGN KEY ("perencanaanId") REFERENCES "Perencanaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSubPerencanaan" ADD CONSTRAINT "ItemSubPerencanaan_subPerencanaanId_fkey" FOREIGN KEY ("subPerencanaanId") REFERENCES "SubPerencanaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubPenganggaran" ADD CONSTRAINT "SubPenganggaran_penganggaranId_fkey" FOREIGN KEY ("penganggaranId") REFERENCES "Penganggaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSubPenganggaran" ADD CONSTRAINT "ItemSubPenganggaran_SubPenganggaranId_fkey" FOREIGN KEY ("SubPenganggaranId") REFERENCES "SubPenganggaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPenganggaran" ADD CONSTRAINT "ItemPenganggaran_ItemSubPenganggaranId_fkey" FOREIGN KEY ("ItemSubPenganggaranId") REFERENCES "ItemSubPenganggaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
