// import { Calendar, CalendarProps } from "@/components/ui/Calendar";
// import { cn } from "@/utils/common";
// import { addDays, addYears, isAfter, isBefore, subDays } from "date-fns";
// import moment from "moment";
// import { useState } from "react";
// import { CaptionProps, DateRange, useNavigation } from "react-day-picker";
// import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
// import styles from "./DayPicker.module.css";

// export type DayPickerProps = {} & CalendarProps;

// const DayPickerHead = ({ displayMonth, displayIndex }: CaptionProps) => {
//   const { nextMonth, goToMonth, previousMonth } = useNavigation();

//   const handleGoToMonth = (month: Date) => {
//     const today = new Date();

//     const currentYear = today.getFullYear();
//     const currentMonth = today.getMonth();

//     const selectedYear = month.getFullYear();
//     const selectedMonth = month.getMonth();

//     const maxAllowedYear = currentYear + 1;
//     const maxAllowedMonth = currentMonth;

//     if (
//       (selectedYear > currentYear ||
//         (selectedYear === currentYear && selectedMonth >= currentMonth)) &&
//       selectedYear <= maxAllowedYear &&
//       (selectedYear !== maxAllowedYear || selectedMonth <= maxAllowedMonth)
//     ) {
//       goToMonth(month);
//     }
//   };
//   return (
//     <div className="flex py-[22px] select-none cursor-default relative items-center justify-center">
//       <div
//         className={cn("absolute", displayIndex === 0 ? "left-1" : "right-1")}
//       >
//         {displayIndex === 0 ? (
//           <AiFillCaretLeft
//             onClick={() => {
//               previousMonth && handleGoToMonth(previousMonth);
//             }}
//             className="text-[20px]"
//           />
//         ) : (
//           <AiFillCaretRight
//             onClick={() => {
//               nextMonth && handleGoToMonth(nextMonth);
//             }}
//             className="text-[20px]"
//           />
//         )}
//       </div>
//       <h5>{moment(displayMonth).format("MMMM YYYY")}</h5>
//     </div>
//   );
// };
// const DayPicker: React.FC<DayPickerProps> = ({
//   mode = "default",
//   ...props
// }) => {
//   const today = new Date();
//   const dateOptions = {
//     today,
//     from: today,
//     to: addDays(today, 8),
//     oneYearFromNow: addYears(today, 1),
//     beforeOneDay: subDays(today, 1),
//   };
//   const [date, setDate] = useState<DateRange | undefined>({
//     from: dateOptions.from,
//     to: dateOptions.to,
//   });
//   return (
//     <Calendar
//       className="bg-white m-[0px!important] select-none"
//       initialFocus
//       mode="range"
//       defaultMonth={dateOptions.today}
//       selected={date}
//       onSelect={setDate}
//       numberOfMonths={2}
//       classNames={{
//         row: cn("flex w-full mt-1", styles.datePickerRow),
//         head: "rdp-head select-none",
//       }}
//       disabled={(date) =>
//         isBefore(date, dateOptions.beforeOneDay) ||
//         isAfter(date, dateOptions.oneYearFromNow)
//       }
//       components={{ Caption: DayPickerHead }}
//       modifiersClassNames={{
//         range_start: styles.datePickerRangeStart,
//         range_end: styles.datePickerRangeEnd,
//         range_middle: styles.datePickerRangeMiddle,
//         today: styles.datePickerToday,
//         selected: styles.datePickerSelected,
//         outside: styles.datePickerOutside,
//         disabled: styles.datePickerDisabled,
//       }}
//       {...props}
//     />
//   );
// };

// // DayPicker.displayName = "DisplayName";

// export default DayPicker;

export {};
