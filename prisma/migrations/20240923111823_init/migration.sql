-- CreateTable
CREATE TABLE "Perencanaan" (
    "id" SERIAL NOT NULL,
    "nama_perencanaan" VARCHAR(255) NOT NULL,
    "total_progress" INTEGER NOT NULL,

    CONSTRAINT "Perencanaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubPerencanaan" (
    "id" SERIAL NOT NULL,
    "perencanaan_id" INTEGER NOT NULL,
    "nama_sub_perencanaan" VARCHAR(255) NOT NULL,
    "progress" INTEGER NOT NULL,

    CONSTRAINT "SubPerencanaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dokumen" (
    "id" SERIAL NOT NULL,
    "sub_perencanaan_id" INTEGER NOT NULL,
    "nama_dokumen" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Dokumen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusLaporan" (
    "id" SERIAL NOT NULL,
    "dokumen_id" INTEGER NOT NULL,
    "tanggal_lapor" TIMESTAMP(3) NOT NULL,
    "tanggal_verifikasi" TIMESTAMP(3) NOT NULL,
    "keterangan" TEXT NOT NULL,

    CONSTRAINT "StatusLaporan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubPerencanaan" ADD CONSTRAINT "SubPerencanaan_perencanaan_id_fkey" FOREIGN KEY ("perencanaan_id") REFERENCES "Perencanaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dokumen" ADD CONSTRAINT "Dokumen_sub_perencanaan_id_fkey" FOREIGN KEY ("sub_perencanaan_id") REFERENCES "SubPerencanaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatusLaporan" ADD CONSTRAINT "StatusLaporan_dokumen_id_fkey" FOREIGN KEY ("dokumen_id") REFERENCES "Dokumen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
