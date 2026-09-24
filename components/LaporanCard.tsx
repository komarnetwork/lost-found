import Link from "next/link";
import { StatusBadge } from "./StatusBadge";
import type { Laporan } from "@/lib/types";

export function LaporanCard({ item }: { item: Laporan }) {
  return (
    <article className="ticket relative flex flex-col">
      <span
        className={`absolute inset-y-0 left-0 w-1.5 ${
          item.status === "ketemu" ? "bg-leaf" : "bg-claim-lost"
        }`}
      />
      <div className="flex items-start justify-between gap-4 p-5 pl-6">
        <div className="min-w-0">
          <p className="font-mono text-xs text-ink-soft">
            No. klaim <span className="text-ink">{item.id}</span>
          </p>
          <h3 className="mt-1 font-display text-xl leading-tight font-bold">
            {item.namaBarang}
          </h3>
          <p className="mt-2 text-sm text-ink-soft">{item.lokasi}</p>
          <p className="mt-3 text-sm leading-6">{item.deskripsi}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <StatusBadge status={item.status} />
          {item.fotoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.fotoUrl}
              alt={item.namaBarang}
              className="h-16 w-16 border border-ink/15 object-cover"
            />
          ) : null}
        </div>
      </div>
      <div className="ticket-stub flex items-center justify-between gap-3 py-3 pr-5 pl-6 text-sm">
        <span className="text-ink-soft">Dilapor oleh {item.pelapor}</span>
        <span className="flex gap-3">
          <Link
            className="font-medium underline decoration-ink-soft/40 underline-offset-2"
            href={`/ubah/${item.id}`}
          >
            Ubah
          </Link>
          <Link
            className="font-medium text-claim-lost underline decoration-claim-lost/40 underline-offset-2"
            href={`/hapus?id=${item.id}`}
          >
            Hapus
          </Link>
        </span>
      </div>
    </article>
  );
}
