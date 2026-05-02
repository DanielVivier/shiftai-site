import type { Metadata } from "next";
import { Inter, Caveat, Kalam, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ShiftAI · Custom AI employees for founder-led businesses",
  description:
    "Daniel builds bespoke AI employees that take repetitive, judgment-light work off your plate. Every build documented openly.",
  openGraph: {
    title: "Your next hire shouldn't be human.",
    description:
      "Daniel builds bespoke AI employees that take repetitive, judgment-light work off your plate. Every build documented openly.",
    url: "https://shiftai.co.za",
    siteName: "ShiftAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your next hire shouldn't be human.",
    description:
      "Daniel builds bespoke AI employees that take repetitive, judgment-light work off your plate.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${caveat.variable} ${kalam.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
