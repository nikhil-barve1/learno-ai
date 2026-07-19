import { 
  CheckCircle2, 
  BookOpen, 
  Link as LinkIcon, 
  ExternalLink, 
  Clock, 
  Trophy, 
  Target, 
  AlertTriangle,
  Lightbulb,
  Play,
  MonitorPlay,
  FileCode2,
  BrainCircuit,
  GraduationCap
} from "lucide-react";

export function SectionHeader({ title, icon: Icon, description }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-[rgba(124,58,237,0.15)] border border-[rgba(124,58,237,0.2)]">
          <Icon className="w-5 h-5 text-violet-400" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h2>
      </div>
      {description && <p className="text-[#a0a0b4] text-sm leading-relaxed">{description}</p>}
    </div>
  );
}

export function OverviewSection({ text }) {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-32 bg-violet-500/5 blur-[100px] rounded-full pointer-events-none transition-opacity group-hover:bg-violet-500/10" />
      <p className="text-base sm:text-lg text-white leading-relaxed font-medium relative z-10 whitespace-pre-wrap">
        {text}
      </p>
    </div>
  );
}

export function RoadmapPhaseCard({ phase }) {
  return (
    <div className="flex gap-4 sm:gap-6 relative group">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(124,58,237,0.15)] border border-[rgba(124,58,237,0.4)] text-violet-300 font-bold text-sm shrink-0 z-10">
          {phase.phase_number}
        </div>
        <div className="w-[1px] h-full bg-gradient-to-b from-[rgba(124,58,237,0.4)] to-[rgba(255,255,255,0.05)] mt-2 group-last:hidden" />
      </div>
      <div className="pb-8 group-last:pb-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
          <h3 className="text-lg font-bold text-white">{phase.title}</h3>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/5 text-[#a0a0b4] border border-white/10">
            {phase.duration}
          </span>
        </div>
        <p className="text-sm text-[#8888a0] leading-relaxed">{phase.description}</p>
      </div>
    </div>
  );
}

export function WeeklyPlanGrid({ weeklyPlan }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {weeklyPlan.map((week, index) => (
        <div 
          key={index} 
          className={`p-5 rounded-xl border transition-colors duration-200 ${
            week.is_project_week 
              ? "bg-[rgba(124,58,237,0.05)] border-[rgba(124,58,237,0.2)] hover:border-[rgba(124,58,237,0.4)]" 
              : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)]"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-bold uppercase tracking-wider ${week.is_project_week ? "text-violet-400" : "text-[#8888a0]"}`}>
              {week.week}
            </span>
            {week.is_project_week && (
              <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-violet-300 bg-violet-500/20 px-2 py-0.5 rounded-full">
                <Target className="w-3 h-3" /> Project
              </span>
            )}
          </div>
          <h4 className="text-white font-semibold mb-2">{week.topic}</h4>
          <p className="text-sm text-[#a0a0b4] leading-relaxed">{week.details}</p>
        </div>
      ))}
    </div>
  );
}

export function ResourceLink({ resource, type }) {
  const getIcon = () => {
    switch (resource.type || type) {
      case "YouTube": return <Play className="w-4 h-4 text-red-400" />;
      case "Course": return <MonitorPlay className="w-4 h-4 text-blue-400" />;
      case "Practice": return <FileCode2 className="w-4 h-4 text-emerald-400" />;
      default: return <LinkIcon className="w-4 h-4 text-[#8888a0]" />;
    }
  };

  return (
    <a 
      href={resource.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-200 group gap-3"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 p-1.5 rounded-md bg-[rgba(255,255,255,0.05)]">
          {getIcon()}
        </div>
        <div>
          <h4 className="text-white font-medium group-hover:text-violet-300 transition-colors">{resource.name}</h4>
          <p className="text-sm text-[#8888a0] mt-1">{resource.description}</p>
        </div>
      </div>
      <ExternalLink className="w-4 h-4 text-[#555570] group-hover:text-violet-400 shrink-0 self-end sm:self-center" />
    </a>
  );
}

export function ProjectCard({ project }) {
  const getDifficultyColor = (diff) => {
    switch (diff) {
      case "Beginner": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "Intermediate": return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "Advanced": return "text-rose-400 bg-rose-400/10 border-rose-400/20";
      default: return "text-violet-400 bg-violet-400/10 border-violet-400/20";
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)] transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h4 className="text-white font-bold text-lg">{project.title}</h4>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-medium text-[#a0a0b4]">
            <Clock className="w-3.5 h-3.5" />
            {project.estimated_time}
          </span>
          <span className={`text-[11px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${getDifficultyColor(project.difficulty)}`}>
            {project.difficulty}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.skills_practiced.map((skill, idx) => (
          <span key={idx} className="text-xs font-medium text-[#8888a0] bg-[rgba(255,255,255,0.04)] px-2.5 py-1 rounded-md border border-[rgba(255,255,255,0.03)]">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export function InterviewSection({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-2 mb-4">
          <BrainCircuit className="w-5 h-5 text-violet-400" />
          <h4 className="text-white font-semibold">Key Topics to Master</h4>
        </div>
        <ul className="space-y-3">
          {data.key_topics.map((topic, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-[#a0a0b4]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{topic}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-violet-400" />
          <h4 className="text-white font-semibold">Preparation Strategy</h4>
        </div>
        <ul className="space-y-3">
          {data.strategy.map((strat, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-[#a0a0b4]">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 mt-2" />
              <span>{strat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function MistakeCard({ mistake }) {
  return (
    <div className="flex flex-col gap-3 p-5 rounded-xl bg-amber-500/5 border border-amber-500/10">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
        <p className="text-sm font-medium text-amber-100">{mistake.mistake}</p>
      </div>
      <div className="flex items-start gap-3 ml-1">
        <div className="w-4 h-4 flex items-center justify-center shrink-0">
          <div className="w-1 h-4 bg-emerald-500/30 rounded-full" />
        </div>
        <p className="text-sm text-emerald-200/80">{mistake.fix}</p>
      </div>
    </div>
  );
}

export function CapstoneCard({ capstone }) {
  return (
    <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[rgba(124,58,237,0.1)] to-[rgba(255,255,255,0.02)] border border-[rgba(124,58,237,0.2)] overflow-hidden">
      <div className="absolute top-0 right-0 p-32 bg-violet-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-violet-300">Final Graduation Project</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{capstone.title}</h3>
        
        <p className="text-[#a0a0b4] text-sm leading-relaxed mb-6">
          {capstone.why_this_project}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-violet-400" /> Core Features
            </h4>
            <ul className="space-y-2">
              {capstone.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-[#8888a0]">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500/50 shrink-0 mt-1.5" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <FileCode2 className="w-4 h-4 text-violet-400" /> Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {capstone.tech_stack.map((tech, idx) => (
                <span key={idx} className="text-xs font-semibold text-white bg-white/10 px-3 py-1.5 rounded-lg border border-white/5">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
