"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogOut, User, CreditCard } from "lucide-react";

export function DashboardHeader({
  credits,
  email,
}: {
  credits: number;
  email: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 backdrop-blur-sm">
      {/* Navbar */}
      <div className="py-3">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Brand Name */}
            <Link href="/" className="flex cursor-pointer items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#183EC2] to-[#001E80]">
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
              </div>
              <span className="bg-gradient-to-b from-[#000000] to-[#001E80] bg-clip-text text-xl font-bold text-transparent">
                ViralAI
              </span>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="absolute left-1/2 hidden -translate-x-1/2 transform items-center gap-8 md:flex">
              <Link
                href="/"
                className="font-medium text-[#000000] transition-colors duration-300 hover:text-[#183EC2]"
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="font-medium text-[#000000] transition-colors duration-300 hover:text-[#183EC2]"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/billing"
                className="font-medium text-[#000000] transition-colors duration-300 hover:text-[#183EC2]"
              >
                Pricing
              </Link>
            </nav>

            {/* Desktop Right Side */}
            <div className="hidden items-center gap-4 md:flex">
              {/* Credits Badge - UPDATED STYLING */}
              <div className="flex items-center gap-2 rounded-lg border border-[#F1F1F1] bg-gradient-to-br from-[#EAEEFE]/50 to-[#EAEEFE]/30 px-4 py-2 shadow-sm transition-all duration-300 hover:shadow-md">
                <svg
                  className="h-5 w-5 text-[#183EC2]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-semibold text-[#010D3E]">
                  {credits} credits
                </span>
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 rounded-lg border border-[#F1F1F1] bg-white px-3 py-2 transition-colors hover:bg-[#EAEEFE]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#183EC2] to-[#001E80]">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <svg
                    className="h-4 w-4 text-[#010D3E]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isProfileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsProfileOpen(false)}
                    />
                    <div className="absolute right-0 z-20 mt-2 w-56 rounded-lg border border-[#F1F1F1] bg-white shadow-lg">
                      <div className="border-b border-[#F1F1F1] p-3">
                        <p className="truncate text-sm font-medium text-[#010D3E]">
                          {email}
                        </p>
                        <p className="mt-1 text-xs text-[#010D3E]/60">
                          {credits} credits remaining
                        </p>
                      </div>
                      <div className="p-2">
                        <Link
                          href="/dashboard/billing"
                          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[#010D3E] transition-colors hover:bg-[#EAEEFE]"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <CreditCard className="h-4 w-4" />
                          Billing
                        </Link>
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
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
                <div className="rounded-lg border border-[#F1F1F1] bg-[#EAEEFE] px-4 py-3">
                  <p className="mb-1 text-sm font-medium text-[#010D3E]">
                    {email}
                  </p>
                  <p className="text-xs text-[#010D3E]/60">{credits} credits</p>
                </div>
                <Link
                  href="/dashboard"
                  className="py-2 text-center font-medium text-[#010D3E]/60 transition-colors hover:text-[#183EC2]"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/billing"
                  className="py-2 text-center font-medium text-[#010D3E]/60 transition-colors hover:text-[#183EC2]"
                >
                  Billing
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="btn btn-text text-red-600 hover:text-red-700"
                >
                  Sign out
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
