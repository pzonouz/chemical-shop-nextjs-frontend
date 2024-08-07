import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import StoreProvider from "./StoreProvider";
import ToastProvider from "./providers/toast.provider";
import Navbar from "./components/Navigation/Navbar";
import Loading from "./components/utils/Loading";

const IranSans = localFont({
  src: [
    {
      path: "../public/fonts/woff2/IRANSansX-Regular.woff2",
      style: "normal",
      weight: "",
    },
    {
      path: "../public/fonts/woff2/IRANSansX-Bold.woff2",
      style: "bold",
      weight: "700",
    },
    {
      path: "../public/fonts/woff2/IRANSansX-DemiBold.woff2",
      style: "semibold",
      weight: "600",
    },
    {
      path: "../public/fonts/woff2/IRANSansX-ExtraBold.woff2",
      style: "extrabold",
      weight: "800",
    },
    {
      path: "../public/fonts/woff2/IRANSansX-Medium.woff2",
      style: "medium",
      weight: "500",
    },
    {
      path: "../public/fonts/woff2/IRANSansX-Light.woff2",
      style: "light",
      weight: "300",
    },
    {
      path: "../public/fonts/woff2/IRANSansX-Thin.woff2",
      style: "thin",
      weight: "100",
    },
    {
      path: "../public/fonts/woff2/IRANSansX-UltraLight.woff2",
      style: "ultralight",
      weight: "200",
    },
  ],
});

export const metadata: Metadata = {
  title: "نانوشاپ",
  description: "فروشگاه تخصصی محصولات شیمیایی نانو و سنتزی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl" data-theme="light" className=" scroll-smooth">
      <body className={IranSans.className}>
        <StoreProvider>
          <ToastProvider>
            <Loading />
            <Navbar />
            {children}
          </ToastProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
