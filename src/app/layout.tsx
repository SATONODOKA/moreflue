import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "インフルエンサー案件管理アプリ",
  description: "インフルエンサーが店舗案件を効率的に管理できるプラットフォーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased bg-light-greige">
        <div className="min-h-screen pb-16">
          <main className="max-w-md mx-auto bg-white min-h-screen">
            {children}
          </main>
          <Navigation />
        </div>
      </body>
    </html>
  );
}
