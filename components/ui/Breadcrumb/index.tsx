import Link from "next/link";
import React from "react";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import { mergeClassNames } from "../../../utils/common";

export interface IBreadCrumb {
  separator?: string | React.ReactNode;
  items: {
    icon?: string | React.ReactNode;
    label: string;
    link: string;
  }[];
  lastActive?: boolean;
  separatorClassName?: string;
  separatorStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  itemClassName?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const defaultBreadCrumbItems: IBreadCrumb["items"] = [
  { icon: <AiOutlineHome />, label: "Home", link: "/" },
];
export const defaultSeparator: IBreadCrumb["separator"] = <AiOutlineRight />;
const Breadcrumb: React.FC<IBreadCrumb> = ({
  items = defaultBreadCrumbItems,
  lastActive = true,
  separator = defaultSeparator,
  itemClassName,
  itemStyle,
  separatorClassName,
  separatorStyle,
  className,
  style,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <div
        className={mergeClassNames(
          "inline-flex items-center justify-center rounded-lg gap-2 px-3 py-2 bg-[#f5f5f5]",
          className || ""
        )}
        style={style}
      >
        {items.map((item, index) => {
          return (
            <div
              key={index}
              className={mergeClassNames(
                "flex items-center justify-center gap-2 md:gap-3"
              )}
              style={itemStyle}
            >
              <Link
                href={item.link}
                className={mergeClassNames(
                  "flex text-[12px] whitespace-nowrap md:text-[16px] items-center gap-1 md:gap-2",
                  index + 1 === items.length && lastActive
                    ? "text-black"
                    : "text-[#797979]",
                  itemClassName || ""
                )}
              >
                {item.icon}
                {item.label}
              </Link>
              <span
                className={mergeClassNames(
                  "text-[#797979]",
                  separatorClassName || ""
                )}
                style={separatorStyle}
              >
                {index + 1 < items.length && separator}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;
