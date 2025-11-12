"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface WorkflowStep {
  title: string;
  description: string;
  features: string[];
  imagePlaceholder: string;
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
      imagePlaceholder: "/screenshots/upload-step.png",
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
      imagePlaceholder: "/screenshots/ai-analysis-step.png",
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
      imagePlaceholder: "/screenshots/clips-ready-step.png",
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
      className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 overflow-hidden ${
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

      {/* Image Side - Professional SaaS Style */}
      {/* Image Side - Professional SaaS Style */}
<motion.div
  className={isReversed ? "lg:col-start-1" : ""}
  variants={imageVariants}
  initial="hidden"
  animate={isInView ? "visible" : "hidden"}
>
  {/* Outer container with white background and border */}
  <div className="relative w-full overflow-hidden rounded-2xl border-10 border-[#183EC2] bg-white shadow-[0_8px_30px_rgba(24,62,194,0.12)]">
    
    {/* Inner image container - fills available space */}
    <div className="relative w-full h-[400px] md:h-[450px] lg:h-[500px]">
      <Image
        src={step.imagePlaceholder}
        alt={step.title}
        fill
        className="rounded-lg object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        quality={95}
        priority={index === 0}
      />
    </div>
    
    {/* Subtle inner shadow for depth */}
    <div className="pointer-events-none absolute inset-4 rounded-lg ring-1 ring-inset ring-black/5"></div>
  </div>
</motion.div>
    </div>
  );
}