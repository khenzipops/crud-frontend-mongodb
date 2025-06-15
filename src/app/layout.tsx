import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRUD WITH MONGODB",
  description: "Simple Project to Achieve CRUD Operation with MongoDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-poppins antialiased ">{children}</body>
    </html>
  );
}
