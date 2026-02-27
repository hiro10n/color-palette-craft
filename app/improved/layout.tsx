import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function ImprovedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={inter.className}>{children}</div>;
}
