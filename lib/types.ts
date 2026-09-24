export type StatusBarang = "hilang" | "ketemu";

export interface LaporanInput {
  namaBarang: string;
  lokasi: string;
  status: StatusBarang;
  pelapor: string;
  deskripsi: string;
  fotoUrl?: string;
}

export interface Laporan extends LaporanInput {
  id: string;
  createdAt: number;
}
