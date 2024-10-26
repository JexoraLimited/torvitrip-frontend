import { getRatingColor } from "@/utils/common";
import { FC } from "react";
import { IoIosStar } from "react-icons/io";

interface IRating {
  value: number;
}

const Rating: FC<IRating> = ({ value }) => {
  return (
    <span
      style={{
        display: "inline-flex",
        background: getRatingColor(value),
        color: "#fff",
        fontWeight: "400",
        fontSize: "12px",
        borderRadius: "3px",
        padding: "2px 5px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span className="mr-1">{value?.toFixed(1)}</span> <IoIosStar />
    </span>
  );
};

export default Rating;
