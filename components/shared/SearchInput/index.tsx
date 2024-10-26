import { cn } from "@/utils/common";
import { motion } from "framer-motion";
import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import "react-day-picker/dist/style.css";
import { AiOutlineClose } from "react-icons/ai";
interface ISearchInput extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  inputType?: "search" | "date";
  open?: boolean;
  searchProps?: {
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    searchOptions?: {
      title: string;
      subtitle: string;
      description: string;
    }[];
    onClose?: (e: React.MouseEvent<HTMLDivElement>) => void;
  };
  parentClassName?: HTMLAttributes<HTMLDivElement>["className"];
  groupedInput?: { id: string; order: 0 | 1 };
  disabled?: boolean;
}
const SearchInput: React.FC<ISearchInput> = React.forwardRef<
  HTMLDivElement,
  ISearchInput
>(
  (
    {
      title,
      description,
      subtitle,
      badge,
      className,
      inputType,
      searchProps,
      parentClassName,
      groupedInput,
      open = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(
      searchProps?.value || subtitle
    );
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      let timeout: ReturnType<typeof setTimeout> | null = null;
      if (open) {
        inputRef?.current?.select();
        timeout = setTimeout(() => {
          inputRef?.current?.focus();
        }, 500);
      }
      return () => {
        timeout && clearTimeout(timeout);
      };
    }, [open]);
    return (
      <div
        aria-disabled={disabled}
        {...props}
        ref={ref}
        className={cn(
          "relative h-[80px]",
          parentClassName,
          disabled && "cursor-not-allowed"
        )}
      >
        <div
          style={{ border: "1px solid #E2E8F0" }}
          className={cn(
            "cursor-pointer w-full relative h-full rounded-[8px] overflow-hidden bg-[#F5F7FA] lg:bg-white font-nunito-sans",
            className
          )}
        >
          <motion.div
            transition={{ type: "keyframes", duration: 0.25 }}
            animate={{ y: inputType === "search" && open ? -80 : 0 }}
            className="flex relative flex-col gap-1 px-[16px] py-[8px]"
          >
            <div>
              <h3 className="text-center text-gray-600 font-extrabold text-sm">
                {title}
              </h3>
            </div>
            <div className="w-full h-[1px] bg-[#E2E8F0]"></div>
            <div>
              <h5 className="whitespace-nowrap text-left overflow-hidden text-ellipsis text-[14px] tracking-wide font-bold leading-[18px] text-gray-600">
                {subtitle}
              </h5>
              <p className="whitespace-nowrap md:max-w-[150px] xl:max-w-[180px] 2xl:max-w-[200px] w-[95%] overflow-hidden text-ellipsis text-left text-[12px] font-[400] leading-[16px] text-[#1A2B3D]">
                {description}
              </p>
            </div>
            {badge && <p className="absolute text-xs top-[1px]">{badge}</p>}
          </motion.div>
          {inputType === "search" && (
            <motion.div
              onClick={(e) => e.stopPropagation()}
              transition={{ type: "keyframes", duration: 0.25 }}
              animate={{ y: inputType === "search" && open ? -80 : 0 }}
              className="h-full flex items-center px-[16px] py-[12px] justify-center w-full relative"
            >
              <input
                ref={inputRef}
                value={inputValue}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  searchProps?.onChange && searchProps.onChange(e);
                }}
                type="text"
                placeholder={searchProps?.placeholder || "Search Here"}
                className="w-full h-full border-none outline-none text-[18px]"
              />
              <div
                onClick={(e) => {
                  setInputValue("");
                  searchProps?.onClose && searchProps.onClose(e);
                }}
                className="p-2 bg-slate-100 rounded-full"
              >
                <AiOutlineClose />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

// {
//   inputType === "search" && searchActive && (
//     <div
//       className={mergeClassNames(
//         "absolute top-full rounded-lg left-0 right-0 w-full max-h-[315px] overflow-y-auto bg-white shadow-1",
//         styles.searchScrollBar
//       )}
//     >
//       {searchProps?.searchOptions &&
//         searchProps.searchOptions.map((option, i) => (
//           <div
//             className="flex group hover:bg-primary hover:bg-opacity-10 cursor-pointer items-center justify-center py-[9px] px-3 gap-2"
//             style={{ borderBottom: "1px solid #E2E8F0" }}
//             key={i}
//           >
//             <div className="w-[30%] flex items-center justify-center">
//               <h4 className="whitespace-nowrap overflow-hidden text-ellipsis text-[16px] font-bold leading-[18px] text-[#1A2B3D] group-hover:text-primary">
//                 {option.title}
//               </h4>
//             </div>
//             <div className="w-[1px] h-[30px] bg-[#E2E8F0]"></div>
//             <div className="min-w-[70%] w-full">
//               <h5 className="whitespace-nowrap overflow-hidden text-ellipsis text-[14px] font-semibold leading-[18px] text-[#1A2B3D]">
//                 {option.subtitle}
//               </h5>
//               <p className="whitespace-nowrap overflow-hidden text-ellipsis text-[12px] font-[400] leading-[16px] text-[#1A2B3D]">
//                 {option.description}
//               </p>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// }
// {
//   inputType === "date" &&
//     searchActive &&
//     (groupedInput?.order === 0 ? (
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className={mergeClassNames(
//           "absolute top-full rounded-lg left-0 right-0 max-h-[315px] overflow-y-auto bg-white shadow-1 w-fit",
//           styles.searchScrollBar
//         )}
//       >
//         {/* <Calendar
//         initialFocus
//         mode="range"
//         defaultMonth={date?.from}
//         selected={date}
//         onSelect={setDate}
//         numberOfMonths={2}
//       /> */}
//       </div>
//     ) : (
//       <></>
//     ));
// }

export default SearchInput;
