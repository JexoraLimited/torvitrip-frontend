import { cn } from "@/utils/common";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
  className?: string;
}

const H1: React.FC<Props> = ({ children, className }) => {
  return (
    <h1 className={`text-[34px] font-bold text-primary-heading ${className}`}>
      {children}
    </h1>
  );
};

const H2: React.FC<Props> = ({ children, className }) => {
  return (
    <h2
      className={`text-2xl font-bold text-slate-900 md:text-[28px] ${className}`}
    >
      {children}
    </h2>
  );
};

const H3: React.FC<Props> = ({ children, className }) => {
  return (
    <h3 className={`text-xl font-bold text-slate-900 md:text-2xl ${className}`}>
      {children}
    </h3>
  );
};

const H4: React.FC<Props> = ({ children, className }) => {
  return (
    <h4
      className={`text-xl font-bold text-slate-900 md:text-[22px] ${className}`}
    >
      {children}
    </h4>
  );
};

const H5: React.FC<Props> = ({ children, className }) => {
  return (
    <h5 className={`text-[18px] font-bold text-primary-heading ${className}`}>
      {children}
    </h5>
  );
};

const H6: React.FC<Props> = ({ children, className }) => {
  return (
    <h6 className={`text-[15px] font-bold text-primary-heading ${className}`}>
      {children}
    </h6>
  );
};

const Heading: React.FC<Props> = ({ children, className }) => (
  <h2
    className={`text-2xl font-bold leading-[140%] text-primary-heading md:text-[40px] ${className}`}
  >
    {children}
  </h2>
);
const Subheading: React.FC<Props> = ({ children, className }) => (
  <h3
    className={cn(
      "text-sm font-normal leading-[180%] text-secondary-heading md:text-[15px]",
      className
    )}
  >
    {children}
  </h3>
);
const ParaGraph: React.FC<Props> = ({ children, className, ...props }) => (
  <p
    className={cn(
      `font-inter text-sm font-normal leading-[180%] text-zinc-500 md:text-[15px]`,
      className
    )}
    {...props}
  >
    {children}
  </p>
);

export { H1, H2, H3, H4, H5, H6, Heading, ParaGraph, Subheading };
