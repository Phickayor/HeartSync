import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  weight: ["300", "400", "500"],
  subsets: ["latin"]
});
export const metadata = {
  title: "HiBuddy",
  description: "Connect with your soulmate on Hibuddy"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={urbanist.className}>{children}</body>
    </html>
  );
}
