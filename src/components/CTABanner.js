import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section
      className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="cta-banner-heading"
    >
      <div className="mx-auto max-w-4xl">
        <div
          className="relative flex flex-col items-center text-center gap-6 px-5 sm:px-8 py-10 sm:py-16 rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(79,70,229,0.08))",
            border: "1px solid rgba(124,58,237,0.2)",
          }}
        >
          {/* Subtle inner glow */}
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.12), transparent)",
            }}
            aria-hidden="true"
          />

          <div>
            <h2
              id="cta-banner-heading"
              className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3"
            >
              Ready to build your roadmap?
            </h2>
            <p className="text-base sm:text-lg" style={{ color: "#a0a0b4" }}>
              Tell us your goal — we&apos;ll do the rest.
            </p>
          </div>

          <Link
            href="#generate-form"
            className="btn-glow group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-full text-base font-semibold text-white transition-all duration-150 hover:scale-[1.03] hover:brightness-110 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
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
        </div>
      </div>
    </section>
  );
}
