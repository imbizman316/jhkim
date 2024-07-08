import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./(components)/Navbar";
import { AppWrapper } from "./(components)/context";
import Footer from "./(components)/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "J.H.Kim The Writer",
  description:
    "J.H.Kim is a writer from Korea, who is known for his unique satire style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppWrapper>
          <Navbar />
          {children}
          <Footer />
        </AppWrapper>
      </body>
    </html>
  );
}
