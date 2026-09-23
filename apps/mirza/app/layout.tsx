import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  // TODO: replace with real name/title once resume content is provided
  title: "Mirza — Resume",
  description: "Personal resume and portfolio of Mirza.",
  metadataBase: new URL("https://mirza.dxb.az"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
