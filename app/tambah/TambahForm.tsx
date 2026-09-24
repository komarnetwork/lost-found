"use client";

import { useRouter } from "next/navigation";
import { LaporanForm } from "@/components/LaporanForm";
import { SetupBanner } from "@/components/SetupBanner";
import { isFirebaseConfigured } from "@/lib/firebase";
import { createLaporan } from "@/lib/laporan";

export function TambahForm() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {!isFirebaseConfigured() ? <SetupBanner compact /> : null}
      <LaporanForm
        submitLabel="Tempel laporan"
        onSubmit={async (data) => {
          if (!isFirebaseConfigured()) {
            throw new Error("Isi .env.local dulu, lalu jalankan ulang server.");
          }
          await createLaporan(data);
          router.push("/");
        }}
      />
    </div>
  );
}
