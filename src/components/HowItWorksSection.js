import { ChevronRight } from "lucide-react";

const steps = [
  {
    id: "fill",
    number: "01",
    title: "Fill the form",
    description:
      "Tell us your name, goal, experience level, and how much time you have. Takes under 30 seconds.",
    time: "~30 seconds",
  },
  {
    id: "generate",
    number: "02",
    title: "AI generates your plan",
    description:
      "Google Gemini analyses your inputs and builds a completely personalised roadmap just for you.",
    time: "Under 10 seconds",
  },
  {
    id: "learn",
    number: "03",
    title: "Start learning today",
    description:
      "Receive a structured roadmap, resource list, weekly plan, and interview prep — ready to use immediately.",
    time: "Today",
  },
];

function StepItem({ step, isLast }) {
  return (
    <>
      <article className="flex flex-col items-center text-center lg:items-start lg:text-left flex-1">
        {/* Ghost step number */}
        <div
          className="text-6xl font-black leading-none mb-4 select-none"
          style={{ color: "rgba(124,58,237,0.25)" }}
          aria-hidden="true"
        >
          {step.number}
        </div>

        <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>

        <p className="text-sm leading-relaxed mb-3" style={{ color: "#8888a0" }}>
          {step.description}
        </p>

        <span
          className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            color: "#7c3aed",
            background: "rgba(124,58,237,0.12)",
            border: "1px solid rgba(124,58,237,0.25)",
          }}
        >
          {step.time}
        </span>
      </article>

      {/* Arrow connector — desktop only, hidden after last item */}
      {!isLast && (
        <div
          className="hidden lg:flex items-center justify-center flex-shrink-0 px-4"
          aria-hidden="true"
        >
          <ChevronRight
            className="w-6 h-6"
            style={{ color: "rgba(255,255,255,0.15)" }}
          />
        </div>
      )}

      {/* Vertical connector — mobile only */}
      {!isLast && (
        <div
          className="lg:hidden flex items-center justify-center py-2"
          aria-hidden="true"
        >
          <div
            className="w-px h-8"
            style={{ background: "rgba(124,58,237,0.25)" }}
          />
        </div>
      )}
    </>
  );
}

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="how-it-works-heading"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <div className="text-center mb-8 sm:mb-16">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#7c3aed" }}
          >
            How It Works
          </p>
          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            Three steps. That&apos;s it.
          </h2>
        </div>

        {/* Steps — horizontal on lg, vertical on smaller */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-0">
          {steps.map((step, index) => (
            <StepItem
              key={step.id}
              step={step}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
