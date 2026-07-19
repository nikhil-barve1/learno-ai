"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Brain,
  ArrowLeft,
  Map,
  Calendar,
  BookOpen,
  BriefcaseBusiness,
  AlertTriangle,
  Trophy,
  Sparkles,
} from "lucide-react";
import {
  SectionHeader,
  OverviewSection,
  RoadmapPhaseCard,
  WeeklyPlanGrid,
  ResourceLink,
  ProjectCard,
  InterviewSection,
  MistakeCard,
  CapstoneCard,
} from "@/components/ReportSections";
import Footer from "@/components/Footer";

export default function RoadmapPage() {
  const [user, setUser] = useState({
    name: "Guest",
    technology: "React",
    experience: "Intermediate",
    months: 3,
    hours: 2,
  });

  const [roadmapData, setRoadmapData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    queueMicrotask(() => {
      const savedUser = sessionStorage.getItem("learnoai_user");
      const savedRoadmap = sessionStorage.getItem("learnoai_roadmap");

      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {}
      }

      if (savedRoadmap) {
        try {
          setRoadmapData(JSON.parse(savedRoadmap));
        } catch (e) {}
      }

      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="min-h-screen bg-[#0a0a0f]" />;
  }

  if (!roadmapData) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0a0a0f] selection:bg-violet-500/30 selection:text-white">
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0f]/80 border-b border-white/5">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-[#a0a0b4] hover:text-white transition-colors text-sm font-medium group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-bold tracking-tight text-white select-none">
                LearnoAI
              </span>
            </div>
          </div>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-violet-500/10 border border-violet-500/20 rounded-2xl flex items-center justify-center">
              <Map className="w-8 h-8 text-violet-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                No Roadmap Found
              </h2>
              <p className="text-[#a0a0b4]">
                It looks like you haven&apos;t generated a roadmap yet, or your
                session expired.
              </p>
            </div>
            <Link
              href="/#generate-form"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-[15px] font-semibold text-white transition-all duration-150 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 w-full"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              }}
            >
              <Sparkles className="w-4 h-4" />
              Generate a Roadmap
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const firstName = user.name.trim().split(/\s+/)[0] || "there";
  const totalHours = Math.round(user.months * 30 * user.hours);
  const personalizedOverview = `Hi ${firstName} 👋\n\nBased on your goal of becoming proficient in ${user.technology}, your current ${user.experience} experience, and your available study schedule of ${user.hours} hours per day for the next ${user.months} months (approximately ${totalHours} learning hours), I've created a personalized roadmap designed to help you reach your goal efficiently.\n\n${roadmapData.overview || "This roadmap is structured to build strong fundamentals first, gradually introduce advanced concepts, reinforce learning through real-world projects, and prepare you for technical interviews without overwhelming you."}`;

  const data = {
    ...roadmapData,
    overview: personalizedOverview,
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-violet-500/30 selection:text-white">
      {/* Premium minimal header just for the report */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0f]/80 border-b border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#a0a0b4] hover:text-white transition-colors text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-bold tracking-tight text-white select-none">
              LearnoAI
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full relative pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-24">
          {/* Header Title */}
          <div className="text-center space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
              Your Personalised Plan
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Learning Roadmap
            </h1>
          </div>

          {/* 1. Overview */}
          <section id="overview" className="scroll-mt-24">
            <OverviewSection text={data.overview} />
          </section>

          {/* 3. Roadmap Phases */}
          <section id="phases" className="scroll-mt-24">
            <SectionHeader
              title="Roadmap Phases"
              icon={Map}
              description="Your journey broken down into manageable, logical milestones."
            />
            <div className="mt-8 space-y-6">
              {data.roadmap.map((phase, idx) => (
                <RoadmapPhaseCard key={idx} phase={phase} />
              ))}
            </div>
          </section>

          {/* 4. Weekly Study Plan */}
          <section id="weekly-plan" className="scroll-mt-24">
            <SectionHeader
              title="Weekly Study Plan"
              icon={Calendar}
              description="Exactly what to focus on week by week. No guessing."
            />
            <div className="mt-8">
              <WeeklyPlanGrid weeklyPlan={data.weekly_plan} />
            </div>
          </section>

          {/* 5 & 6. Resources */}
          <section id="resources" className="scroll-mt-24">
            <SectionHeader
              title="Curated Resources"
              icon={BookOpen}
              description="100% free, high-quality learning materials. Official docs and top tutorials only."
            />

            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 px-2">
                  Official Documentation
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {data.official_resources.map((res, idx) => (
                    <ResourceLink key={idx} resource={res} type="Docs" />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 px-2">
                  Free Learning Materials
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {data.learning_resources.map((res, idx) => (
                    <ResourceLink key={idx} resource={res} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 7. Practice Projects */}
          <section id="projects" className="scroll-mt-24">
            <SectionHeader
              title="Practice Projects"
              icon={BriefcaseBusiness}
              description="Build your portfolio while you learn. Rated by difficulty."
            />
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.projects.map((project, idx) => (
                <ProjectCard key={idx} project={project} />
              ))}
            </div>
          </section>

          {/* 8. Interview Preparation */}
          <section id="interview" className="scroll-mt-24">
            <SectionHeader
              title="Interview Preparation"
              icon={BriefcaseBusiness}
              description="Topics and strategies to help you land the job."
            />
            <div className="mt-8">
              <InterviewSection data={data.interview_preparation} />
            </div>
          </section>

          {/* 9. Beginner Mistakes */}
          <section id="mistakes" className="scroll-mt-24">
            <SectionHeader
              title="Beginner Mistakes"
              icon={AlertTriangle}
              description="Common pitfalls to avoid so you don't waste time."
            />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.beginner_mistakes.map((mistake, idx) => (
                <MistakeCard key={idx} mistake={mistake} />
              ))}
            </div>
          </section>

          {/* 10. Capstone Project */}
          <section id="capstone" className="scroll-mt-24">
            <SectionHeader
              title="Capstone Project"
              icon={Trophy}
              description="Your graduation piece. A complex project that proves you are job-ready."
            />
            <div className="mt-8">
              <CapstoneCard capstone={data.capstone_project} />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
