export function SetupBanner({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="border-l-4 border-booth bg-ink/5 px-3 py-2 text-sm text-ink-soft">
        Firebase belum tersambung. Isi <code className="text-ink">.env.local</code>{" "}
        dulu supaya Create/Read/Update/Delete tersimpan.
      </p>
    );
  }

  return (
    <aside className="ticket mx-auto max-w-2xl p-6">
      <h2 className="font-display text-2xl font-bold">Firebase belum tersambung</h2>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-ink-soft">
        <li>Buka Firebase Console, lalu buat project baru.</li>
        <li>
          Aktifkan Realtime Database, pilih mode tes, lalu salin URL database.
        </li>
        <li>Tambahkan aplikasi Web, lalu salin konfigurasi Firebase-nya.</li>
        <li>
          Duplikat <code className="text-ink">.env.example</code> menjadi{" "}
          <code className="text-ink">.env.local</code> dan isi nilainya.
        </li>
        <li>
          Tempel isi <code className="text-ink">database.rules.json</code> ke
          Rules Realtime Database, lalu jalankan ulang{" "}
          <code className="text-ink">npm run dev</code>.
        </li>
      </ol>
    </aside>
  );
}
