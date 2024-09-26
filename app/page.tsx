"use client";

import Perencanaan from "@/components/dashboard/perencanaan";
import Penganggaran from "@/components/dashboard/penganggaran";
import PengadaanBarangDanJasa from "@/components/dashboard/pengadaan-barang-dan-jasa";
import PelayananPublik from "@/components/dashboard/pelayanan-publik";
import PengawasanApip from "@/components/dashboard/pengawasan-apip";
import ManajemenASN from "@/components/dashboard/manajemen-asn";
import PengelolaanBMD from "@/components/dashboard/pengelolaan-bmd";
import OptimalisasiPajak from "@/components/dashboard/optimalisasi-pajak";
import Grafik from "@/components/dashboard/grafik";
import Recent from "@/components/dashboard/recent";

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Perencanaan />
          <Penganggaran />
          <PengadaanBarangDanJasa />
          <PelayananPublik />
          <PengawasanApip />
          <ManajemenASN />
          <PengelolaanBMD />
          <OptimalisasiPajak />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Grafik />
          <Recent />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
