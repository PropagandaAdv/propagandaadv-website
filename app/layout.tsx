import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const siteUrl = "https://propagandaadv.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Propaganda Adv — Marketing che porta clienti.",
    template: "%s | Propaganda Adv",
  },
  description:
    "Agenzia di marketing e comunicazione per PMI italiane. Siti web, advertising, SEO ed email marketing in un unico processo data-driven. Idee veloci, decisioni chiare, risultati misurabili.",
  keywords: [
    "agenzia marketing PMI",
    "siti web WordPress",
    "advertising Google Ads Meta Ads",
    "SEO per PMI",
    "email marketing",
    "agenzia di comunicazione Italia",
    "Propaganda Adv",
  ],
  authors: [{ name: "Propaganda Adv" }],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: siteUrl,
    siteName: "Propaganda Adv",
    title: "Propaganda Adv — Marketing che porta clienti.",
    description:
      "Idee veloci. Decisioni chiare. Risultati misurabili. Il partner che affianca le PMI italiane nella crescita digitale.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Propaganda Adv — Marketing che porta clienti.",
    description: "Idee veloci. Decisioni chiare. Risultati misurabili.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#233DFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={poppins.variable}>
      <body className="font-sans antialiased bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
        >
          Vai al contenuto
        </a>
        {children}
      </body>
    </html>
  );
}
