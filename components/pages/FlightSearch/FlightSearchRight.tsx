import { Button } from "@/components/ui/Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/Sheet";
import { useFlightSearchContext } from "@/context/flight-search/FlightSearchContext";
import useDeviceIndicator from "@/hooks/useDeviceIndicator";
import { cn, formatCurrency } from "@/utils/common";
import Image from "next/image";
import { useState } from "react";
import Marquee from "react-fast-marquee";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { IoFilterSharp } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import { nunitoSans } from "../../../fonts/google";
import FlightCard from "./FlightCard";
import FlightSearchSort from "./FlightSearchSort";
import FlightSkeletonGroup from "./FlightSkeletonGroup";

interface IFlightSearchRight {
  sortOpen: boolean;
  onSortOpenChange: (open: boolean) => void;
  setFiltersActive: (open: boolean) => void;
}

const FlightSearchRight: React.FC<IFlightSearchRight> = ({
  sortOpen,
  onSortOpenChange,
  setFiltersActive,
}) => {
  const { isLargeScreen } = useDeviceIndicator();
  const {
    searchData: { airlines, totalFlights, flights, page, currency, searchId },
    handleFilterFlights,
    filters,
    filterLoading,
  } = useFlightSearchContext();
  const { isPhone } = useDeviceIndicator();
  const [airlineDirection, setAirlineDirection] = useState<"left" | "right">(
    "left"
  );
  const pages = Math.ceil(totalFlights / 10);

  const setUnsetAirline = (airline: string) => {
    const airlines = filters.filters?.airlines || [];
    if (airlines.includes(airline)) {
      let otherAirlines: string[] | undefined = airlines.filter(
        (a) => a !== airline
      );
      if (otherAirlines.length === 0) {
        otherAirlines = undefined;
      }
      handleFilterFlights(
        {
          ...filters,
          filters: { ...filters.filters, airlines: otherAirlines },
        },
        true
      );
    } else {
      handleFilterFlights(
        {
          ...filters,
          filters: {
            ...filters.filters,
            airlines: [...airlines, airline],
          },
        },
        true
      );
    }
  };
  return (
    <div className="md:flex-grow md:flex-1 w-full md:w-auto h-full">
      <div className="w-full">
        {isLargeScreen && (
          <div
            className={"mb-3 grid"}
            style={{ gridTemplateColumns: "60px calc(100% - 120px) 60px" }}
          >
            <div
              onClick={() => setAirlineDirection("left")}
              className="h-[55px] w-[60px] flex items-center justify-center bg-primary cursor-pointer shadow-1 rounded-tl-lg rounded-bl-lg"
            >
              <BsCaretLeftFill className="text-[20px] md:text-[25px] text-white" />
            </div>
            <Marquee pauseOnHover speed={30} direction={airlineDirection}>
              {airlines.map((ar, i) => (
                <div
                  onClick={() => setUnsetAirline(ar.airline.iata_code)}
                  className={cn(
                    "flex cursor-pointer px-3 gap-3 h-[55px] items-center justify-center bg-white",
                    filters.filters?.airlines?.includes(ar.airline.iata_code) &&
                      "bg-primary text-white",
                    nunitoSans.className
                  )}
                  key={i}
                >
                  <div className="h-[50px] w-[50px] relative">
                    <Image
                      src={ar.airline.logo}
                      alt={ar.airline.iata_code}
                      fill
                    />
                  </div>
                  <div className="pr-3">
                    <h5 className="leading-5 text-md font-semibold">
                      {ar.airline.iata_code} - {ar.count}
                    </h5>
                    <span className="text-xs">
                      {formatCurrency(ar.price, currency, {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </Marquee>
            <div
              onClick={() => setAirlineDirection("right")}
              className="h-[55px] w-[60px] flex items-center justify-center bg-primary shadow-1 cursor-pointer rounded-tr-lg rounded-br-lg"
            >
              <BsCaretRightFill className="text-[20px] md:text-[25px] text-white" />
            </div>
          </div>
        )}
      </div>

      <Sheet open={isPhone && sortOpen} onOpenChange={onSortOpenChange}>
        <SheetContent
          side={"bottom"}
          className="p-0 overflow-hidden flex flex-col gap-0 border-0 max-h-[85vh]"
        >
          <SheetHeader>
            <SheetTitle>Sort Flights</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto no-scrollbar h-full w-full py-8 px-4">
            {isPhone && <FlightSearchSort />}
          </div>
          <SheetFooter>
            <SheetClose className="w-full">
              <Button variant={"secondary"} className="w-full">
                Save
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <FlightSearchSort />
      <Button
        onClick={() => {
          setFiltersActive(true);
        }}
        size={"md"}
        className={
          "w-full py-5 gap-3 font-bold text-[18px] mt-3 flex md:hidden"
        }
      >
        <IoFilterSharp className="text-xl" /> All Filters
      </Button>
      {filterLoading && <FlightSkeletonGroup className="mt-3" />}
      {flights.length === 0 && (
        <div className="w-full h-[400px] rounded-lg bg-white flex items-center justify-center flex-col mt-3">
          <h3 className="text-4xl font-bold text-center">
            No <span className="text-primary">flights</span> found
          </h3>
          <p className="texts-m text-center w-1/2 mx-auto">
            No flights found with your search. Try modifying the filters or
            modifying the search.
          </p>
        </div>
      )}
      {!filterLoading && flights.length > 0 && (
        <InfiniteScroll
          dataLength={flights.length}
          className="w-full space-y-3 mt-3"
          next={() => {
            handleFilterFlights({ ...filters, page: page + 1 });
          }}
          hasMore={page < pages}
          scrollThreshold={"800px"}
          loader={<FlightSkeletonGroup className="mt-3" />}
          endMessage={
            <div className="w-full flex gap-2 items-center">
              <div className="h-[2px] bg-primary w-full"></div>
              <h6 className="text-sm whitespace-nowrap text-secondary font-bold">
                End Of Result
              </h6>
              <div className="h-[2px] bg-primary w-full"></div>
            </div>
          }
        >
          {flights.map((f, i) => (
            <FlightCard
              count={i + 1}
              totalFlights={totalFlights}
              flight={f}
              key={i}
              searchId={searchId}
            />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default FlightSearchRight;
