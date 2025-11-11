"use client";
import Link from "next/link";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 backdrop-blur-sm">
      {/* Navbar */}
      <div className="py-5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Brand Name */}
            <Link href="/" className="flex cursor-pointer items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#183EC2] to-[#001E80]">
                {/* <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#183EC2] to-[#001E80]"> */}
                <svg
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="vGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#ffffff", stopOpacity: 1 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#E0E7FF", stopOpacity: 1 }}
                      />
                    </linearGradient>
                  </defs>

                  {/* Background Diamond Shape (more visible) */}
                  {/* <path
                    d="M12 2 L19 12 L12 22 L5 12 Z"
                    fill="url(#vGradient)"
                    opacity="0.35"
                  /> */}

                  {/* Complete A shape behind (with apex at top) */}
                  <path
                    d="M6 22 L12 4 L18 22"
                    stroke="url(#vGradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.5"
                  />

                  {/* Horizontal bar of A (crossbar) */}
                  <path
                    d="M8.5 15 L15.5 15"
                    stroke="url(#vGradient)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.6"
                  />

                  {/* V Shape on top (main focus) */}
                  <path
                    d="M4 8 L12 22 L20 8"
                    stroke="url(#vGradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {/* </div> */}
              </div>
              <span className="bg-gradient-to-b from-[#000000] to-[#001E80] bg-clip-text text-xl font-bold text-transparent">
                ViralAi
              </span>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="absolute left-1/2 hidden -translate-x-1/2 transform items-center gap-8 md:flex">
              <a
                href="#features"
                className="font-medium text-[#000000] transition-colors duration-300 hover:text-[#183EC2]"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="font-medium text-[#000000] transition-colors duration-300 hover:text-[#183EC2]"
              >
                Workflow
              </a>
              <a
                href="#examples"
                className="font-medium text-[#000000] transition-colors duration-300 hover:text-[#183EC2]"
              >
                Examples
              </a>
            </nav>

            {/* Desktop CTA Buttons - Right Aligned */}
            <div className="hidden items-center gap-4 md:flex">
              <Link
                href="/login"
                className="btn btn-primary group relative overflow-hidden"
              >
                <span className="inline-flex items-center">
                  Log In
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
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
            </div>

            {/* Mobile Menu Button */}
            <button
              className="cursor-pointer md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="h-6 w-6 text-[#010D3E]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="mt-4 border-t border-[#F1F1F1] pb-4 md:hidden">
              <nav className="flex flex-col gap-4 pt-4">
                <a
                  href="#features"
                  className="py-2 text-center font-medium text-[#010D3E]/60 transition-colors duration-300 hover:text-[#183EC2]"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="py-2 text-center font-medium text-[#010D3E]/60 transition-colors duration-300 hover:text-[#183EC2]"
                >
                  How It Works
                </a>
                <a
                  href="#pricing"
                  className="py-2 text-center font-medium text-[#010D3E]/60 transition-colors duration-300 hover:text-[#183EC2]"
                >
                  Pricing
                </a>
                <a
                  href="#examples"
                  className="py-2 text-center font-medium text-[#010D3E]/60 transition-colors duration-300 hover:text-[#183EC2]"
                >
                  Examples
                </a>
                {/* <Link
                  href="/login"
                  className="py-2 text-center font-medium text-[#010D3E] transition-colors duration-300 hover:text-[#183EC2]"
                >
                  Log In
                </Link> */}
                <Link
                  href="/signup"
                  className="btn btn-primary group relative overflow-hidden"
                >
                  <span className="inline-flex items-center">
                    Get Started
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
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
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
