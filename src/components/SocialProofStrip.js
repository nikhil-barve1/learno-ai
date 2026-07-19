import { Zap, Target, Brain, Gift } from "lucide-react";

const proofItems = [
  {
    id: "speed",
    icon: Zap,
    text: "Generated in under 10 seconds",
  },
  {
    id: "content",
    icon: Target,
    text: "7 sections of personalised content",
  },
  {
    id: "gemini",
    icon: Brain,
    text: "Powered by Google Gemini",
  },
  {
    id: "free",
    icon: Gift,
    text: "100% Free",
  },
];

export default function SocialProofStrip() {
  return (
    <section
      className="relative py-6"
      aria-label="Product highlights"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center gap-x-4 gap-y-4 sm:gap-8">
          {proofItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={item.id} className="flex items-center gap-3">
                {/* Divider between items (desktop only) */}
                {index > 0 && (
                  <div
                    className="hidden sm:block w-px h-4 flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                    aria-hidden="true"
                  />
                )}
                <div className="flex items-center gap-2">
                  <Icon
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "#7c3aed" }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-sm"
                    style={{ color: "#8888a0" }}
                  >
                    {item.text}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
