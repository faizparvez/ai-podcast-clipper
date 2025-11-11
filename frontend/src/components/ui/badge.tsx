import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-[3px] transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          // Primary blue badge, matches your .btn-primary style
          "border-transparent bg-[#183EC2] text-white hover:bg-[#001E80]",

        secondary:
          // Subtle light background like your .btn-text
          "border border-[#222222]/10 bg-white text-[#010D3E] hover:bg-[#EAEEFE]",

        destructive:
          // Keep this as-is; it’s already perfect
          "border-red-200 bg-red-50 text-red-700 hover:bg-red-100 focus-visible:ring-red-100 dark:border-red-800 dark:bg-red-950 dark:text-red-200",

        outline:
          // Neutral outline badge for general info
          "border border-[#222222]/10 text-[#010D3E] hover:bg-[#EAEEFE]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
