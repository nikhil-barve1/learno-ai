"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2, RotateCcw, Brain, AlertTriangle } from "lucide-react";
import {
  FormGroup,
  TextInput,
  AutocompleteInput,
  SelectInput,
  PillSelect,
  NumberInput,
} from "./FormFields";
import { resourceCatalog } from "@/data/resourceCatalog";

const supportedTechnologies = Array.from(new Set(resourceCatalog.map(r => r.technology)));

const LOADING_MESSAGES = [
  "Analyzing your goals...",
  "Calculating learning timeline...",
  "Selecting official resources...",
  "Preparing projects...",
  "Designing interview strategy...",
  "Finalizing your roadmap...",
];

export default function RoadmapForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    qualification: "",
    experience: "",
    technology: "",
    skillLevel: "",
    months: 3,
    hours: 2,
  });

  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [apiError, setApiError] = useState(null);

  const qualifications = [
    "High School",
    "Undergraduate",
    "Graduate",
    "Working Professional",
    "Other",
  ];
  const experiences = ["No experience", "0–1 years", "1–3 years", "3+ years"];
  const skillLevels = ["Beginner", "Intermediate", "Advanced"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      qualification: "",
      experience: "",
      technology: "",
      skillLevel: "",
      months: 3,
      hours: 2,
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.qualification)
      newErrors.qualification = "Please select your qualification";
    if (!formData.experience)
      newErrors.experience = "Please select your experience level";
    if (!formData.technology.trim()) {
      newErrors.technology = "Technology is required.";
    } else {
      const isValidTech = supportedTechnologies.some(
        tech => tech.toLowerCase() === formData.technology.trim().toLowerCase()
      );
      if (!isValidTech) {
        newErrors.technology = "Technology not recognized. Please choose a supported technology from the suggestions.";
      }
    }
    if (!formData.skillLevel)
      newErrors.skillLevel = "Please select your current skill level";
    if (!formData.months || formData.months < 1 || formData.months > 24)
      newErrors.months = "Must be between 1 and 24";
    if (!formData.hours || formData.hours < 0.5 || formData.hours > 8)
      newErrors.hours = "Must be between 0.5 and 8";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setApiError(null);
    setIsGenerating(true);
    setLoadingMessageIndex(0);
    setLoadingProgress(0);

    // Store user info for the roadmap page personalization header
    sessionStorage.setItem("learnoai_user", JSON.stringify(formData));

    try {
      const response = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (!response.ok || json.error) {
        throw new Error(json.error || "Failed to generate roadmap.");
      }

      // Save the real roadmap from Gemini
      sessionStorage.setItem("learnoai_roadmap", JSON.stringify(json.roadmap));

      // Complete the progress bar and navigate
      setLoadingProgress(100);
      setTimeout(() => {
        router.push("/roadmap");
      }, 400);
    } catch (err) {
      setIsGenerating(false);
      setApiError(err.message || "Unable to generate your roadmap. Please try again.");
    }
  };

  // Animate the loading progress bar and messages while waiting for the API
  useEffect(() => {
    if (!isGenerating) return;

    // Rotate messages every 800ms
    const messageInterval = setInterval(() => {
      setLoadingMessageIndex((prev) =>
        Math.min(prev + 1, LOADING_MESSAGES.length - 1),
      );
    }, 800);

    // Animate progress to ~85% while API call is in flight
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 85) return 85;
        return prev + Math.random() * 8;
      });
    }, 400);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [isGenerating]);

  // If generating, render the full-screen loading experience
  if (isGenerating) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0f] animate-fade-in">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.15), transparent 60%)",
          }}
          aria-hidden="true"
        />

        <div className="flex flex-col items-center text-center max-w-md px-6">
          <div className="w-16 h-16 mb-8 flex items-center justify-center rounded-2xl bg-[rgba(124,58,237,0.15)] border border-[rgba(124,58,237,0.3)] animate-pulse shadow-[0_0_30px_rgba(124,58,237,0.3)]">
            <Brain
              className="w-8 h-8 text-violet-400 animate-bounce"
              style={{ animationDuration: "2s" }}
            />
          </div>

          <h2
            className="text-2xl font-bold text-white mb-2 h-8 animate-fade-in"
            key={loadingMessageIndex}
          >
            {LOADING_MESSAGES[loadingMessageIndex]}
          </h2>

          <p className="text-[#a0a0b4] mb-10 text-sm">
            This usually takes 10–15 seconds.
          </p>

          <div className="w-full bg-[rgba(255,255,255,0.05)] rounded-full h-2 mb-2 overflow-hidden border border-[rgba(255,255,255,0.1)]">
            <div
              className="bg-gradient-to-r from-violet-600 to-indigo-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="w-full text-right text-xs text-[#55556a] font-mono">
            {Math.round(loadingProgress)}%
          </div>
        </div>
      </div>
    );
  }

  // Normal Form UI
  return (
    <section
      id="generate-form"
      className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 relative scroll-mt-16"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 600px 400px at 50% 50%, rgba(124,58,237,0.1), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Let&apos;s build your roadmap.
          </h2>
          <p className="text-base sm:text-lg" style={{ color: "#a0a0b4" }}>
            Answer a few questions and we&apos;ll generate your personalised
            learning plan.
          </p>
        </div>

        {apiError && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-200 animate-fade-in">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{apiError}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-[24px] p-6 sm:p-10"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          noValidate
        >
          <FormGroup title="👤 About You">
            <TextInput
              label="Full Name"
              id="name"
              name="name"
              placeholder="e.g. Alex"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <SelectInput
                label="Current Qualification"
                id="qualification"
                name="qualification"
                options={qualifications}
                value={formData.qualification}
                onChange={handleChange}
                error={errors.qualification}
                required
              />
              <SelectInput
                label="Current Experience"
                id="experience"
                name="experience"
                options={experiences}
                value={formData.experience}
                onChange={handleChange}
                error={errors.experience}
                required
              />
            </div>
          </FormGroup>

          <FormGroup title="🎯 Learning Goal">
            <AutocompleteInput
              label="Technology to Learn"
              id="technology"
              name="technology"
              placeholder="e.g. React, Python, Node.js..."
              value={formData.technology}
              onChange={handleChange}
              error={errors.technology}
              required
              options={supportedTechnologies}
            />
            <PillSelect
              label="Current Skill Level"
              name="skillLevel"
              options={skillLevels}
              value={formData.skillLevel}
              onChange={handleChange}
              error={errors.skillLevel}
              required
            />
          </FormGroup>

          <FormGroup title="⏰ Your Time">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <NumberInput
                label="Months Available"
                id="months"
                name="months"
                min="1"
                max="24"
                step="1"
                suffix="months"
                value={formData.months}
                onChange={handleChange}
                error={errors.months}
                required
              />
              <NumberInput
                label="Hours Per Day"
                id="hours"
                name="hours"
                min="0.5"
                max="8"
                step="0.5"
                suffix="hours"
                value={formData.hours}
                onChange={handleChange}
                error={errors.hours}
                required
              />
            </div>
            {formData.months &&
            formData.hours &&
            !errors.months &&
            !errors.hours ? (
              <p className="text-[13px] font-medium text-violet-300/80 bg-violet-900/20 px-4 py-2.5 rounded-lg border border-violet-500/20 mt-2 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                {formData.months} months × {formData.hours} hrs/day = ~
                {Math.round(formData.months * 30 * formData.hours)} hours of
                total learning time
              </p>
            ) : null}
          </FormGroup>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 mt-10">
            <button
              type="submit"
              disabled={isGenerating}
              className="btn-glow flex-1 flex items-center justify-center gap-2 p-4 sm:p-0 h-14 sm:h-16 w-full rounded-full text-[16px] font-semibold text-white transition-all duration-150 hover:scale-[1.01] hover:brightness-110 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              }}
            >
              <Sparkles className="w-5 h-5" />
              <span>Generate My Roadmap</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 h-14 sm:h-16 w-full sm:w-auto px-10 rounded-full text-[15px] font-medium text-[#a0a0b4] transition-all duration-150 border border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white hover:border-[rgba(255,255,255,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
