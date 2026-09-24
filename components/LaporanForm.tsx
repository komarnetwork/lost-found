"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Field, FileField, TextArea } from "./Field";
import { compressImage } from "@/lib/image";
import type { LaporanInput, StatusBarang } from "@/lib/types";

const MAX_FOTO_SIZE = 15 * 1024 * 1024;

interface LaporanFormProps {
  submitLabel: string;
  initial?: Partial<LaporanInput>;
  onSubmit: (data: LaporanInput) => Promise<void>;
}

export function LaporanForm({
  submitLabel,
  initial,
  onSubmit,
}: LaporanFormProps) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pending, setPending] = useState(false);
  const [pendingLabel, setPendingLabel] = useState(submitLabel);
  const [foto, setFoto] = useState<File | null>(null);
  const objectUrl = useMemo(
    () => (foto ? URL.createObjectURL(foto) : null),
    [foto],
  );
  const preview = objectUrl ?? initial?.fotoUrl ?? null;

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  function handleFotoChange(file: File | null) {
    setError("");

    if (file && file.size > MAX_FOTO_SIZE) {
      setError("Ukuran foto maksimal 15MB.");
      return;
    }

    setFoto(file);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setPending(true);

    const form = event.currentTarget;
    const payload = new FormData(form);

    try {
      let fotoUrl = initial?.fotoUrl;
      if (foto) {
        setPendingLabel("Memproses foto...");
        fotoUrl = await compressImage(foto);
      }

      setPendingLabel("Menyimpan...");
      const data: LaporanInput = {
        namaBarang: String(payload.get("namaBarang") ?? "").trim(),
        lokasi: String(payload.get("lokasi") ?? "").trim(),
        status: String(payload.get("status") ?? "hilang") as StatusBarang,
        pelapor: String(payload.get("pelapor") ?? "").trim(),
        deskripsi: String(payload.get("deskripsi") ?? "").trim(),
        ...(fotoUrl ? { fotoUrl } : {}),
      };

      await onSubmit(data);
      setSuccess("Laporan tersimpan.");
      if (!initial) {
        form.reset();
        setFoto(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan laporan.");
    } finally {
      setPending(false);
      setPendingLabel(submitLabel);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Field
        id="namaBarang"
        name="namaBarang"
        label="Nama barang"
        defaultValue={initial?.namaBarang}
        required
        placeholder="Dompet hitam, KTM, payung lipat"
      />
      <Field
        id="lokasi"
        name="lokasi"
        label="Lokasi"
        defaultValue={initial?.lokasi}
        required
        placeholder="Perpustakaan lantai 2"
      />
      <label className="block" htmlFor="status">
        <span className="text-sm text-ink-soft">Status</span>
        <select
          id="status"
          name="status"
          defaultValue={initial?.status ?? "hilang"}
          className="mt-1 w-full border-b-2 border-ink/20 bg-transparent py-2 text-ink outline-none focus:border-booth"
        >
          <option value="hilang">Hilang</option>
          <option value="ketemu">Ditemukan</option>
        </select>
      </label>
      <Field
        id="pelapor"
        name="pelapor"
        label="Nama pelapor"
        defaultValue={initial?.pelapor}
        required
        placeholder="Nama mahasiswa"
      />
      <TextArea
        id="deskripsi"
        name="deskripsi"
        label="Deskripsi"
        defaultValue={initial?.deskripsi}
        required
        placeholder="Ciri-ciri barang, warna, atau tempat terakhir terlihat"
      />
      <FileField
        id="foto"
        name="foto"
        label="Foto barang"
        previewUrl={preview}
        onChange={handleFotoChange}
      />

      {error ? <p className="text-sm text-claim-lost">{error}</p> : null}
      {success ? <p className="text-sm text-claim-found">{success}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-booth px-4 py-3 font-medium text-ticket transition hover:bg-booth-edge disabled:opacity-60"
      >
        {pending ? pendingLabel : submitLabel}
      </button>
    </form>
  );
}
