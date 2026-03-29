import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NYC to Charlotte Relocation Landing Page",
  description:
    "Stop paying NYC rent. Own a beautiful Charlotte home for less than your Manhattan studio costs. Get the free NYC to Charlotte Relocation Playbook.",
  keywords:
    "NYC to Charlotte, relocation, moving from New York to Charlotte, Charlotte NC real estate, rent to mortgage calculator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sansita:wght@400;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
