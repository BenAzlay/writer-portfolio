import { Ubuntu } from "next/font/google";
import "./globals.css";

const inter = Ubuntu({
  subsets: ["latin"],
  weight: ['300', '400', '500', '700'],
});

export const metadata = {
  title: "Eldar Sofer | Wisdom for a New Age",
  description: "Writing tales to bring wisdom to the 21st century",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
