import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from "next/font/google";
import { Toaster } from 'sonner';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CodeCast",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Toaster theme="light" position="bottom-center"/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
