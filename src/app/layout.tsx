import "./globals.css";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Created by Kodai",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
