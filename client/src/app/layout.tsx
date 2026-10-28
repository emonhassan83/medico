import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/lib/Providers/Providers";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medico | Hospital & Clinic Management System",
  description: "Medico is a comprehensive healthcare management platform, offering seamless appointment scheduling, patient management, and real-time updates for healthcare professionals."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html>
        <body className={`${poppins.className}`}>
          <>
            <Toaster position="top-center" />
            {children}
            {/* <AntdRegistry></AntdRegistry> */}
          </>
        </body>
      </html>
    </Providers>
  );
}
