import Link from "next/link";
import { Brain, GitBranch, Triangle } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="py-12 px-4 sm:px-6 lg:px-8"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="mx-auto max-w-5xl flex flex-col items-center text-center gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 group focus:outline-none rounded-md"
          aria-label="LearnoAI — home"
        >
          <span
            className="flex items-center justify-center w-6 h-6 rounded-md transition-transform duration-200 group-hover:scale-110"
            style={{
              background: "rgba(124,58,237,0.2)",
              border: "1px solid rgba(124,58,237,0.3)",
            }}
            aria-hidden="true"
          >
            <Brain className="w-3.5 h-3.5 text-violet-400" />
          </span>
          <span className="text-base font-bold tracking-tight select-none">
            <span className="text-white">Learno</span>
            <span className="gradient-text">AI</span>
          </span>
        </Link>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-white">
            Your AI Learning Consultant
          </p>
          <p className="text-sm" style={{ color: "#8888a0" }}>
            Personalized learning roadmaps powered by AI.
          </p>
        </div>

        <p className="text-xs" style={{ color: "#555570" }}>
          © 2026 LearnoAI
          <br />
          Crafted by Team NikAI
        </p>

        <div className="flex items-center gap-4 mt-2">
          <a
            href="https://github.com/nikhil-barve1/learno-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#555570] hover:text-white transition-colors duration-150 flex items-center gap-1.5 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-sm"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
