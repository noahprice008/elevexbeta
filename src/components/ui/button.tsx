import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-electric/25 bg-gradient-to-r from-primary/70 to-electric/60 text-primary-foreground shadow-[0_4px_18px_-10px_color-mix(in_oklab,var(--electric)_50%,transparent)] hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_10px_28px_-10px_color-mix(in_oklab,var(--electric)_65%,transparent)]",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-electric/30 bg-electric/5 text-electric hover:-translate-y-0.5 hover:bg-electric/10 hover:shadow-[0_8px_24px_-12px_color-mix(in_oklab,var(--electric)_55%,transparent)]",
        secondary:
          "border border-electric/20 bg-electric/8 text-foreground hover:bg-electric/15",
        ghost: "border border-transparent hover:bg-electric/8 hover:text-electric",
        link: "text-primary underline-offset-4 hover:underline",
      },

      size: {
        default: "h-10 px-5 py-2 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
