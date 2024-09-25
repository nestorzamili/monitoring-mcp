export interface ItemPenganggaran {
  id: string;
  nama_item: string;
  progres: boolean;
  status: string;
  instansi: string;
}

export interface ItemSubPenganggaran {
  instansi: string;
  id: string;
  nama_item_sub_penganggaran: string;
  target: number;
  progres: number;
  status: string;
  item_penganggaran: ItemPenganggaran[];
}

export interface SubPenganggaran {
  id: string;
  nama_sub_penganggaran: string;
  target: number;
  progres: number;
  status: string;
  item_sub_penganggaran: ItemSubPenganggaran[];
}

export interface Penganggaran {
  id: string;
  nama_penganggaran: string;
  target: number;
  progres: number;
  status: string | null;
  tanggal_lapor: string | null;
  tanggal_verifikasi: string | null;
  keterangan: string | null;
  sub_penganggaran: SubPenganggaran[];
}
