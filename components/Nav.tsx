"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Papan" },
  { href: "/tambah", label: "Lapor" },
  { href: "/cari", label: "Cari" },
  { href: "/ubah", label: "Ubah" },
  { href: "/hapus", label: "Hapus" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-3 pt-2">
      {links.map((link) => {
        const active =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`tab-ticket px-4 pt-3 pb-2 text-sm font-medium transition ${
              active
                ? "bg-ticket text-ink"
                : "bg-ticket/25 text-ticket/85 hover:bg-ticket/40"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
