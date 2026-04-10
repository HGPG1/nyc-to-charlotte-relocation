import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NYC to Charlotte Relocation Landing Page",
  description:
    "Stop paying NYC rent. Own a beautiful Charlotte home for less than your Manhattan studio costs. Get the free NYC to Charlotte Relocation Playbook.",
  keywords:
    "NYC to Charlotte, relocation, moving from New York to Charlotte, Charlotte NC real estate, rent to mortgage calculator",
  metadataBase: new URL("https://relocate.homegrownpropertygroup.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://relocate.homegrownpropertygroup.com/",
    title: "NYC to Charlotte Relocation | Home Grown Property Group",
    description:
      "Stop paying NYC rent. Own a beautiful Charlotte home for less than your Manhattan studio costs. Free relocation playbook with neighborhood guides and cost breakdowns.",
    images: [
      {
        url: "/images/charlotte-skyline.jpg",
        width: 1200,
        height: 630,
        alt: "Charlotte NC Skyline",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NYC to Charlotte Relocation | Home Grown Property Group",
    description:
      "Stop paying NYC rent. Own a beautiful Charlotte home for less. Free relocation playbook.",
    images: ["/images/charlotte-skyline.jpg"],
  },
  icons: {
    icon: "/images/hgpg-logo.png",
    apple: "/images/hgpg-logo.png",
  },
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
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '4259881614223735');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=4259881614223735&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
