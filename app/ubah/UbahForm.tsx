"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Field } from "@/components/Field";
import { LaporanForm } from "@/components/LaporanForm";
import { SetupBanner } from "@/components/SetupBanner";
import { isFirebaseConfigured } from "@/lib/firebase";
import { getLaporan, updateLaporan } from "@/lib/laporan";
import type { Laporan } from "@/lib/types";

export function UbahForm({ initialId = "" }: { initialId?: string }) {
  const [item, setItem] = useState<Laporan | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured() || !initialId) {
      return;
    }

    void getLaporan(initialId)
      .then((found) => {
        if (!found) {
          setError("ID laporan tidak ditemukan.");
          return;
        }
        setItem(found);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Gagal memuat laporan.");
      });
  }, [initialId]);

  async function loadLaporan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const id = String(new FormData(event.currentTarget).get("id") ?? "").trim();

    try {
      if (!isFirebaseConfigured()) {
        setError("Isi .env.local dulu, lalu jalankan ulang server.");
        return;
      }

      const found = await getLaporan(id);
      if (!found) {
        setItem(null);
        setError("ID laporan tidak ditemukan.");
        return;
      }
      setItem(found);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat laporan.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-8">
      {!isFirebaseConfigured() ? <SetupBanner compact /> : null}
      <form className="space-y-4" onSubmit={loadLaporan}>
        <Field
          id="id"
          name="id"
          label="ID laporan"
          defaultValue={initialId}
          required
          placeholder="Salin ID dari papan atau hasil pencarian"
        />
        <button
          type="submit"
          disabled={pending}
          className="w-full bg-booth px-4 py-3 font-medium text-ticket transition hover:bg-booth-edge disabled:opacity-60"
        >
          {pending ? "Memuat..." : "Muat laporan"}
        </button>
      </form>

      {error ? <p className="text-sm text-claim-lost">{error}</p> : null}

      {item ? (
        <LaporanForm
          key={item.id}
          submitLabel="Simpan perubahan"
          initial={item}
          onSubmit={(data) => updateLaporan(item.id, data)}
        />
      ) : null}
    </div>
  );
}
