import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RGU | Rathinam Global University — The RGU Way",
  description: "Rathinam Global University — Career Ready, Globally Ready, Future Ready. Experience The RGU Way: a structured student transformation model built for the world.",
  keywords: "Rathinam Global University, RGU, The RGU Way, Career Ready, Global University, Higher Education, Coimbatore",
  openGraph: {
    title: "RGU | Rathinam Global University",
    description: "The RGU Way: Career Readiness + Global Readiness",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
