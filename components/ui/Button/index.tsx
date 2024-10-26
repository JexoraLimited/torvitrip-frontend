import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { nunitoSans } from "@/fonts/google";
import { cn } from "@/utils/common";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none font-nunito-sans disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        primaryLight:
          "bg-primary/10 text-primary hover:text-white hover:bg-primary",
        neutral: "bg-slate-200 text-black hover:bg-slate-200/90",
        destructive: "bg-red-500 text-white hover:bg-red-500/90",
        outline: "border-2 border-black hover:bg-black hover:text-white",
        outlineLight:
          "border-2 border-white text-white hover:bg-white hover:text-black",
        outlineSecondary:
          "border-2 border-secondary text-secondary hover:bg-secondary hover:text-white",
        outlinePrimary:
          "border-2 border-primary text-primary hover:bg-primary hover:text-white",
        secondary: "bg-secondary text-white",
        secondaryLight:
          "bg-secondary/10 text-secondary hover:text-white hover:bg-secondary",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        primaryText: "bg-transparent text-primary",
        secondaryText: "bg-transparent text-secondary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[38px] md:h-[42px] px-8 text-lg",
        lg: "h-14 px-10 text-lg",
        md: "h-[34px] text-base md:h-[36px] px-6 text-base",
        sm: "h-[30px] px-4 text-sm font-medium",
        xs: "h-6 px-3 text-xs font-medium",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          nunitoSans.className
        )}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin mx-auto" />
        ) : (
          props.children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
