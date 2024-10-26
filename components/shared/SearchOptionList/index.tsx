import { cn } from "@/utils/common";
import React, { HTMLAttributes, useCallback, useEffect, useState } from "react";
export interface ISearchOption {
  title: string;
  descriptions: string[];
  subtitle: string;
  id: string;
}
interface ISearchOptionList extends HTMLAttributes<HTMLDivElement> {
  options: ISearchOption[];
  optionClassName?: HTMLAttributes<HTMLDivElement>["className"];
  selected?: ISearchOption;
  onSelectChange?: (selected: ISearchOption) => void;
  leftClassName?: HTMLAttributes<HTMLDivElement>["className"];
  dividerClassName?: HTMLAttributes<HTMLDivElement>["className"];
  rightClassName?: HTMLAttributes<HTMLDivElement>["className"];
  selectedId: string;
}

const SearchOptionList: React.FC<ISearchOptionList> = ({
  options,
  optionClassName,
  onSelectChange,
  selectedId,
  ...props
}) => {
  const [selected, setSelected] = useState(selectedId);
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const onKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        hoveredIndex < options.length && setHoveredIndex(hoveredIndex + 1);
      }
      if (e.key === "ArrowUp") {
        hoveredIndex > 0 && setHoveredIndex(hoveredIndex - 1);
      }
      if (e.key === "Enter") {
        const currentOption = options[hoveredIndex];
        setSelected(currentOption.id);
        onSelectChange && onSelectChange(currentOption);
      }
    },
    [hoveredIndex, options, onSelectChange]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      onKeyUp(e);
    },
    [onKeyUp]
  );

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);
  return (
    <div
      {...props}
      className={cn(
        "overflow-y-auto bg-white shadow-1 grayScrollBar",
        props.className
      )}
    >
      {options &&
        options.map((option, i) => (
          <div
            onMouseEnter={() => {
              setHoveredIndex(i);
            }}
            onClick={() => {
              onSelectChange && onSelectChange(option);
            }}
            className={cn(
              "flex group duration-200 cursor-pointer items-center justify-center py-[9px] px-3 gap-2",
              hoveredIndex === i && "bg-secondary/10",
              selected === option.id && "bg-primary/10",
              optionClassName
            )}
            style={{ borderBottom: "1px solid #E2E8F0" }}
            key={i}
          >
            <div
              className={cn(
                "w-[30%] flex items-center justify-center",
                props.leftClassName
              )}
            >
              <h4
                className={cn(
                  "whitespace-nowrap overflow-hidden text-ellipsis text-[16px] font-bold leading-[18px] text-[#1A2B3D]",
                  selected === option.id && "text-primary",
                  hoveredIndex === i && "text-primary"
                )}
              >
                {option.title}
              </h4>
            </div>
            <div
              className={cn(
                "w-[1px] h-[30px] bg-[#E2E8F0]",
                props.dividerClassName
              )}
            ></div>
            <div className={cn("min-w-[70%] w-full", props.rightClassName)}>
              <h5 className="whitespace-nowrap overflow-hidden text-ellipsis text-[14px] font-semibold leading-[18px] text-[#1A2B3D]">
                {option.subtitle}
              </h5>
              <p className="whitespace-nowrap overflow-hidden text-ellipsis text-[12px] font-[400] leading-[16px] text-[#1A2B3D]">
                {option.descriptions.join(", ")}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SearchOptionList;
