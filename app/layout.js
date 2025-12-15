import { Plus_Jakarta_Sans, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import DarkVeil from "@/components/background.jsx";

const geistSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata = {
  title: "EPOCH 4.0 Hackathon",
  description: "Official website of EPOCH 4.0 Hackathon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {/* Page wrapper */}
        <div className="relative min-h-screen overflow-hidden">
          {/* Background */}
          <DarkVeil />

          {/* Foreground content */}
          <div className="relative z-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
