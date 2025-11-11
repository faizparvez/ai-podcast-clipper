import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-[#183EC2]/20"></div>
        <Loader2 className="absolute inset-0 h-16 w-16 animate-spin text-[#183EC2]" />
      </div>
      <div className="text-center">
        <p className="text-lg font-medium text-[#010D3E]">
          Loading dashboard...
        </p>
        <p className="text-sm text-[#010D3E]/60">Please wait a moment</p>
      </div>
    </div>
  );
}
