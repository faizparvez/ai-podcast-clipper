"use client";

import type { Clip } from "@prisma/client";
import { Download, Loader2, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { getClipPlayUrl } from "~/actions/generation";
import { Button } from "./ui/button";

function ClipCard({ clip }: { clip: Clip }) {
  const [playUrl, setPlayUrl] = useState<string | null>(null);
  const [isLoadingUrl, setIsLoadingUrl] = useState(true);

  useEffect(() => {
    async function fetchPlayUrl() {
      try {
        const result = await getClipPlayUrl(clip.id);
        if (result.success && result.url) {
          setPlayUrl(result.url);
        } else if (result.error) {
          console.error("Failed to get play url: " + result.error);
        }
      } catch (error) {
        console.error("Failed to get play url");
      } finally {
        setIsLoadingUrl(false);
      }
    }

    void fetchPlayUrl();
  }, [clip.id]);

  const handleDownload = () => {
    if (playUrl) {
      const link = document.createElement("a");
      link.href = playUrl;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#F1F1F1] bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
      {/* Video Container */}
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg bg-[#EAEEFE]">
        {isLoadingUrl ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-[#183EC2] to-[#001E80] opacity-30 blur-xl"></div>
              <Loader2 className="relative h-10 w-10 animate-spin text-[#183EC2]" />
            </div>
          </div>
        ) : playUrl ? (
          <video
            src={playUrl}
            controls
            preload="metadata"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            <div className="rounded-full bg-[#183EC2]/10 p-4">
              <Play className="h-8 w-8 text-[#183EC2]/50" />
            </div>
            <p className="text-sm font-medium text-[#010D3E]/40">
              Video unavailable
            </p>
          </div>
        )}
      </div>

      {/* Download Button */}
      <Button
        onClick={handleDownload}
        disabled={!playUrl}
        variant="outline"
        size="sm"
        className="w-full border-[#F1F1F1] bg-white font-semibold text-[#010D3E] hover:border-[#183EC2]/30 hover:bg-[#EAEEFE] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
    </div>
  );
}

export { ClipCard };
