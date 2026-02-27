import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "カラーパレット生成",
  description: "キーワードやベースカラーからカラーパレットを自動生成するツール",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
