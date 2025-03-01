import loading1 from "@/assets/lotties/logo.json";
import { cn } from "@/utils/common";
import { LottieComponentProps } from "lottie-react";
import dynamic from "next/dynamic";
import React, { HTMLAttributes } from "react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
interface ILottieLoading extends HTMLAttributes<HTMLDivElement> {
  lottieProps?: LottieComponentProps;
  animationClassName?: string;
}
const LottieLoading: React.FC<ILottieLoading> = ({
  lottieProps,
  animationClassName = "w-[300px] h-[300px]",
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center rounded-lg bg-white",
        props.className
      )}
    >
      <Lottie
        className={cn("", animationClassName)}
        loop={lottieProps?.loop || true}
        style={{ ...lottieProps?.style }}
        {...lottieProps}
        animationData={lottieProps?.animationData || loading1}
      />
    </div>
  );
};

export default LottieLoading;
