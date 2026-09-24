import { CariForm } from "./CariForm";

export default function CariPage() {
  return (
    <section className="ticket mx-auto max-w-xl p-6 md:p-8">
      <p className="font-mono text-xs text-ink-soft">Loket informasi</p>
      <h2 className="mt-1 font-display text-3xl font-bold">Cari laporan</h2>
      <p className="mt-2 mb-6 text-sm text-ink-soft">
        Cari berdasarkan nomor klaim, nama barang, lokasi, atau pelapor.
      </p>
      <CariForm />
    </section>
  );
}
