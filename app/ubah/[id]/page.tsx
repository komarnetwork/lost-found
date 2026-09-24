import { UbahForm } from "../UbahForm";

export default async function UbahByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <section className="ticket mx-auto max-w-xl p-6 md:p-8">
      <p className="font-mono text-xs text-ink-soft">Perbarui klaim</p>
      <h2 className="mt-1 font-display text-3xl font-bold">Ubah laporan</h2>
      <p className="mt-2 mb-6 text-sm text-ink-soft">
        Mengubah laporan dengan nomor klaim {id}.
      </p>
      <UbahForm initialId={id} />
    </section>
  );
}
