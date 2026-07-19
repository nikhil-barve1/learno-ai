import Link from "next/link";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center px-4 pt-28 pb-14 sm:pt-32 sm:pb-20 lg:min-h-screen overflow-hidden text-center"
      aria-label="Hero"
    >
      {/* Ambient background orbs */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 ambient-orb-left"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 ambient-orb-right"
        aria-hidden="true"
      />

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 grid-overlay"
        aria-hidden="true"
      />

      {/* Badge pill */}
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-violet-300 mb-8 animate-fade-in"
        style={{
          border: "1px solid rgba(124,58,237,0.4)",
          background: "rgba(124,58,237,0.12)",
        }}
        aria-label="Product category"
      >
        <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
        <span>AI-Powered Learning Consultant</span>
      </div>

      {/* Main headline */}
      <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold leading-[1.1] tracking-tight text-white mb-6">
        Your{" "}
        <span className="gradient-text">Personalised</span>{" "}
        Learning Roadmap
        <br className="hidden sm:block" />
        Generated in Seconds.
      </h1>

      {/* Sub-heading */}
      <p
        className="max-w-2xl text-base sm:text-lg leading-relaxed mb-10"
        style={{ color: "#a0a0b4" }}
      >
        Stop Googling. Start Learning.
        <br className="hidden sm:block" />
        Tell us your goal and we&apos;ll build your complete study plan,
        resource list, and interview prep instantly.
      </p>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="#generate-form"
          className="btn-glow group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white transition-all duration-150 hover:scale-[1.03] hover:brightness-110 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] w-full sm:w-auto justify-center"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
          }}
        >
          <span>Generate My Roadmap</span>
          <ArrowRight
            className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-[3px]"
            aria-hidden="true"
          />
        </Link>

        <a
          href="#how-it-works"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold transition-all duration-150 hover:bg-white/[0.04] active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] w-full sm:w-auto justify-center"
          style={{
            color: "#a0a0b4",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
          aria-label="Learn how LearnoAI works"
        >
          <span>See How It Works</span>
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
