import { Epilogue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "QuickHire - Job Board",
  description: "Find your dream job",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${epilogue.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
