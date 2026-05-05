import type { Metadata } from "next";
import { Raleway, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import ThemeBackground from "@/components/ThemeBackground";

const raleway = Raleway({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Sandnes Productions | Nettsider for småbedrifter",
  description:
    "Sandnes Productions lager raske, moderne nettsider for småbedrifter. Ferdig på 2–4 uker, uten kodekunnskap nødvendig.",
  keywords: ["nettside", "web development", "freelance", "småbedrift", "Sandnes Productions"],
  icons: {
    icon: "/SPlogo.png",
    apple: "/SPlogo.png",
  },
  openGraph: {
    title: "Sandnes Productions",
    description: "Nettsider for småbedrifter",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="no"
      suppressHydrationWarning
      className={`${raleway.variable} ${jakarta.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col relative">
        <Providers>
          <ThemeBackground />
          <div className="relative z-10 flex flex-col min-h-full">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
