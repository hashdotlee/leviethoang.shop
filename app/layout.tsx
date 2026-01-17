import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "2Hand Market - Mua bán đồ secondhand Nhật, Âu",
  description: "Nền tảng mua bán đồ secondhand Nhật Bản và Âu Mỹ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased bg-gray-50">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
