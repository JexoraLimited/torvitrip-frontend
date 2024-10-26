import { cn } from "@/utils/common";
import moment from "moment";
import { CaptionProps, useNavigation } from "react-day-picker";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const DayPickerHead = ({
  displayMonth,
  displayIndex,
  type,
}: CaptionProps & { type: "one-way" | "round-trip" }) => {
  const { nextMonth, goToMonth, previousMonth } = useNavigation();

  // Add a function to check if navigation is allowed
  const isNavigationAllowed = (month: Date) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const selectedYear = month.getFullYear();
    const selectedMonth = month.getMonth();
    const maxAllowedYear = currentYear + 1;
    const maxAllowedMonth = currentMonth;

    return (
      (selectedYear > currentYear ||
        (selectedYear === currentYear && selectedMonth >= currentMonth)) &&
      selectedYear <= maxAllowedYear &&
      (selectedYear !== maxAllowedYear || selectedMonth <= maxAllowedMonth)
    );
  };
  return (
    <div className="flex py-[22px] select-none cursor-default relative items-center justify-center">
      {type === "round-trip" && (
        <div
          className={cn("absolute", displayIndex === 0 ? "left-1" : "right-1")}
        >
          {displayIndex === 0 ? (
            <AiFillCaretLeft
              onClick={() => {
                if (previousMonth && isNavigationAllowed(previousMonth)) {
                  goToMonth(previousMonth);
                }
              }}
              className={`text-[20px] ${
                !previousMonth || !isNavigationAllowed(previousMonth)
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-primary cursor-pointer"
              }`}
            />
          ) : (
            <AiFillCaretRight
              onClick={() => {
                if (nextMonth && isNavigationAllowed(nextMonth)) {
                  goToMonth(nextMonth);
                }
              }}
              className={`text-[20px] ${
                !nextMonth || !isNavigationAllowed(nextMonth)
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-primary cursor-pointer"
              }`}
            />
          )}
        </div>
      )}

      {type === "one-way" && (
        <div className={cn("absolute", "left-1")}>
          <AiFillCaretLeft
            onClick={() => {
              if (previousMonth && isNavigationAllowed(previousMonth)) {
                goToMonth(previousMonth);
              }
            }}
            className={`text-[20px] ${
              !previousMonth || !isNavigationAllowed(previousMonth)
                ? "text-gray-400 cursor-not-allowed"
                : "text-secondary cursor-pointer"
            }`}
          />
        </div>
      )}
      <h5>{moment(displayMonth).format("MMMM YYYY")}</h5>
      {type === "one-way" && (
        <div className={cn("absolute", "right-1")}>
          <AiFillCaretRight
            onClick={() => {
              if (nextMonth && isNavigationAllowed(nextMonth)) {
                goToMonth(nextMonth);
              }
            }}
            className={`text-[20px] ${
              !nextMonth || !isNavigationAllowed(nextMonth)
                ? "text-gray-400 cursor-not-allowed"
                : "text-secondary cursor-pointer"
            }`}
          />
        </div>
      )}
    </div>
  );
};

export default DayPickerHead;
