"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface WorkflowStep {
  title: string;
  description: string;
  features: string[];
  imagePlaceholder: string; // For easy image replacement
}

export function Workflow() {
  const workflowSteps: WorkflowStep[] = [
    {
      title: "Upload Your Podcast Video",
      description:
        "Simply drag and drop your MP4 file (up to 500MB) or try our demo podcast. Your video is securely uploaded to AWS S3 and queued for processing.",
      features: [
        "Supports MP4 files up to 500MB",
        "Drag & drop or click to browse",
        "Try demo podcast to see it in action",
      ],
      imagePlaceholder: "/screenshots/upload-step.png", // Replace with your actual screenshot
    },
    {
      title: "AI Analyzes Your Content",
      description:
        "Our AI model warms up (40 seconds) and analyzes your entire podcast to identify the most engaging, viral-worthy moments perfect for social media clips.",
      features: [
        "Advanced AI clip detection",
        "Identifies engaging segments",
        "Processes in 2-3 minutes",
      ],
      imagePlaceholder: "/screenshots/ai-analysis-step.png", // Replace with your actual screenshot
    },
    {
      title: "Track Processing in Real-Time",
      description:
        "Watch your video progress through every step with our detailed status tracker. See AI warmup, clip generation, and database storage happen in real-time.",
      features: [
        "7-step processing pipeline",
        "Real-time progress updates",
        "Estimated time remaining",
      ],
      imagePlaceholder: "/screenshots/processing-step.png", // Replace with your actual screenshot
    },
    {
      title: "Download Your Clips",
      description:
        "Once processing completes, all your AI-generated clips are ready in your dashboard. Download them instantly and share on any social media platform.",
      features: [
        "Instant clip downloads",
        "Secure cloud storage in S3",
        "View all clips in dashboard",
      ],
      imagePlaceholder: "/screenshots/clips-ready-step.png", // Replace with your actual screenshot
    },
  ];

  return (
    <section id="how-it-works" className="bg-[#EAEEFE] py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="section-heading mb-16">
          <div className="flex justify-center">
            <div className="tag">How It Works</div>
          </div>
          <h2 className="section-title mt-5">
            From Podcast to Viral Clips
            <br />
            in Minutes
          </h2>
          <p className="section-description mt-5">
            Our AI-powered workflow transforms your long-form podcasts into
            shareable social media clips automatically.
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="space-y-20">
          {workflowSteps.map((step, index) => (
            <WorkflowStep
              key={index}
              step={step}
              index={index}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface WorkflowStepProps {
  step: WorkflowStep;
  index: number;
  isReversed: boolean;
}

function WorkflowStep({ step, index, isReversed }: WorkflowStepProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contentVariants = {
    hidden: { opacity: 0, x: isReversed ? 50 : -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: isReversed ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" as const, delay: 0.2 },
    },
  };

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
        isReversed ? "lg:grid-flow-dense" : ""
      }`}
    >
      {/* Content Side */}
      <motion.div
        className={isReversed ? "lg:col-start-2" : ""}
        variants={contentVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#183EC2] to-[#001E80] text-lg font-bold text-white">
            {index + 1}
          </div>
          <h3 className="bg-gradient-to-b from-[#000000] to-[#001E80] bg-clip-text text-3xl font-bold text-transparent">
            {step.title}
          </h3>
        </div>
        <p className="mb-6 text-lg leading-relaxed text-[#010D3E]/80">
          {step.description}
        </p>
        <ul className="space-y-3">
          {step.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-6 w-6 flex-shrink-0 text-[#183EC2]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-[#010D3E]/70">{feature}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Image Side - EASY TO REPLACE */}
      <motion.div
        className={isReversed ? "lg:col-start-1" : ""}
        variants={imageVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#F1F1F1] bg-white shadow-[0_20px_60px_rgba(24,62,194,0.15)]">
          {/* 
            📸 REPLACE THIS IMAGE: 
            1. Take a screenshot of your actual feature
            2. Save it in /public/screenshots/ folder
            3. Update the src path in imagePlaceholder above
            
            Example paths:
            - /screenshots/upload-step.png
            - /screenshots/ai-analysis-step.png
            - /screenshots/processing-step.png
            - /screenshots/clips-ready-step.png
          */}
          <Image
            src={step.imagePlaceholder}
            alt={step.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index === 0}
          />

          {/* Fallback: Show placeholder if image not found */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#183EC2]/10 to-[#001E80]/10">
            <div className="p-8 text-center">
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#183EC2] to-[#001E80]">
                <svg
                  className="h-10 w-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-[#010D3E]/50">
                Replace with screenshot
              </p>
              <p className="mt-1 text-xs text-[#010D3E]/40">
                {step.imagePlaceholder}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
