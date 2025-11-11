"use client";

import {
  Sparkles,
  Zap,
  Cloud,
  CreditCard,
  Download,
  Shield,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Features() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 md:py-20 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="section-heading mb-12 md:mb-16"
        >
          <div className="flex justify-center">
            <div className="tag">Features</div>
          </div>
          <h2 className="section-title mt-5">
            Everything You Need to Create Viral Clips
          </h2>
          <p className="section-description mt-5">
            Powerful AI-driven platform that transforms your long-form podcasts
            into shareable social media clips automatically, saving you hours of
            manual editing.
          </p>
        </motion.div>

        {/* Features Grid */}
        <FeaturesGrid isInView={isInView} />
      </div>

      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -right-32 h-64 w-64 rounded-full bg-[#183EC2]/5 blur-3xl md:h-96 md:w-96" />
        <div className="absolute bottom-0 -left-32 h-64 w-64 rounded-full bg-[#001E80]/5 blur-3xl md:h-96 md:w-96" />
      </div>
    </section>
  );
}

function FeaturesGrid({ isInView }: { isInView: boolean }) {
  const features = [
    {
      icon: <Sparkles className="h-5 w-5 text-[#183EC2]" />,
      title: "AI-Powered Clip Generation",
      description:
        "Our advanced AI analyzes your entire podcast and automatically identifies the most engaging, viral-worthy moments to create short clips ready for social media.",
      gradient: "from-[#183EC2]/10 to-[#001E80]/5",
      featured: true,
    },
    {
      icon: <Zap className="h-5 w-5 text-[#183EC2]" />,
      title: "Fast Processing Pipeline",
      description:
        "Upload your podcast and let our optimized processing system handle the rest. Get your clips generated in just 2-3 minutes with real-time status updates.",
      gradient: "from-[#001E80]/10 to-[#183EC2]/5",
    },
    {
      icon: <Cloud className="h-5 w-5 text-[#183EC2]" />,
      title: "Secure Cloud Storage",
      description:
        "All your videos and generated clips are securely stored in AWS S3 with enterprise-grade security. Access your content anytime, anywhere.",
      gradient: "from-[#183EC2]/10 to-[#001E80]/10",
    },
    {
      icon: <CreditCard className="h-5 w-5 text-[#183EC2]" />,
      title: "Flexible Credit System",
      description:
        "Pay only for what you use with our credit-based system. Integrated with Stripe for secure payments and easy credit top-ups whenever you need them.",
      gradient: "from-[#001E80]/10 to-[#183EC2]/5",
    },
    {
      icon: <Download className="h-5 w-5 text-[#183EC2]" />,
      title: "Instant Clip Downloads",
      description:
        "Once processing is complete, download all your generated clips instantly from your dashboard. Clips are ready to upload to any social media platform.",
      gradient: "from-[#183EC2]/5 to-[#001E80]/10",
    },
    {
      icon: <Shield className="h-5 w-5 text-[#183EC2]" />,
      title: "Real-Time Processing Status",
      description:
        "Never wonder what's happening. Track your video through every step of processing with our detailed progress tracker showing AI warmup, analysis, and clip generation.",
      gradient: "from-[#001E80]/5 to-[#183EC2]/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          {...feature}
          index={index}
          isInView={isInView}
        />
      ))}
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  featured?: boolean;
  index: number;
  isInView: boolean;
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
  featured = false,
  index,
  isInView,
}: FeatureCardProps) {
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="h-full"
    >
      <div
        className={`group relative h-full overflow-hidden rounded-2xl border border-[#F1F1F1] bg-gradient-to-br ${gradient} p-6 shadow-[0_7px_14px_#EAEAEA] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(24,62,194,0.15)] md:p-8 ${
          featured ? "lg:p-10" : ""
        }`}
      >
        {/* Hover Glow Effect */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-br from-[#183EC2]/10 via-transparent to-[#001E80]/10" />
        </div>

        {/* Content */}
        <div className="relative flex h-full flex-col gap-4">
          {/* Icon Container */}
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-[#183EC2]/20 bg-white shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-[#183EC2]/40 group-hover:shadow-md">
              {icon}
            </div>

            {featured && (
              <span className="animate-rainbow rounded-full bg-gradient-to-r from-[#DD7DDF] via-[#E1CD86] to-[#71C2EF] bg-[length:200%_100%] px-3 py-1 text-xs font-semibold whitespace-nowrap text-white">
                Popular
              </span>
            )}
          </div>

          {/* Text Content */}
          <div className="flex flex-1 flex-col gap-3">
            <h3 className="text-lg font-bold tracking-tight text-[#010D3E] md:text-xl lg:text-2xl">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-[#010D3E]/70 md:text-base">
              {description}
            </p>
          </div>

          {/* Bottom Accent Line */}
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#183EC2] to-[#001E80] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>
    </motion.div>
  );
}
