import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dotshef",
  description: "세상에 필요한 맛있는 소프트웨어",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
          <title>DotShef</title>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
