export interface ItemSubPerencanaan {
  id: number;
  nama_item: string;
  progres: boolean;
  status: string;
  instansi: string;
}

export interface SubPerencanaan {
  id: number;
  nama_sub_perencanaan: string;
  target: number;
  progres: number;
  item_sub_perencanaan: ItemSubPerencanaan[];
}

export interface Perencanaan {
  id: number;
  nama_perencanaan: string;
  target: number;
  progres: number;
  status: string;
  tanggal_lapor: string | null;
  tanggal_verifikasi: string | null;
  keterangan: string | null;
  sub_perencanaan: SubPerencanaan[];
}
