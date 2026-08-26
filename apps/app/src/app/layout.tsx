import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeModeScript } from 'flowbite-react';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openwarnde.web.app"),

  title: {
    default: "OpenWarnDE",
    template: "%s | OpenWarnDE",
  },

  description:
    "OpenWarnDE ist eine offene Plattform für öffentliche Gefährdungs- und Warninformationen in Deutschland mit besonderem Fokus auf Feuerwehr und Katastrophenschutz.",

  applicationName: "OpenWarnDE",

  keywords: [
    "OpenWarnDE",
    "Warnmeldungen",
    "Warnungen",
    "Deutschland",
    "Katastrophenschutz",
    "Bevölkerungsschutz",
    "Gefahreninformationen",
    "Unwetterwarnungen",
    "Live-Warnungen",
    "Feuerwehr",
  ],

  authors: [
    {
      name: "OpenWarnDE",
      url: "https://openwarnde.web.app/",
    },
  ],

  creator: "OpenWarnDE",
  publisher: "OpenWarnDE",

  alternates: {
    canonical: "https://openwarnde.web.app/",
  },

  openGraph: {
    type: "website",
    locale: "de_DE",

    url: "https://openwarnde.web.app/",
    siteName: "OpenWarnDE",

    title: "OpenWarnDE",

    description:
      "OpenWarnDE ist eine sich in Entwicklung befindende Plattform für öffentliche Warnmeldungen, Gefahreninformationen und Lageinformationen in Deutschland.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  formatDetection: {
    telephone: false,
  },

  category: "technology",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeModeScript />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
