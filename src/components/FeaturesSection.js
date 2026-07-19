import {
  Map,
  Calendar,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  Lightbulb,
} from "lucide-react";

const features = [
  {
    id: "roadmap",
    icon: Map,
    title: "Personalised Roadmap",
    description:
      "A step-by-step learning path tailored to your exact goal and timeline — no guessing, no overwhelm.",
  },
  {
    id: "weekly-plan",
    icon: Calendar,
    title: "Weekly Study Plan",
    description:
      "Know exactly what to study each week. Your time is structured so you always know what comes next.",
  },
  {
    id: "resources",
    icon: BookOpen,
    title: "Free Resources",
    description:
      "Curated free courses, official docs, and videos — only the best, zero fluff or paid paywalls.",
  },
  {
    id: "interview",
    icon: BriefcaseBusiness,
    title: "Interview Prep",
    description:
      "Topics, questions, and strategies specifically chosen to help you land the job you're aiming for.",
  },
  {
    id: "projects",
    icon: Code2,
    title: "Practice Projects",
    description:
      "Real projects to build your portfolio while you learn — because employers want to see what you can do.",
  },
  {
    id: "mistakes",
    icon: Lightbulb,
    title: "Avoid Beginner Mistakes",
    description:
      "The top mistakes people make learning your exact goal — so you skip the pain and save weeks.",
  },
];

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <article
      className="group flex flex-col gap-4 p-6 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 cursor-default hover:border-[rgba(124,58,237,0.3)]"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Icon box */}
      <div
        className="flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0"
        style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.2)" }}
        aria-hidden="true"
      >
        <Icon className="w-5 h-5 text-violet-400" />
      </div>

      {/* Text */}
      <div>
        <h3 className="text-base font-semibold text-white mb-1.5">{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "#8888a0" }}>
          {description}
        </p>
      </div>
    </article>
  );
}

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="text-center mb-8 sm:mb-16">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#7c3aed" }}
          >
            What You Get
          </p>
          <h2
            id="features-heading"
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            Everything you need to go from zero to job-ready.
          </h2>
        </div>

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          role="list"
        >
          {features.map((feature) => (
            <div key={feature.id} role="listitem">
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
