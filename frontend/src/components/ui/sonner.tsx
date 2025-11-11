"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      toastOptions={{
        style: {
          background: "white",
          color: "#010D3E",
          border: "1px solid #F1F1F1",
          borderRadius: "12px",
          padding: "16px",
          fontSize: "15px",
          boxShadow: "0 10px 40px rgba(24, 62, 194, 0.15)",
        },
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-[#010D3E] group-[.toaster]:border-[#F1F1F1] group-[.toaster]:shadow-lg",
          description:
            "group-[.toast]:text-[#010D3E]/70 group-[.toast]:text-sm",
          actionButton: "group-[.toast]:bg-[#183EC2] group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-[#EAEEFE] group-[.toast]:text-[#010D3E]",
          success: "group-[.toast]:border-[#183EC2]/20",
          error: "group-[.toast]:border-red-200",
        },
      }}
      richColors
      {...props}
    />
  );
};

export { Toaster };
