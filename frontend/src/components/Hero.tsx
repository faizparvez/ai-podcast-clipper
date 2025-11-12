"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export const Hero = () => {
  const sectionRef = useRef(null);
  const highlightTextRef = useRef(null);
  const [underlineWidth, setUnderlineWidth] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  // Calculate the width of the highlighted text for animation
  useEffect(() => {
    if (highlightTextRef.current) {
      setUnderlineWidth((highlightTextRef.current as HTMLElement).offsetWidth);
    }

    // Handle window resize
    const handleResize = () => {
      if (highlightTextRef.current) {
        setUnderlineWidth(
          (highlightTextRef.current as HTMLElement).offsetWidth,
        );
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation variants for the underline
  const underlineVariants: Variants = {
    hidden: { width: 0 },
    visible: {
      width: underlineWidth,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  // Flickering dot animation variants
  const flickerVariants: Variants = {
    initial: { opacity: 0.3 },
    animate: {
      opacity: [0.3, 1, 0.3, 1, 0.5, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  // Product image animation variants (rising effect)
  const productImageVariants: Variants = {
    initial: {
      y: 100,
      rotateX: 45,
      scale: 0.9,
      opacity: 0.6,
      transformPerspective: 1000,
    },
    animate: {
      y: 0,
      rotateX: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 35,
        delay: 0.6,
        duration: 5,
      },
    },
  };

  // Shadow animation variants
  const shadowVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.7,
    },
    animate: {
      opacity: 0.2,
      scale: 1,
      transition: {
        delay: 0.6,
        duration: 1.2,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="-mt-20 overflow-x-clip pt-40 pb-24 md:pt-44 md:pb-15"
      style={{
        background:
          "radial-gradient(ellipse 200% 100% at bottom left, #183EC2, #EAEEFE 100%)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-heading">
          <div className="flex justify-center">
            <div className="tag flex items-center">
              {/* Flickering dot */}
              <motion.div
                className="mr-2 h-2 w-2 rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, #DD7DDF, #E1CD86, #BBCB92, #71C2EF, #3BFFFF)",
                  backgroundSize: "200% 200%",
                }}
                variants={flickerVariants}
                initial="initial"
                animate="animate"
              />
              AI-Powered Podcast Clipping
            </div>
          </div>

          {/* Main Heading */}
          <h2
            className="section-title mt-5 overflow-visible pb-4"
            style={{ lineHeight: "1.2" }}
          >
            Transform Podcasts into
            <br />
            Viral{" "}
            <span className="relative inline-block bg-gradient-to-b from-[#000000] to-[#001E80] bg-clip-text text-transparent">
              <span ref={highlightTextRef}>Clips Instantly</span>
              <motion.span
                className="absolute bottom-0 left-0 h-1 rounded-full bg-[#183EC2]"
                initial="hidden"
                animate="visible"
                variants={underlineVariants}
              />
            </span>{" "}
            with AI
          </h2>

          <p className="section-description mt-5">
            Let AI find the best moments from your podcasts. Upload once, get
            dozens of share-ready clips optimized for TikTok, Instagram Reels,
            and YouTube Shorts. Save hours of editing time.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Start Clipping button with arrow that moves on hover */}
            <Link
              href="/signup"
              className="btn btn-primary group relative w-full overflow-hidden sm:w-auto"
            >
              <span className="inline-flex items-center">
                Start Clipping Free
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </Link>

            {/* See Examples button with play icon */}
            <Link
              href="#examples"
              className="btn btn-text group relative w-full overflow-hidden sm:w-auto"
            >
              <span className="inline-flex items-center">
                See Examples
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
        <div className="relative mt-16">
          {/* Shadow under the product image */}
          <motion.div
            className="absolute top-6 left-1/2 h-6 w-4/5 -translate-x-1/2 transform rounded-full bg-black blur-md"
            variants={shadowVariants}
            initial="initial"
            animate="animate"
          />

          {/* Animated Product Image */}
          <motion.div
            className="relative z-10"
            variants={productImageVariants}
            initial="initial"
            animate="animate"
          >
            <div className="w-full overflow-hidden rounded-2xl border border-[#F1F1F1] bg-white shadow-[0_20px_60px_rgba(24,62,194,0.15)]">
              {/* Browser Chrome */}
              <div className="bg-gradient-to-br from-[#183EC2] to-[#001E80] px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-white/30"></div>
                  <div className="h-3 w-3 rounded-full bg-white/30"></div>
                  <div className="h-3 w-3 rounded-full bg-white/30"></div>
                </div>
              </div>

              {/* Dashboard Content - Adjusted aspect ratio for your clips gallery */}
              <div className="relative w-full" style={{ aspectRatio: '16/11' }}>
                <Image
                  src="/screenshots/dashboard-hero.png"
                  alt="ClipMind Dashboard"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />

                {/* Fallback placeholder - Shows if image is not found */}
                {/* <div className="absolute inset-0 flex items-center justify-center bg-[#EAEEFE] p-8">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-24 w-24 text-[#183EC2]/30"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="mt-4 font-medium text-[#010D3E]/60">
                      ClipMind Dashboard Preview
                    </p>
                    <p className="mt-2 text-sm text-[#010D3E]/40">
                      Replace with: /screenshots/dashboard-hero.png
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};