import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WishlistProvider } from "@/components/wishlist-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SteamPulse — Track Steam Deals in Real Time",
  description: "Live Steam deals feed, wishlist tracking, AI review summaries, and price history charts in one dashboard.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-950 text-slate-100`}>
        <ThemeProvider>
          <WishlistProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
