import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import { Suspense } from "react";
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
          <Suspense fallback={<div className="fixed bottom-0 left-0 right-0 bg-white h-16 max-w-md mx-auto"></div>}>
            <Navigation />
          </Suspense>
        </div>
      </body>
    </html>
  );
}
