import {
  get,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
  type Unsubscribe,
} from "firebase/database";
import { getDb } from "./firebase";
import type { Laporan, LaporanInput } from "./types";

const PATH = "laporan";

function toList(value: unknown): Laporan[] {
  if (!value || typeof value !== "object") {
    return [];
  }

  return Object.entries(value as Record<string, Omit<Laporan, "id">>)
    .map(([id, data]) => ({
      id,
      namaBarang: data.namaBarang,
      lokasi: data.lokasi,
      status: data.status,
      pelapor: data.pelapor,
      deskripsi: data.deskripsi,
      fotoUrl: data.fotoUrl,
      createdAt: data.createdAt,
    }))
    .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
}

export function subscribeLaporan(
  onData: (items: Laporan[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onValue(
    ref(getDb(), PATH),
    (snapshot) => {
      onData(toList(snapshot.val()));
    },
    onError,
  );
}

export async function createLaporan(input: LaporanInput): Promise<string> {
  const newRef = push(ref(getDb(), PATH));
  await set(newRef, {
    ...input,
    createdAt: Date.now(),
  });

  if (!newRef.key) {
    throw new Error("Gagal membuat laporan");
  }

  return newRef.key;
}

export async function getLaporan(id: string): Promise<Laporan | null> {
  const snapshot = await get(ref(getDb(), `${PATH}/${id}`));
  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.val() as Omit<Laporan, "id">;
  return { id, ...data };
}

export async function updateLaporan(
  id: string,
  input: LaporanInput,
): Promise<void> {
  await update(ref(getDb(), `${PATH}/${id}`), input);
}

export async function deleteLaporan(id: string): Promise<void> {
  await remove(ref(getDb(), `${PATH}/${id}`));
}
