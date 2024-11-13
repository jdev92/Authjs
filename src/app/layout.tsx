import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header/Header";
import connectToDbIfNotConnected from "@/utils/connectedToDbIfNotConnected";

export const metadata: Metadata = {
  title: "Future Kicks",
  description: "Shoes_app with Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectToDbIfNotConnected();

  return (
    <html lang="en">
      <body>
        <Header />

        {children}
      </body>
    </html>
  );
}
