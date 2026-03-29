import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NYC to Charlotte Relocation Guide | Home Grown Property Group",
  description: "Your complete guide to relocating from New York City to Charlotte, NC. Compare cost of living, explore neighborhoods, and use our rent-to-mortgage calculator.",
  keywords: "NYC to Charlotte, relocation guide, moving from New York to Charlotte, Charlotte NC real estate, rent to mortgage calculator",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sansita:wght@400;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
