-- CreateTable
CREATE TABLE "Penganggaran" (
    "id" TEXT NOT NULL,
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
    "id" TEXT NOT NULL,
    "penganggaranId" TEXT NOT NULL,
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
    "id" TEXT NOT NULL,
    "SubPenganggaranId" TEXT NOT NULL,
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
    "id" TEXT NOT NULL,
    "ItemSubPerencanaanId" TEXT NOT NULL,
    "nama_item" TEXT NOT NULL,
    "progres" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "instansi" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemPenganggaran_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubPenganggaran" ADD CONSTRAINT "SubPenganggaran_penganggaranId_fkey" FOREIGN KEY ("penganggaranId") REFERENCES "Penganggaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSubPenganggaran" ADD CONSTRAINT "ItemSubPenganggaran_SubPenganggaranId_fkey" FOREIGN KEY ("SubPenganggaranId") REFERENCES "SubPenganggaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPenganggaran" ADD CONSTRAINT "ItemPenganggaran_ItemSubPerencanaanId_fkey" FOREIGN KEY ("ItemSubPerencanaanId") REFERENCES "ItemSubPenganggaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
