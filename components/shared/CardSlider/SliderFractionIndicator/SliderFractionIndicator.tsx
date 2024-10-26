import React from "react";

const SliderFractionIndicator = ({
  activeSlideNumber,
  totalSlides,
  style,
  classNameType = 1,
  className,
}: {
  activeSlideNumber: number;
  totalSlides: number;
  style?: React.CSSProperties;
  classNameType?: 1 | 0;
  className?: string;
  //   1 is append and 0 is replace
}) => {
  return (
    <div
      className={
        !classNameType
          ? className
          : `h-[25px] w-[30px] rounded flex items-center justify-center z-[1000] ${className}`
      }
      style={{ color: "white", background: "rgba(0, 0, 0, 0.3)", ...style }}
    >
      <p>
        {activeSlideNumber}/{totalSlides}
      </p>
    </div>
  );
};

export default SliderFractionIndicator;
