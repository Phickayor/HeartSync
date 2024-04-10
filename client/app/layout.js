import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  weight: ["300", "400", "500"],
  subsets: ["latin"]
});
export const metadata = {
  title: "Big Circle",
  description: "Bringing together people who share similar interests ❤😊✨"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={urbanist.className}>{children}</body>
    </html>
  );
}
