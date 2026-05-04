import type { Metadata } from "next";
import { Raleway, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/components/providers";
import ThemeBackground from "@/components/ThemeBackground";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Sandnes Productions | Webutvikling for småbedrifter",
  description:
    "Sandnes Productions lager moderne, raske nettsider for småbedrifter. Ta kontakt og la oss bygge noe bra sammen.",
  keywords: [
    "webutvikling",
    "frilans",
    "småbedrifter",
    "Next.js",
    "Sandnes Productions",
    "web development",
    "Norway",
  ],
  openGraph: {
    title: "Sandnes Productions",
    description: "Webutvikling for småbedrifter | Web Development for Small Businesses",
    type: "website",
    locale: "nb_NO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="no"
      suppressHydrationWarning
      className={`${raleway.variable} ${plusJakarta.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased relative">
        <Providers>
          <ThemeBackground />
          {/* All content sits above the background */}
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
