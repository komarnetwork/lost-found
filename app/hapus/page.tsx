import { HapusForm } from "./HapusForm";

export default async function HapusPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  return (
    <section className="ticket mx-auto max-w-xl p-6 md:p-8">
      <p className="font-mono text-xs text-ink-soft">Batalkan klaim</p>
      <h2 className="mt-1 font-display text-3xl font-bold">Hapus laporan</h2>
      <p className="mt-2 mb-6 text-sm text-ink-soft">
        Masukkan nomor klaim, lalu ketik &quot;hapus&quot; untuk konfirmasi.
      </p>
      <HapusForm initialId={id ?? ""} />
    </section>
  );
}
