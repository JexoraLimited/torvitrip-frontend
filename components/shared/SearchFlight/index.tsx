import { TravelClass } from "@/data/flight";
import { FlightTypes, IAirport, ISelectValue } from "@/types/common";
import { cn } from "@/utils/common";
import moment from "moment";
import React, { useState } from "react";
import { CaptionProps, useNavigation } from "react-day-picker";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { z } from "zod";
import Colors from "../../../constants/Colors";
import { nunitoSans } from "../../../fonts/google";
import MultiCity from "./MultiCity";
import OneAndRoundTrip from "./OneAndRoundTrip";

type PopupTypes =
  | "from_city"
  | "to_city"
  | "from_date"
  | "to_date"
  | "travelers";
type PopupState = { [key in PopupTypes]: boolean };
const FlightSearchSchema = z.object({
  from: z.object({
    iata_code: z
      .string({
        required_error: "IATA code is required",
      })
      .length(3, { message: "IATA CODE must 3 characters" }),
    city: z.string({
      required_error: "City is required",
    }),
    country: z.string({
      required_error: "Country is required",
    }),
    airport: z.string({
      required_error: "Airport is required",
    }),
  }),
  to: z.object({
    iata_code: z
      .string({
        required_error: "IATA code is required",
      })
      .length(3, { message: "IATA CODE must 3 characters" }),
    city: z.string({
      required_error: "City is required",
    }),
    country: z.string({
      required_error: "Country is required",
    }),
    airport: z.string({
      required_error: "Airport is required",
    }),
  }),
  dates: z.object({
    from: z.date({
      required_error: "From Date is required",
    }),
    to: z.date({
      required_error: "To Date is required",
    }),
  }),
  bookingInfo: z.object({
    travelers: z.object({
      adults: z
        .number({ required_error: "Adult travelers is required" })
        .min(1, { message: "At least one travelers required" })
        .max(9, {
          message: "Adult can't be greater than 9",
        }),
      children: z
        .number({ required_error: "Adult travelers is required" })
        .min(0, { message: "Children can't be negative" }),
      infants: z
        .number({ required_error: "Adult travelers is required" })
        .min(0, { message: "Infant can't be negative" }),
    }),
    class: z.object({ label: z.string(), value: z.string() }),
  }),
});

type FlightSearchSchemaType = Zod.infer<typeof FlightSearchSchema>;

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
                  : "text-secondary cursor-pointer"
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
                  : "text-secondary cursor-pointer"
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

type WayStateType = "one-way" | "round-trip" | "multi-city";
interface WayState {
  label: string;
  id: WayStateType;
  element?: React.ReactNode;
}
const tripTypes: WayState[] = [
  {
    label: "One Way",
    id: "one-way",
  },
  {
    label: "Round Trip",
    id: "round-trip",
  },
  {
    label: "Multi City",
    id: "multi-city",
  },
];

export interface ISearchFlight {
  origins?: IAirport[];
  destinations?: IAirport[];
  fromDates?: Date[];
  toDates?: Date[];
  type?: FlightTypes;
  travelers?: {
    adults: number;
    children: number;
    infants: number;
  };
  travelClass?: ISelectValue<string, TravelClass>;
  searchText?: string;
}

const SearchFlight: React.FC<ISearchFlight> = ({
  travelClass,
  destinations,
  fromDates,
  origins,
  toDates,
  travelers,
  type,
  searchText,
}) => {
  const [tripType, setTripType] = useState(type || tripTypes[1].id);
  return (
    <>
      <div className="w-full flex justify-center lg:justify-between items-center">
        <div
          className={`flex items-center flex-wrap justify-around lg:justify-start w-full lg:gap-8`}
        >
          {tripTypes.map((ws) => (
            <div
              key={ws.id}
              className="flex items-center cursor-pointer justify-between gap-2"
              onClick={() => setTripType(ws.id)}
            >
              <div
                style={{
                  border:
                    ws.id === tripType
                      ? `4px solid ${Colors.primary}`
                      : "1px solid gray",
                }}
                className="h-[14px] w-[14px] lg:h-[16px] lg:w-[16px] bg-white rounded-full"
              ></div>
              <span
                className={`${nunitoSans.className} text-[12px] lg:text-[16px] font-bold text-[#7c8db0]`}
              >
                {ws.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      {tripType !== "multi-city" && (
        <OneAndRoundTrip
          tripType={tripType}
          origins={origins}
          destinations={destinations}
          fromDates={fromDates}
          toDates={toDates}
          searchText={searchText}
          travelClass={travelClass}
          travelers={travelers}
          type={type}
        />
      )}
      {tripType === "multi-city" && (
        <MultiCity
          tripType={tripType}
          origins={origins}
          destinations={destinations}
          fromDates={fromDates}
          toDates={toDates}
          searchText={searchText}
          travelClass={travelClass}
          travelers={travelers}
          type={type}
        />
      )}
    </>
  );
};

export default SearchFlight;
