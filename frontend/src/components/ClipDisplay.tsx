"use client";

import type { Clip } from "@prisma/client";
import { ClipCard } from "./ClipCard";
import { ClipCardSkeleton } from "./ClipCardSkeleton";

export function ClipDisplay({
  clips,
  isLoading = false,
}: {
  clips: Clip[];
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ClipCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (clips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-4 rounded-full bg-[#EAEEFE] p-6">
          <svg
            className="h-12 w-12 text-[#183EC2]/30"
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
        </div>
        <p className="mb-2 text-lg font-semibold text-[#010D3E]">
          No clips generated yet
        </p>
        <p className="max-w-md text-sm text-[#010D3E]/60">
          Upload a podcast to start generating viral clips automatically
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {clips.map((clip) => (
        <ClipCard key={clip.id} clip={clip} />
      ))}
    </div>
  );
}
