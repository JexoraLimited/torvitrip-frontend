import { useFlightSearchContext } from "@/context/flight-search/FlightSearchContext";
import { nunitoSans } from "@/fonts/google";
import { FlightSort } from "@/types/common";
import { cn, formatCurrency, formatDurationFromIso } from "@/utils/common";
import moment from "moment";

const FlightSearchSort = () => {
  const {
    filters,
    handleFilterFlights,
    searchData: {
      currency,
      filters: {
        cheapestFlightPrice,
        earliestFlightTime,
        fastestFlightDuration,
      },
    },
  } = useFlightSearchContext();

  const { sort: activeSort } = filters;

  const setActiveSort = (sort: FlightSort) => {
    handleFilterFlights({ ...filters, sort }, true);
  };

  return (
    <div
      className="flex flex-col md:flex-row relative rounded-md shadow-none p-0 overflow-hidden cursor-pointer divide-y-2 md:divide-x-2 md:divide-y-0 items-center h-[126px] w-full md:h-[50px]"
      style={nunitoSans.style}
    >
      <div
        onClick={() => {
          if (activeSort !== "earliest") {
            setActiveSort("earliest");
          }
        }}
        className={cn(
          `flex items-center justify-between gap-3 duration-300 w-full h-full flex-1 font-bold px-5`,
          activeSort === "earliest"
            ? "bg-primary text-white"
            : "bg-white text-black"
        )}
      >
        <div className="flex items-center gap-2">
          <h4 className="text-md">Earliest</h4>
        </div>
        <small className="text-sm">
          {moment(earliestFlightTime).format("h:mm A")}
        </small>
      </div>

      <div
        onClick={() => {
          if (activeSort !== "cheapest") {
            setActiveSort("cheapest");
          }
        }}
        className={cn(
          `flex items-center justify-between gap-3 duration-300 text-black w-full h-full flex-1 font-bold px-5`,
          activeSort === "cheapest"
            ? "bg-primary text-white"
            : "bg-white text-black"
        )}
      >
        <div className="flex items-center gap-2">
          <h4 className="text-md">Cheapest</h4>
        </div>
        <small className="text-sm">
          {formatCurrency(cheapestFlightPrice, currency)}
        </small>
      </div>
      <div
        onClick={() => {
          if (activeSort !== "fastest") {
            setActiveSort("fastest");
          }
        }}
        className={cn(
          `flex items-center justify-between gap-3 duration-300 text-black w-full h-full flex-1 font-bold px-5`,
          activeSort === "fastest"
            ? "bg-primary text-white"
            : "bg-white text-black"
        )}
      >
        <div className="flex items-center gap-2">
          <h4 className="text-md">Fastest</h4>
        </div>
        <small className="text-sm">
          {formatDurationFromIso(fastestFlightDuration)}
        </small>
      </div>
    </div>
  );
};

export default FlightSearchSort;
