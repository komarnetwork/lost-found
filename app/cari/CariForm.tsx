"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Field } from "@/components/Field";
import { LaporanCard } from "@/components/LaporanCard";
import { SetupBanner } from "@/components/SetupBanner";
import { isFirebaseConfigured } from "@/lib/firebase";
import { getLaporan, subscribeLaporan } from "@/lib/laporan";
import type { Laporan } from "@/lib/types";

export function CariForm() {
  const [items, setItems] = useState<Laporan[]>([]);
  const [results, setResults] = useState<Laporan[]>([]);
  const [error, setError] = useState("");
  const configured = isFirebaseConfigured();

  useEffect(() => {
    if (!configured) {
      return;
    }

    return subscribeLaporan(setItems, (err) => setError(err.message));
  }, [configured]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const keyword = String(new FormData(event.currentTarget).get("kataKunci") ?? "")
      .trim()
      .toLowerCase();

    if (!keyword) {
      setResults([]);
      setError("Isi kata kunci atau ID laporan.");
      return;
    }

    if (!configured) {
      setError("Isi .env.local dulu, lalu jalankan ulang server.");
      return;
    }

    const byId = await getLaporan(keyword);
    if (byId) {
      setResults([byId]);
      return;
    }

    const matched = items.filter((item) =>
      [item.namaBarang, item.lokasi, item.pelapor, item.deskripsi]
        .join(" ")
        .toLowerCase()
        .includes(keyword),
    );

    setResults(matched);
    if (matched.length === 0) {
      setError("Tidak ada laporan yang cocok.");
    }
  }

  return (
    <div className="space-y-6">
      {!configured ? <SetupBanner compact /> : null}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Field
          id="kataKunci"
          name="kataKunci"
          label="Cari laporan"
          placeholder="ID, nama barang, lokasi, atau pelapor"
          required
        />
        <button
          type="submit"
          className="w-full bg-booth px-4 py-3 font-medium text-ticket transition hover:bg-booth-edge"
        >
          Tampilkan
        </button>
      </form>

      {error ? <p className="text-sm text-claim-lost">{error}</p> : null}

      {results.length > 0 ? (
        <div className="grid gap-6">
          {results.map((item) => (
            <LaporanCard key={item.id} item={item} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
