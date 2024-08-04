"use client"

// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic'
import {usePathname} from "next/navigation";

const inter = Inter({ subsets: ['latin'] });
const MasterLayout = dynamic(()=> import("@/components/layout/master"))

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const pathname = usePathname()
    const useDialogOnly = pathname === '/maps';

    return (
        <html lang="en">
            <body className={inter.className}>
                <MasterLayout path={pathname} useDialogOnly={useDialogOnly}>
                    {children}
                </MasterLayout>
            </body>
        </html>
    );
}
