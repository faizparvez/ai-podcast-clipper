import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#183EC2] text-white hover:bg-[#001E80] focus-visible:ring-2 focus-visible:ring-[#183EC2]/50",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-600/50",
        outline:
          "border border-[#F1F1F1] bg-white text-[#010D3E] hover:bg-[#EAEEFE] focus-visible:ring-2 focus-visible:ring-[#183EC2]/50",
        secondary: "bg-[#EAEEFE] text-[#010D3E] hover:bg-[#183EC2]/10",
        ghost: "hover:bg-[#EAEEFE] text-[#010D3E]",
        link: "text-[#183EC2] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-12 rounded-lg px-6",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
