import type { Metadata } from "next";
import { Inter, Nanum_Gothic_Coding, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./(components)/Navbar";
import { AppWrapper } from "./(components)/context";
import Footer from "./(components)/Footer";

// const inter = Inter({ subsets: ["latin"] });
const nanum = Nanum_Gothic_Coding({
  subsets: ["latin"],
  weight: ["400", "700"],
});

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
      <body className={nanum.className}>
        <AppWrapper>
          <Navbar />
          {children}
          <Footer />
        </AppWrapper>
      </body>
    </html>
  );
}
