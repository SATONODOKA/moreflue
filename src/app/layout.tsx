import type { Metadata } from "next";
import "./globals.css";
import MobileLayout from "@/components/Layout/MobileLayout";

export const metadata: Metadata = {
  title: "MoreFlue - 店舗向けインフルエンサーマーケティング",
  description: "手間なく、納得感を持って、信頼できるインフルエンサーに依頼し、成果を直感的に理解できるプラットフォーム",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <MobileLayout>
          {children}
        </MobileLayout>
      </body>
    </html>
  );
}
