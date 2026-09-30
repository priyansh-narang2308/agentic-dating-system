import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/navbar";
import { TooltipProvider } from "../components/ui/tooltip";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "DateMe - Autonomous Agentic Dating System",
  description:
    "AI agents date on behalf of real people. Agents analyze verified public LinkedIn and Instagram profiles, negotiate dates, and rank mutual compatibility.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TooltipProvider>
          <Navbar />
          <main className="flex-1">
            {children}
            <Toaster richColors position="bottom-right" />
          </main>
        </TooltipProvider>
      </body>
    </html>
  );
}
