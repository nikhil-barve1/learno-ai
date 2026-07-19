import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "LearnoAI — Your Personalised Learning Roadmap",
  description:
    "LearnoAI is an AI-powered learning consultant that generates personalised learning roadmaps, weekly study plans, and interview prep in seconds. Powered by Google Gemini.",
  keywords: [
    "learning roadmap",
    "AI learning",
    "study plan",
    "career roadmap",
    "interview preparation",
  ],
  openGraph: {
    title: "LearnoAI — Your Personalised Learning Roadmap",
    description:
      "Stop Googling. Start Learning. Tell us your goal and we'll build your complete study plan instantly.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-white">
        {children}
      </body>
    </html>
  );
}
