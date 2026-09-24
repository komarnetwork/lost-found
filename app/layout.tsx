import type { Metadata } from "next";
import { Roboto_Slab, Work_Sans } from "next/font/google";
import { Nav } from "@/components/Nav";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Loket Barang Hilang",
  description:
    "Loket klaim barang hilang dan ditemukan di kampus, tersimpan di Firebase Realtime Database.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${workSans.variable} ${robotoSlab.variable} h-full antialiased`}
    >
      <body className="counter-texture min-h-full bg-paper text-ink">
        <div className="min-h-full">
          <header className="bg-booth text-ticket">
            <div className="mx-auto flex max-w-5xl flex-col gap-1 px-6 pt-6 pb-10 md:px-10">
              <p className="text-sm text-ticket/70">Kampus &middot; Layanan mahasiswa</p>
              <h1 className="font-display text-3xl font-bold md:text-4xl">
                Loket Barang Hilang
              </h1>
              <p className="max-w-xl text-sm text-ticket/70">
                Ambil nomor klaim untuk barang hilang, atau titipkan barang yang
                kamu temukan.
              </p>
            </div>
            <div className="mx-auto max-w-5xl px-6 md:px-10">
              <Nav />
            </div>
          </header>
          <main className="mx-auto max-w-5xl px-6 pt-10 pb-16 md:px-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
