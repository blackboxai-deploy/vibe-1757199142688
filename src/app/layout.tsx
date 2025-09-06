import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lista de Supermercado",
  description: "Aplicativo para gerenciar sua lista de compras do supermercado",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={cn(
        inter.className,
        "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 antialiased"
      )}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}