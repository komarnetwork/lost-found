"use client";

import { useEffect, useMemo, useState } from "react";
import { LaporanCard } from "./LaporanCard";
import { SetupBanner } from "./SetupBanner";
import { isFirebaseConfigured } from "@/lib/firebase";
import { subscribeLaporan } from "@/lib/laporan";
import type { Laporan, StatusBarang } from "@/lib/types";

export function LaporanBoard() {
  const [items, setItems] = useState<Laporan[]>([]);
  const [filter, setFilter] = useState<"semua" | StatusBarang>("semua");
  const [error, setError] = useState("");
  const configured = isFirebaseConfigured();

  useEffect(() => {
    if (!configured) {
      return;
    }

    return subscribeLaporan(setItems, (err) => setError(err.message));
  }, [configured]);

  const visible = useMemo(
    () => (filter === "semua" ? items : items.filter((item) => item.status === filter)),
    [filter, items],
  );

  if (!configured) {
    return <SetupBanner />;
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 border-b border-ink/15 pb-4">
        <span className="text-sm text-ink-soft">Tampilkan</span>
        <div className="flex flex-wrap gap-2">
          {(["semua", "hilang", "ketemu"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`px-3 py-1.5 text-sm font-medium transition ${
                filter === value
                  ? "bg-ink text-ticket"
                  : "bg-ink/5 text-ink-soft hover:bg-ink/10"
              }`}
            >
              {value === "semua" ? "Semua" : value === "hilang" ? "Hilang" : "Ditemukan"}
            </button>
          ))}
        </div>
      </div>

      {error ? <p className="text-sm text-claim-lost">{error}</p> : null}

      {visible.length === 0 ? (
        <p className="ticket p-8 text-center font-display text-xl text-ink-soft">
          Belum ada klaim di loket ini. Ambil nomor pertama lewat menu Lapor.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((item) => (
            <LaporanCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
