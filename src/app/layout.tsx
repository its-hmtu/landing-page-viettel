import "@/lib/polyfills";
import "./globals.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ButtonToTop from "@/components/ui/button-to-top";
// import Chat from "./components/chat";
import ContacNow from "./components/contac-now";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = 'GTM-M7CJMKX6';
  return (
    <html lang="en">
      <body className="antialiased max-w-[100dvw] overflow-x-hidden">
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `<!-- Google Tag Manager -->
            <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', ${gtmId});</script>
            <!-- End Google Tag Manager -->`,
          }}
        />
        {/* <Chat /> */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Header />
        <ContacNow />
        {children}
        <ButtonToTop />
        <Footer />
      </body>
    </html>
  );
}
