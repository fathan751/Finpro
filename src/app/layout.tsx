import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import Clientwrapper from "@/components/clientwrapper";
import { Toaster } from "@/components/ui/sonner";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Home",
  description: "Online Travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${raleway.variable} antialiased`}
      >
        <Clientwrapper>
          <Navbar/>
        </Clientwrapper>
        <main className="bg-gray-50 min-h-screen">{children}</main>
        <Footer/>
        <Toaster richColors position="bottom-right" theme="light"/>
      </body>
    </html>
  );
}
