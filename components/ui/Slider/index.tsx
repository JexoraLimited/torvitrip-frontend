"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "@/utils/common";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root> & {
    showValues?: boolean;
    valuePrefix?: string;
  },
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    showValues?: boolean;
    valuePrefix?: string;
  }
>(
  (
    {
      className,
      value,
      defaultValue,
      onValueChange,
      showValues,
      valuePrefix,
      ...props
    },
    ref
  ) => {
    const thumbCount = value || defaultValue;

    const [thumbValues, setThumbValues] = React.useState(thumbCount);

    React.useEffect(() => {
      setThumbValues(thumbCount);
    }, [value, defaultValue]);

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(value) => {
          setThumbValues(value);
          if (onValueChange) onValueChange(value);
        }}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/40">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {thumbCount?.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="ring-offset-background focus-visible:ring-ring relative block h-5 w-5 rounded-full border-2 border-primary bg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {showValues && (
              <div className=" mt-5 whitespace-nowrap text-center font-inter text-xs font-semibold text-neutral-600">
                {thumbValues && `${valuePrefix || ""}${thumbValues[i]}`}
              </div>
            )}
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Root>
    );
  }
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
