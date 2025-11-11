export function ClipCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-3 rounded-xl border border-[#F1F1F1] bg-white p-3 shadow-sm">
      {/* Video Skeleton */}
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg bg-gradient-to-br from-[#EAEEFE] to-[#EAEEFE]/50">
        <div
          className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          style={{
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite",
          }}
        />
      </div>

      {/* Button Skeleton */}
      <div className="h-9 w-full rounded-lg bg-[#EAEEFE]">
        <div
          className="animate-shimmer h-full w-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
          style={{
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite",
          }}
        />
      </div>
    </div>
  );
}
