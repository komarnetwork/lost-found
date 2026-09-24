import { LaporanBoard } from "@/components/LaporanBoard";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <p className="max-w-xl text-ink-soft">
        Setiap laporan tersimpan sebagai tiket klaim, lengkap dengan nomor,
        lokasi, status, dan nama pelapor.
      </p>
      <LaporanBoard />
    </div>
  );
}
