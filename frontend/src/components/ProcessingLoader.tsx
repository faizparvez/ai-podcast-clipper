"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface ProcessingStep {
  id: string;
  label: string;
  duration: number; // in seconds
  description: string;
}

const PROCESSING_STEPS: ProcessingStep[] = [
  {
    id: "warming-up",
    label: "Warming up AI model",
    duration: 40,
    description: "Initializing serverless GPU and loading neural networks",
  },
  {
    id: "checking-credits",
    label: "Checking credits",
    duration: 3,
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
    duration: 45,
    description: "Creating clips and optimizing for social media",
  },
  {
    id: "finalizing",
    label: "Finalizing",
    duration: 12,
    description: "Saving clips and updating your dashboard",
  },
];

interface ProcessingLoaderProps {
  fileId: string;
  filename: string;
  status: string; // Accept any string
  onComplete?: () => void;
}

export function ProcessingLoader({
  fileId,
  filename,
  status,
  onComplete,
}: ProcessingLoaderProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentStep = PROCESSING_STEPS[currentStepIndex];
  const totalDuration = PROCESSING_STEPS.reduce(
    (sum, step) => sum + step.duration,
    0,
  );

  useEffect(() => {
    if (status === "processed") {
      setProgress(100);
      setIsComplete(true);
      setTimeout(() => onComplete?.(), 1500);
      return;
    }

    if (status === "failed" || status === "no credits") {
      setIsComplete(true);
      return;
    }

    if (status !== "processing" && status !== "queued") return;
    const interval = setInterval(() => {
      setElapsedTime((prev) => {
        const newTime = prev + 0.1;

        // Calculate which step we should be on
        let accumulatedTime = 0;
        let stepIndex = 0;

        for (let i = 0; i < PROCESSING_STEPS.length; i++) {
          if (
            newTime >= accumulatedTime &&
            newTime < accumulatedTime + PROCESSING_STEPS[i]!.duration
          ) {
            stepIndex = i;
            break;
          }
          accumulatedTime += PROCESSING_STEPS[i]!.duration;
        }

        setCurrentStepIndex(stepIndex);

        // Calculate progress with realistic fluctuations
        const baseProgress = (newTime / totalDuration) * 100;
        const fluctuation = Math.sin(newTime * 0.5) * 2; // Adds ±2% fluctuation
        const newProgress = Math.min(97, baseProgress + fluctuation);

        setProgress(newProgress);

        return newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [status, totalDuration, onComplete]);

  // Show success state
  if (status === "processed" && isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-[#F1F1F1] bg-gradient-to-br from-[#183EC2]/5 to-[#001E80]/5 p-6"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#183EC2] to-[#001E80]">
            <CheckCircle2 className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-[#010D3E]">
              Processing Complete!
            </h4>
            <p className="mt-1 text-sm text-[#010D3E]/70">{filename}</p>
            <p className="mt-2 text-sm font-medium text-[#183EC2]">
              Your clips are ready! Check the &quot;My Clips&quot; tab to view
              them.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Show error state
  if ((status === "failed" || status === "no credits") && isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-red-200 bg-red-50 p-6"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-red-900">
              {status === "no credits"
                ? "Insufficient Credits"
                : "Processing Failed"}
            </h4>
            <p className="mt-1 text-sm text-red-700">{filename}</p>
            <p className="mt-2 text-sm text-red-700">
              {status === "no credits"
                ? "Please purchase more credits to process this video."
                : "Something went wrong. Please try uploading again."}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Show loading state
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-[#F1F1F1] bg-white p-6 shadow-sm"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-[#010D3E]">{filename}</h4>
          <p className="mt-1 text-xs text-[#010D3E]/60">
            Processing video... This may take 3-5 minutes
          </p>
        </div>
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
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
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
            transition={{ duration: 0.3 }}
            className="flex items-start gap-3"
          >
            <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#183EC2]/10 to-[#001E80]/5">
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

      {/* Steps Progress */}
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
          💡 <span className="font-semibold">Tip:</span> Click the refresh
          button above to check the latest status, or switch to the &quot;My
          Clips&quot; tab to see completed clips.
        </p>
      </div>
    </motion.div>
  );
}
