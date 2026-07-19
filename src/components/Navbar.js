import Link from "next/link";
import { ArrowRight, Brain } from "lucide-react";

export default function Navbar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "rgba(10, 10, 15, 0.8)" }}
        aria-hidden="true"
      />
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] rounded-md"
          aria-label="LearnoAI — home"
        >
          <span
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-transform duration-200 group-hover:scale-110"
            style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)" }}
            aria-hidden="true"
          >
            <Brain className="w-4 h-4 text-violet-400" />
          </span>
          <span className="text-lg font-bold tracking-tight select-none">
            <span className="text-white">Learno</span>
            <span className="gradient-text">AI</span>
          </span>
        </Link>

        {/* Single CTA */}
        <Link
          href="#generate-form"
          className="btn-glow flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-150 hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
          }}
        >
          <span>Get Your Roadmap</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
