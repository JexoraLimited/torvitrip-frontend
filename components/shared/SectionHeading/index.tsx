import { cn } from "@/utils/common";
import React, { HTMLAttributes } from "react";

interface ISectionHeading extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  titleProps?: HTMLAttributes<HTMLHeadingElement>;
  descriptionProps?: HTMLAttributes<HTMLParagraphElement>;
}

const SectionHeading: React.FC<ISectionHeading> = ({
  description,
  title,
  titleProps,
  descriptionProps,
  ...props
}) => {
  return (
    <div {...props} className={cn("w-full h-full space-y-2", props.className)}>
      <h3
        {...titleProps}
        className={cn(
          "text-2xl md:text-4xl font-bold md:text-center text-left",
          titleProps?.className
        )}
      >
        {title}
      </h3>
      <p
        {...descriptionProps}
        className={cn(
          "text-gray-black text-sm md:text-base text-left md:text-center w-full md:w-1/2 mx-auto",
          descriptionProps?.className
        )}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default SectionHeading;
