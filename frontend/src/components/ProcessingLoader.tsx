"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface ProcessingStep {
  id: string;
  label: string;
  duration: number;
  description: string;
}

const PROCESSING_STEPS: ProcessingStep[] = [
  {
    id: "warming-up",
    label: "Warming up AI model",
    duration: 60,
    description: "Initializing serverless GPU and loading neural networks",
  },
  {
    id: "checking-credits",
    label: "Checking credits",
    duration: 10,
    description: "Verifying your account balance",
  },
  {
    id: "processing",
    label: "Processing video",
    duration: 120,
    description: "Analyzing audio and identifying viral moments",
  },
  {
    id: "generating-clips",
    label: "Generating clips",
    duration: 60,
    description: "Creating clips and optimizing for social media",
  },
  {
    id: "finalizing",
    label: "Finalizing",
    duration: 15,
    description: "Saving clips and updating your dashboard",
  },
];

interface PersistedState {
  elapsedTime: number;
  progress: number;
  currentStepIndex: number;
  isComplete: boolean;
}

interface ProcessingLoaderProps {
  fileId: string;
  filename: string;
  status: string;
  onComplete?: () => void;
}

export function ProcessingLoader({
  fileId,
  filename,
  status,
  onComplete,
}: ProcessingLoaderProps) {
  const totalDuration = PROCESSING_STEPS.reduce(
    (sum, step) => sum + step.duration,
    0,
  );

  // Restore previous state
  const persisted: PersistedState | null = (() => {
    try {
      const raw = localStorage.getItem(`processing_${fileId}`);
      return raw ? (JSON.parse(raw) as PersistedState) : null;
    } catch {
      return null;
    }
  })();

  const [elapsedTime, setElapsedTime] = useState<number>(
    persisted?.elapsedTime ?? 0,
  );
  const [progress, setProgress] = useState<number>(persisted?.progress ?? 0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(
    persisted?.currentStepIndex ?? 0,
  );
  const [isComplete, setIsComplete] = useState<boolean>(
    persisted?.isComplete ?? false,
  );

  const currentStep = PROCESSING_STEPS[currentStepIndex];

  // Persist state
  useEffect(() => {
    const state: PersistedState = {
      elapsedTime,
      progress,
      currentStepIndex,
      isComplete,
    };
    localStorage.setItem(`processing_${fileId}`, JSON.stringify(state));
  }, [elapsedTime, progress, currentStepIndex, isComplete, fileId]);

  // Backend completion
  useEffect(() => {
    if (status === "processed") {
      setProgress(100);
      setIsComplete(true);

      setTimeout(() => {
        localStorage.removeItem(`processing_${fileId}`);
        onComplete?.();
      }, 1500);

      return;
    }

    if (status === "failed" || status === "no credits") {
      setIsComplete(true);
      localStorage.removeItem(`processing_${fileId}`);
      return;
    }
  }, [status, fileId, onComplete]);

  // Main timer logic
  useEffect(() => {
    if (!["queued", "processing"].includes(status)) return;

    const interval = setInterval(() => {
      setElapsedTime((prevElapsed) => {
        const newTime = prevElapsed + 0.1;

        // Determine step
        let accum = 0;
        let stepIdx = currentStepIndex;
        for (let i = 0; i < PROCESSING_STEPS.length; i++) {
          const step = PROCESSING_STEPS[i];
          if (!step) continue;
          if (newTime >= accum && newTime < accum + step.duration) {
            stepIdx = i;
            break;
          }
          accum += step.duration;
        }

        setCurrentStepIndex((prev) => Math.max(prev, stepIdx));

        // Progress (non-decreasing)
        const base = (newTime / totalDuration) * 100;
        const fluctuation = Math.sin(newTime * 0.3) * 1.5;
        const rawProgress = Math.min(97, base + fluctuation);

        setProgress((prev) => Math.max(prev, rawProgress));

        return newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [status, totalDuration, currentStepIndex]);

  // ---------------- SUCCESS UI ----------------
  if (status === "processed" && isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-[#F1F1F1] bg-gradient-to-br from-[#183EC2]/5 to-[#001E80]/5 p-6"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#183EC2] to-[#001E80]">
            <CheckCircle2 className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-[#010D3E]">
              Processing Complete!
            </h4>
            <p className="mt-1 text-sm text-[#010D3E]/70">{filename}</p>
            <p className="mt-2 text-sm font-medium text-[#183EC2]">
              Your clips are ready! Check the “My Clips” tab.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // ---------------- ERROR UI ----------------
  if ((status === "failed" || status === "no credits") && isComplete) {
    return (
      <motion.div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-red-900">
              {status === "no credits"
                ? "Insufficient Credits"
                : "Processing Failed"}
            </h4>
            <p className="mt-1 text-sm text-red-700">{filename}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  // ---------------- LOADING UI (RESTORED OLD UI) ----------------
  return (
    <motion.div className="rounded-2xl border border-[#F1F1F1] bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-[#010D3E]">{filename}</h4>
          <p className="mt-1 text-xs text-[#010D3E]/60">
            Processing video… This may take 3–5 minutes
          </p>
        </div>

        {/* Progress + Time */}
        <div className="text-right">
          <div className="text-2xl font-bold text-[#183EC2]">
            {Math.round(progress)}%
          </div>
          <div className="text-xs text-[#010D3E]/60">
            {Math.floor(elapsedTime / 60)}:
            {String(Math.floor(elapsedTime % 60)).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-6 h-3 w-full overflow-hidden rounded-full bg-[#EAEEFE]">
        <motion.div
          className="h-full bg-gradient-to-r from-[#183EC2] to-[#001E80] shadow-lg shadow-[#183EC2]/30"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Current Step */}
      <AnimatePresence mode="wait">
        {currentStep && (
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-start gap-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#183EC2]/10">
              <Loader2 className="h-4 w-4 animate-spin text-[#183EC2]" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-[#010D3E]">
                {currentStep.label}
              </p>
              <p className="mt-1 text-sm text-[#010D3E]/60">
                {currentStep.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Steps Indicator (1–5) */}
      <div className="mt-6 flex items-center justify-between">
        {PROCESSING_STEPS.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                index < currentStepIndex
                  ? "border-[#183EC2] bg-[#183EC2]"
                  : index === currentStepIndex
                    ? "border-[#183EC2] bg-white"
                    : "border-[#F1F1F1] bg-white"
              }`}
            >
              {index < currentStepIndex ? (
                <CheckCircle2 className="h-4 w-4 text-white" />
              ) : (
                <span
                  className={`text-xs font-semibold ${
                    index === currentStepIndex
                      ? "text-[#183EC2]"
                      : "text-[#010D3E]/40"
                  }`}
                >
                  {index + 1}
                </span>
              )}
            </div>

            <span
              className={`hidden text-xs md:block ${
                index <= currentStepIndex
                  ? "font-medium text-[#010D3E]"
                  : "text-[#010D3E]/40"
              }`}
            >
              {step.label.split(" ")[0]}
            </span>
          </div>
        ))}
      </div>

      {/* Tip */}
      <div className="mt-6 rounded-lg border border-[#183EC2]/20 bg-gradient-to-br from-[#EAEEFE]/50 to-[#EAEEFE]/30 p-4">
        <p className="text-sm text-[#010D3E]/70">
          💡 <span className="font-semibold">Tip:</span> Click refresh to check
          the latest status or view completed clips in the “My Clips” tab.
        </p>
      </div>
    </motion.div>
  );
}
