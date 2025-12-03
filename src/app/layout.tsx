import "@/lib/polyfills";
import "./globals.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ButtonToTop from "@/components/ui/button-to-top";
// import Chat from "./components/chat";
import ContacNow from "./components/contac-now";
// import Script from "next/script";
import {
  GoogleTagManager
} from '@next/third-parties/google';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = 'GTM-M7CJMKX6';
  return (
    <html lang="en">
      <GoogleTagManager gtmId={gtmId} />
      <body className="antialiased max-w-[100dvw] overflow-x-hidden">
        {/* <Chat /> */}
        <Header />
        <ContacNow />
        {children}
        <ButtonToTop />
        <Footer />
      </body>
    </html>
  );
}
