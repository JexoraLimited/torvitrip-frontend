import Colors from "@/constants/Colors";
import React, { HTMLAttributes } from "react";
interface ITitleBorder {
  style?: React.CSSProperties;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

const TitleBorder: React.FC<ITitleBorder> = ({ style, className }) => {
  return (
    <div
      style={{
        width: "50px",
        height: "3px",
        background: Colors.secondary,
        ...style,
      }}
      className={className}
    ></div>
  );
};

export default TitleBorder;
