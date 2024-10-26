import React from "react";

const HR = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "2px",
        background: "lightgray",
        margin: "0 auto",
        ...style,
      }}
    ></div>
  );
};

export default HR;
