import type { Metadata } from "next";

import "./globals.css";
import { WalletProvider } from "@/context/WalletProvider";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "ToDo Web3 App",
  description: "ToDo Web3 App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
