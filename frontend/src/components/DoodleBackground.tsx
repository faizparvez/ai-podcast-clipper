"use client";
import React, { useEffect, useState } from "react";
import {
  Mic,
  Radio,
  Headphones,
  Volume2,
  Play,
  Music,
  Video,
  Share2,
  Scissors,
  FileAudio,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface IconConfig {
  Component: LucideIcon;
  size: number;
  className: string;
}

interface DoodlePosition {
  top: string;
  left: string;
  rotation: number;
  scale: number;
  elementIndex: number;
}

export default function DoodleBackground() {
  const [positions, setPositions] = useState<DoodlePosition[]>([]);

  // Array of podcast and audio-related Lucide icon components
  const doodleElements: IconConfig[] = [
    { Component: Mic, size: 40, className: "text-[#183EC2] opacity-[0.08]" },
    { Component: Radio, size: 38, className: "text-[#001E80] opacity-[0.08]" },
    {
      Component: Headphones,
      size: 42,
      className: "text-[#183EC2] opacity-[0.08]",
    },
    {
      Component: Volume2,
      size: 38,
      className: "text-[#001E80] opacity-[0.08]",
    },
    { Component: Play, size: 40, className: "text-[#183EC2] opacity-[0.08]" },
    { Component: Music, size: 36, className: "text-[#001E80] opacity-[0.08]" },
    { Component: Video, size: 38, className: "text-[#183EC2] opacity-[0.08]" },
    { Component: Share2, size: 36, className: "text-[#001E80] opacity-[0.08]" },
    {
      Component: Scissors,
      size: 38,
      className: "text-[#183EC2] opacity-[0.08]",
    },
    {
      Component: FileAudio,
      size: 40,
      className: "text-[#001E80] opacity-[0.08]",
    },
  ];

  // Generate positions only on client side to avoid hydration mismatch
  useEffect(() => {
    const generatePositions = (count: number): DoodlePosition[] => {
      const newPositions: DoodlePosition[] = [];
      for (let i = 0; i < count; i++) {
        newPositions.push({
          top: `${Math.random() * 95 + 2}%`,
          left: `${Math.random() * 95 + 2}%`,
          rotation: Math.floor(Math.random() * 30 - 15),
          scale: 0.8 + Math.random() * 0.4,
          elementIndex: Math.floor(Math.random() * doodleElements.length),
        });
      }
      return newPositions;
    };

    // Only 6 elements for a cleaner, less cluttered look
    setPositions(generatePositions(6));
  }, []);

  // Don't render anything until positions are set (client-side only)
  if (positions.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden">
      {positions.map((position, index) => {
        const iconConfig = doodleElements[position.elementIndex];

        // Type guard to ensure iconConfig exists
        if (!iconConfig) return null;

        const IconComponent = iconConfig.Component;

        return (
          <div
            key={`doodle-${index}`}
            className="absolute"
            style={{
              top: position.top,
              left: position.left,
              transform: `rotate(${position.rotation}deg) scale(${position.scale})`,
            }}
          >
            <IconComponent
              size={iconConfig.size}
              className={iconConfig.className}
            />
          </div>
        );
      })}
    </div>
  );
}
