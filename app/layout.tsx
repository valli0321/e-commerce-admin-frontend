import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ModalProvider } from "@/providers/modal-provider";
import { ReduxProvider, AuthInitializer } from "@/providers/redux-provider";
import { ToasterProvider } from "@/providers/toast-provider";

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <ReduxProvider>
                <AuthInitializer>
                  <ToasterProvider/>
                  <ModalProvider/>
                  {children}
                </AuthInitializer>
              </ReduxProvider>
            </ThemeProvider>
        </body>
      </html>
  );
}
