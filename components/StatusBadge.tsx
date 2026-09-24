import type { CSSProperties } from "react";
import type { StatusBarang } from "@/lib/types";

export function StatusBadge({ status }: { status: StatusBarang }) {
  const found = status === "ketemu";
  const rotate = found ? "6deg" : "-8deg";

  return (
    <span
      className={`stamp h-16 w-16 shrink-0 font-display text-[0.55rem] leading-[1.05] font-bold tracking-tight uppercase ${
        found ? "text-claim-found" : "text-claim-lost"
      }`}
      style={{ "--stamp-rotate": rotate } as CSSProperties}
    >
      <span className="block w-11 text-center wrap-break-word" style={{ rotate }}>
        {found ? "Ditemukan" : "Hilang"}
      </span>
    </span>
  );
}
