import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "4wrdskate | Premium Roller Skating",
  description: "Learn to skate with the best. Saturday classes now available.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-glow"></div>
        <div className="bg-glow-2"></div>
                <main >
          {children}
        </main>
      </body>
    </html>
  );
}
