import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import styles
import "./globals.css";
import x from '@/styles/app.module.css';
// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
// import components
import HeaderExample from "@/components/app.header";
import FooterExample from "@/components/app.footer";
import { ToastContainer } from 'react-toastify';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog List",
  description: "Generated by create next app",
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
        {/* <header>
          <HeaderExample />
        </header> */}

        <Container>
          <main className={x['margin-vertical']}>
            {children}
          </main>
        </Container>

        {/* <footer>
          <FooterExample />
        </footer> */}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

      </body>


    </html>
  );
}
