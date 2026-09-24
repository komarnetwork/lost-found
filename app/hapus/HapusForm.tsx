"use client";

import { useState, type FormEvent } from "react";
import { Field } from "@/components/Field";
import { SetupBanner } from "@/components/SetupBanner";
import { isFirebaseConfigured } from "@/lib/firebase";
import { deleteLaporan, getLaporan } from "@/lib/laporan";
import type { Laporan } from "@/lib/types";

export function HapusForm({ initialId = "" }: { initialId?: string }) {
  const [preview, setPreview] = useState<Laporan | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setPending(true);

    const form = event.currentTarget;
    const id = String(new FormData(form).get("id") ?? "").trim();
    const confirmText = String(new FormData(form).get("konfirmasi") ?? "").trim();

    try {
      if (!isFirebaseConfigured()) {
        setError("Isi .env.local dulu, lalu jalankan ulang server.");
        return;
      }

      const found = await getLaporan(id);
      if (!found) {
        setPreview(null);
        setError("ID laporan tidak ditemukan.");
        return;
      }

      setPreview(found);

      if (confirmText.toLowerCase() !== "hapus") {
        setError('Ketik "hapus" untuk mengonfirmasi penghapusan.');
        return;
      }

      await deleteLaporan(id);
      setPreview(null);
      setSuccess("Laporan sudah dilepas dari papan.");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus laporan.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {!isFirebaseConfigured() ? <SetupBanner compact /> : null}
      <Field
        id="id"
        name="id"
        label="ID laporan"
        defaultValue={initialId}
        required
        placeholder="Tempel ID laporan yang akan dihapus"
      />
      <Field
        id="konfirmasi"
        name="konfirmasi"
        label='Ketik "hapus" untuk konfirmasi'
        required
        placeholder="hapus"
      />

      {preview ? (
        <p className="text-sm text-ink-soft">
          Akan menghapus: <strong className="text-ink">{preview.namaBarang}</strong>{" "}
          di {preview.lokasi}.
        </p>
      ) : null}

      {error ? <p className="text-sm text-claim-lost">{error}</p> : null}
      {success ? <p className="text-sm text-claim-found">{success}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-claim-lost px-4 py-3 font-medium text-ticket transition hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Menghapus..." : "Hapus laporan"}
      </button>
    </form>
  );
}
