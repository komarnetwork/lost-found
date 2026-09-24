import { TambahForm } from "./TambahForm";

export default function TambahPage() {
  return (
    <section className="ticket mx-auto max-w-xl p-6 md:p-8">
      <p className="font-mono text-xs text-ink-soft">Formulir klaim &middot; baru</p>
      <h2 className="mt-1 font-display text-3xl font-bold">Lapor barang</h2>
      <p className="mt-2 mb-6 text-sm text-ink-soft">
        Isi formulir ini untuk mengambil nomor klaim. Laporan baru langsung
        muncul di papan.
      </p>
      <TambahForm />
    </section>
  );
}
