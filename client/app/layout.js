import { Urbanist } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const urbanist = Urbanist({
  weight: ["200", "300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-urbanist"
});
export const metadata = {
  title: "Big Circle",
  description: "Bringing together people who share similar interests ❤😊✨"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${urbanist.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
