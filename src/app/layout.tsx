import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PropsWithChildren } from "react";
import ThemeProvider from "@/theme";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Global Doors",
    description: "Demo Global Doors App",
};

export default function RootLayout({ children, }: PropsWithChildren) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ThemeProvider>
            <ReactQueryProvider>
                {children}
                <Toaster />
            </ReactQueryProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
