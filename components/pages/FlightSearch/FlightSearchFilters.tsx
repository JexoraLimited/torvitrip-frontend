import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import HR from "@/components/ui/HR/HR";
import { Slider } from "@/components/ui/Slider";
import { useFlightSearchContext } from "@/context/flight-search/FlightSearchContext";
import { murecho, nunitoSans } from "@/fonts/google";
import useTimer from "@/hooks/useTimer";
import { FlightTypes, IAirline, Refundable } from "@/types/common";
import { cn, formatCurrency, getTripType } from "@/utils/common";
import { useRouter } from "next/router";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiMoon, FiSun, FiSunrise, FiSunset } from "react-icons/fi";

const BAGGAGES: {
  type: "quantity" | "weight";
  amount: number;
}[] = [
  {
    type: "quantity",
    amount: 1,
  },
  {
    type: "weight",
    amount: 35,
  },
  {
    type: "weight",
    amount: 30,
  },
  {
    type: "weight",
    amount: 25,
  },
  {
    type: "weight",
    amount: 20,
  },
  {
    type: "weight",
    amount: 10,
  },
];

interface IFlightSearchFilters {
  airlines: { airline: IAirline; count: number; price: number }[];
  setFiltersActive: (open: boolean) => void;
  setSortActive: (open: boolean) => void;
}

const FlightSearchFilters: React.FC<IFlightSearchFilters> = ({
  airlines,
  setFiltersActive,
  setSortActive,
}) => {
  const router = useRouter();
  const {
    filters,
    handleFilterFlights,
    searchData,
    isFilterApplied,
    resetFilter,
  } = useFlightSearchContext();
  const { originAirports, destinationAirports } = searchData;
  const AIRLINES_SHOWN_COUNT = 5;
  const BAGGAGES_SHOWN_COUNT = 3;
  const [shownAirlines, setShownAirlines] = useState(
    airlines.slice(0, AIRLINES_SHOWN_COUNT)
  );

  const tripType = router.query.tripType as FlightTypes;

  const [sessionEndOpen, setSessionEndOpen] = useState(false);
  const [timeSelectedTab, setTimeSelectedTab] = useState<
    "departure" | "arrival"
  >("departure");

  const { formattedMinutes, formattedSeconds } = useTimer(1800, {
    onTimerEnd: () => {
      setFiltersActive(false);
      setSortActive(false);
      setSessionEndOpen(true);
    },
  });
  const [allAirlinesShown, setAllAirlinesShown] = useState(
    shownAirlines.length === airlines.length
  );
  const [shownBaggages, setShownBaggages] = useState(
    BAGGAGES.slice(0, BAGGAGES_SHOWN_COUNT)
  );
  const [allBaggagesShown, setAllBaggagesShown] = useState(
    shownBaggages.length === BAGGAGES.length
  );
  const [pricingRange, setPricingRange] = useState<number[]>([
    searchData.filters.price.min || 0,
    searchData.filters.price.max || 0,
  ]);

  const needAirlineShowButton = useMemo(
    () => airlines.length > AIRLINES_SHOWN_COUNT,
    [airlines.length]
  );

  const needBaggageShowButton = useMemo(
    () => airlines.length > AIRLINES_SHOWN_COUNT,
    [airlines.length]
  );

  const toggleShowAirlines = useCallback(() => {
    if (allAirlinesShown) {
      setShownAirlines(airlines.slice(0, AIRLINES_SHOWN_COUNT));
      setAllAirlinesShown(false);
    } else {
      setShownAirlines(airlines);
      setAllAirlinesShown(true);
    }
  }, [allAirlinesShown, airlines]);

  const toggleShowBaggages = useCallback(() => {
    if (allBaggagesShown) {
      setShownBaggages(BAGGAGES.slice(0, BAGGAGES_SHOWN_COUNT));
      setAllBaggagesShown(false);
    } else {
      setShownBaggages(BAGGAGES);
      setAllBaggagesShown(true);
    }
  }, [allBaggagesShown]);

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

  const setStoppageFilter = (
    stoppage: "non-stop" | "one-stop" | "two-and-up"
  ) => {
    if (filters.filters?.stops === stoppage) {
      handleFilterFlights(
        {
          ...filters,
          filters: { ...filters.filters, stops: undefined },
        },
        true
      );
    } else {
      handleFilterFlights(
        {
          ...filters,
          filters: { ...filters.filters, stops: stoppage },
        },
        true
      );
    }
  };

  const stoppage = filters.filters?.stops;

  const isAirlineFiltered = useCallback(
    (airline: string) => filters.filters?.airlines?.includes(airline),
    [filters]
  );

  const setBaggage = (baggage: {
    type: "quantity" | "weight";
    amount: number;
  }) => {
    const baggageIndex = filters.filters?.baggage?.findIndex(
      (f) => f.amount === baggage.amount && f.type === baggage.type
    );
    if (baggageIndex === undefined || baggageIndex === -1) {
      handleFilterFlights(
        {
          ...filters,
          filters: {
            ...filters.filters,
            baggage: [...(filters.filters?.baggage || []), baggage],
          },
        },
        true
      );
    } else {
      let others = filters.filters?.baggage?.filter(
        (b) => b.amount !== baggage.amount
      );
      console.log(others);
      handleFilterFlights(
        {
          ...filters,
          filters: {
            ...filters.filters,
            baggage: others,
          },
        },
        true
      );
    }
  };

  const isBaggageSelected = (baggage: {
    type: "quantity" | "weight";
    amount: number;
  }) => {
    const baggageIndex = filters.filters?.baggage?.findIndex(
      (f) => f.amount === baggage.amount && f.type === baggage.type
    );
    if (baggageIndex === undefined) return false;
    return !!filters.filters?.baggage?.[baggageIndex];
  };

  const handlePricingFilter = (range: number[]) => {
    handleFilterFlights(
      {
        ...filters,
        filters: {
          ...filters.filters,
          pricing: { minPrice: range[0], maxPrice: range[1] },
        },
      },
      true
    );
  };

  const setTime = (
    type: "departure" | "arrival",
    time: string,
    index: number
  ) => {
    const selected = filters.filters?.schedule?.[type]?.[index] === time;
    const departureSchedules = filters.filters?.schedule?.departure || [];
    const arrivalSchedules = filters.filters?.schedule?.arrival || [];
    let departureArray = originAirports.map((_, i) => {
      if (i === index && type == "departure") {
        return selected ? "" : time;
      }
      if (departureSchedules?.[i]) {
        return departureSchedules?.[i];
      } else return "";
    });
    let arrivalArray = destinationAirports.map((_, i) => {
      if (i === index && type === "arrival") {
        return selected ? "" : time;
      }
      if (arrivalSchedules?.[i]) {
        return arrivalSchedules?.[i];
      } else return "";
    });
    let scheduleObj: any = {
      arrival: arrivalArray,
      departure: departureArray,
    };
    const allArrivalEmpty = scheduleObj.arrival.every(
      (arrival: string) => arrival === ""
    );
    const allDepartureEmpty = scheduleObj.departure.every(
      (departure: string) => departure === ""
    );
    if (allArrivalEmpty && allDepartureEmpty) {
      scheduleObj = undefined;
    }
    handleFilterFlights(
      {
        ...filters,
        filters: {
          ...filters.filters,
          schedule: scheduleObj,
        },
      },
      true
    );
  };

  const isTimeSelected = useCallback(
    (type: "departure" | "arrival", time: string, index: number) => {
      const selected = filters.filters?.schedule?.[type]?.[index] === time;
      return selected;
    },
    [filters.filters?.schedule]
  );

  useEffect(() => {
    setPricingRange([
      filters.filters?.pricing?.minPrice || 0,
      filters.filters?.pricing?.maxPrice || 0,
    ]);
  }, [filters.filters?.pricing]);

  const handleRefundFilter = (refundability: Refundable) => {
    const selected = filters.filters?.refundability === refundability;
    handleFilterFlights(
      {
        ...filters,
        filters: {
          ...filters.filters,
          refundability: selected ? undefined : refundability,
        },
      },
      true
    );
  };

  return (
    <Fragment>
      <Dialog
        open={sessionEndOpen}
        onOpenChange={(open) => {
          if (open) setSessionEndOpen(open);
          else {
            window.location.reload();
          }
        }}
      >
        <DialogContent className="gap-1">
          <h5 className="text-3xl font-semibold text-center">
            Session Expired
          </h5>
          <p className="text-sm text-center w-full md:w-2/3 mx-auto">
            Your session has expired. You have to search again to browse flights
            again
          </p>
          <Button
            className="w-full mt-3"
            onClick={() => {
              window.location.reload();
            }}
          >
            Search Again
          </Button>
        </DialogContent>
      </Dialog>
      <div className="py-4 px-3">
        <h4 className="text-center text-xl mb-3 font-bold">
          Session Timeout in
        </h4>
        <div
          className={cn(
            "flex items-center justify-center gap-3",
            nunitoSans.className
          )}
        >
          <div className="px-2 font-bold text-white py-1 bg-primary rounded-md">
            <h3>{formattedMinutes}</h3>
          </div>
          <h3 className="text-3xl text-primary">:</h3>
          <div className="px-2 font-bold text-white py-1 bg-primary rounded-md">
            <h3>{formattedSeconds}</h3>
          </div>
        </div>
      </div>
      <HR />
      <div className="p-5">
        <div className="w-full flex items-center justify-between">
          <h4 className={"text-[18px] font-bold"}>
            {getTripType(tripType)} price
          </h4>
          {isFilterApplied("pricing") && (
            <Button
              onClick={() => resetFilter("pricing")}
              size={"xs"}
              className="font-medium"
            >
              Reset
            </Button>
          )}
        </div>
        <p className="text-xs text-gray-600 leading-4 my-2">
          Starts from{" "}
          <span className="font-bold">
            {formatCurrency(searchData.filters.price.min, searchData.currency)}
          </span>{" "}
          -{" "}
          <span className="font-bold">
            {formatCurrency(searchData.filters.price.max, searchData.currency)}
          </span>{" "}
          against your search. Price is a subject to change.
        </p>
        {/* <div className="w-full bg-primary h-2 my-3"></div> */}
        <Slider
          className="mt-4 mb-3"
          defaultValue={[
            searchData.filters.price.min,
            searchData.filters.price.max,
          ]}
          minStepsBetweenThumbs={8}
          min={searchData.filters.price.min || 0}
          max={searchData.filters.price.max || 0}
          value={pricingRange}
          onValueCommit={handlePricingFilter}
          onValueChange={(range) => setPricingRange(range)}
        />
        <p className="text-sm">
          <span>
            {formatCurrency(
              filters.filters?.pricing?.minPrice || 0,
              searchData.currency
            )}
          </span>{" "}
          -{" "}
          <span>
            {formatCurrency(
              filters.filters?.pricing?.maxPrice || 0,
              searchData.currency
            )}
          </span>
        </p>
      </div>
      <HR />
      <div className="p-5">
        <div className="w-full flex items-center justify-between">
          <h4 className={"text-[18px] font-bold mb-3"}>Schedules</h4>
          {isFilterApplied("schedule") && (
            <Button
              onClick={() => resetFilter("schedule")}
              size={"xs"}
              className="font-medium"
            >
              Reset
            </Button>
          )}
        </div>
        <div className="w-full flex rounded-lg overflow-hidden h-[35px]">
          <div
            onClick={() => setTimeSelectedTab("departure")}
            className={cn(
              "flex-1 flex items-center justify-center w-full h-full text-sm font-bold cursor-pointer",
              timeSelectedTab === "departure"
                ? "bg-primary text-white"
                : " bg-slate-100 text-black"
            )}
          >
            Departure
          </div>
          <div
            onClick={() => setTimeSelectedTab("arrival")}
            className={cn(
              "flex-1 flex items-center justify-center w-full h-full text-sm font-bold cursor-pointer",
              timeSelectedTab === "arrival"
                ? "bg-primary text-white"
                : " bg-slate-100 text-black"
            )}
          >
            Arrival
          </div>
        </div>
        <div className="space-y-2 mt-3">
          {timeSelectedTab === "departure" &&
            originAirports.map((airport, i) => (
              <div key={i} className="w-full">
                <h4 className={"text-base font-bold"}>
                  Departure in {airport.iata_code}
                </h4>
                <div className="flex gap-1 p-[2px] rounded-lg bg-white border border-[#d8e1eb] items-center justify-center">
                  <div
                    onClick={() => setTime("departure", "00 - 06", i)}
                    className={cn(
                      "p-1 flex gap-1 flex-col items-center justify-center border  flex-1 h-[60px] rounded-tl-lg rounded-bl-lg cursor-pointer",
                      isTimeSelected("departure", "00 - 06", i)
                        ? "bg-primary/30 text-primary border-primary"
                        : "text-[#77818c] bg-[#ebf0f5] border-[#d8e1eb]"
                    )}
                  >
                    <FiSunrise fontSize={20} />
                    <small
                      className={cn(
                        "text-[10px] font-medium",
                        murecho.className
                      )}
                    >
                      12-06 AM
                    </small>
                  </div>
                  <div
                    onClick={() => setTime("departure", "06 - 12", i)}
                    className={cn(
                      "p-1 flex gap-1 flex-col items-center justify-center border  flex-1 h-[60px] cursor-pointer",
                      isTimeSelected("departure", "06 - 12", i)
                        ? "bg-primary/30 text-primary border-primary"
                        : "text-[#77818c] bg-[#ebf0f5] border-[#d8e1eb]"
                    )}
                  >
                    <FiSun fontSize={20} />
                    <small
                      className={cn(
                        "text-[10px] font-medium",
                        murecho.className
                      )}
                    >
                      06-12 AM
                    </small>
                  </div>
                  <div
                    onClick={() => setTime("departure", "12 - 18", i)}
                    className={cn(
                      "p-1 flex gap-1 flex-col items-center justify-center border  flex-1 h-[60px] cursor-pointer",
                      isTimeSelected("departure", "12 - 18", i)
                        ? "bg-primary/30 text-primary border-primary"
                        : "text-[#77818c] bg-[#ebf0f5] border-[#d8e1eb]"
                    )}
                  >
                    <FiSunset fontSize={20} />
                    <small
                      className={cn(
                        "text-[10px] font-medium",
                        murecho.className
                      )}
                    >
                      12-06 PM
                    </small>
                  </div>
                  <div
                    onClick={() => setTime("departure", "18 - 24", i)}
                    className={cn(
                      "p-1 flex gap-1 flex-col items-center justify-center border  flex-1 h-[60px] rounded-tr-lg rounded-br-lg cursor-pointer",
                      isTimeSelected("departure", "18 - 24", i)
                        ? "bg-primary/30 text-primary border-primary"
                        : "text-[#77818c] bg-[#ebf0f5] border-[#d8e1eb]"
                    )}
                  >
                    <FiMoon fontSize={20} />
                    <small
                      className={cn(
                        "text-[10px] font-medium",
                        murecho.className
                      )}
                    >
                      06-12 PM
                    </small>
                  </div>
                </div>
              </div>
            ))}
          {timeSelectedTab === "arrival" &&
            destinationAirports.map((airport, i) => (
              <div key={i} className="w-full">
                <h4 className={"text-base font-bold"}>
                  Arrival in {airport.iata_code}
                </h4>
                <div className="flex gap-1 p-[2px] rounded-lg bg-white border border-[#d8e1eb] items-center justify-center">
                  <div
                    onClick={() => setTime("arrival", "00 - 06", i)}
                    className={cn(
                      "p-1 flex gap-1 flex-col items-center justify-center border  flex-1 h-[60px] rounded-tl-lg rounded-bl-lg cursor-pointer",
                      isTimeSelected("arrival", "00 - 06", i)
                        ? "bg-primary/30 text-primary border-primary"
                        : "text-[#77818c] bg-[#ebf0f5] border-[#d8e1eb]"
                    )}
                  >
                    <FiSunrise fontSize={20} />
                    <small
                      className={cn(
                        "text-[10px] font-medium",
                        murecho.className
                      )}
                    >
                      12-06 AM
                    </small>
                  </div>
                  <div
                    onClick={() => setTime("arrival", "06 - 12", i)}
                    className={cn(
                      "p-1 flex gap-1 flex-col items-center justify-center border  flex-1 h-[60px] cursor-pointer",
                      isTimeSelected("arrival", "06 - 12", i)
                        ? "bg-primary/30 text-primary border-primary"
                        : "text-[#77818c] bg-[#ebf0f5] border-[#d8e1eb]"
                    )}
                  >
                    <FiSun fontSize={20} />
                    <small
                      className={cn(
                        "text-[10px] font-medium",
                        murecho.className
                      )}
                    >
                      06-12 AM
                    </small>
                  </div>
                  <div
                    onClick={() => setTime("arrival", "12 - 18", i)}
                    className={cn(
                      "p-1 flex gap-1 flex-col items-center justify-center border  flex-1 h-[60px] cursor-pointer",
                      isTimeSelected("arrival", "12 - 18", i)
                        ? "bg-primary/30 text-primary border-primary"
                        : "text-[#77818c] bg-[#ebf0f5] border-[#d8e1eb]"
                    )}
                  >
                    <FiSunset fontSize={20} />
                    <small
                      className={cn(
                        "text-[10px] font-medium",
                        murecho.className
                      )}
                    >
                      12-06 PM
                    </small>
                  </div>
                  <div
                    onClick={() => setTime("arrival", "18 - 24", i)}
                    className={cn(
                      "p-1 flex gap-1 flex-col items-center justify-center border  flex-1 h-[60px] rounded-tr-lg rounded-br-lg cursor-pointer",
                      isTimeSelected("arrival", "18 - 24", i)
                        ? "bg-primary/30 text-primary border-primary"
                        : "text-[#77818c] bg-[#ebf0f5] border-[#d8e1eb]"
                    )}
                  >
                    <FiMoon fontSize={20} />
                    <small
                      className={cn(
                        "text-[10px] font-medium",
                        murecho.className
                      )}
                    >
                      06-12 PM
                    </small>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <HR />
      <div className="p-5">
        <div className="w-full flex items-center justify-between">
          <h4 className={"text-[18px] font-bold"}>Airlines</h4>
          {isFilterApplied("airline") && (
            <Button
              onClick={() => resetFilter("airline")}
              size={"xs"}
              className="font-medium"
            >
              Reset
            </Button>
          )}
        </div>
        <div className="flex flex-col mt-3">
          {shownAirlines.map((airlineObj) => (
            <label
              key={airlineObj.airline._id}
              className="flex items-center p-2 rounded-lg cursor-pointer justify-between hover:bg-slate-100"
              htmlFor={`airline-${airlineObj.airline.iata_code}`}
            >
              <div className="checkbox-group cursor-pointer w-[65%]">
                <input
                  onChange={() => setUnsetAirline(airlineObj.airline.iata_code)}
                  type="checkbox"
                  checked={isAirlineFiltered(airlineObj.airline.iata_code)}
                  id={`airline-${airlineObj.airline.iata_code}`}
                />
                <p className="whitespace-nowrap cursor-pointer overflow-hidden text-ellipsis w-[90%]">
                  {airlineObj.airline.airline_name}
                </p>
              </div>
              <small className="text-xs w-[30%] block text-right">
                {formatCurrency(airlineObj.price, searchData.currency)}
              </small>
            </label>
          ))}
          {needAirlineShowButton && (
            <Button
              onClick={toggleShowAirlines}
              variant={"secondaryText"}
              className="!p-0 justify-center h-[20px] text-[14px]"
            >
              {allAirlinesShown ? (
                <>
                  Show less <FaChevronDown />
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <span>
                    Show {airlines.length - shownAirlines.length} more airlines
                  </span>
                  <FaChevronUp />
                </div>
              )}
            </Button>
          )}
        </div>
      </div>
      <HR />
      <div className="p-5">
        <div className="w-full flex items-center justify-between">
          <h4 className={"text-[18px] font-bold"}>Number of stops</h4>
          {isFilterApplied("stoppage") && (
            <Button
              onClick={() => resetFilter("stoppage")}
              size={"xs"}
              className="font-medium"
            >
              Reset
            </Button>
          )}
        </div>
        <div className="flex flex-col mt-3">
          <label
            htmlFor="s-1"
            className="flex p-2 rounded-lg hover:bg-slate-100 items-center justify-between cursor-pointer"
          >
            <div className="checkbox-group">
              <input
                onChange={() => setStoppageFilter("non-stop")}
                checked={stoppage === "non-stop"}
                type="checkbox"
                id="s-1"
                className="cursor-pointer"
              />
              <p className="cursor-pointer">Non Stop</p>
            </div>
          </label>
          <label
            htmlFor="s-2"
            className="flex p-2 rounded-lg hover:bg-slate-100 items-center justify-between cursor-pointer"
          >
            <div className="checkbox-group">
              <input
                type="checkbox"
                onChange={() => setStoppageFilter("one-stop")}
                checked={stoppage === "one-stop"}
                id="s-2"
                className="cursor-pointer"
              />
              <p className="cursor-pointer">1 Stop</p>
            </div>
          </label>
          <label
            htmlFor="s-3"
            className="flex p-2 rounded-lg hover:bg-slate-100 items-center justify-between cursor-pointer"
          >
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="s-3"
                onChange={() => setStoppageFilter("two-and-up")}
                checked={stoppage === "two-and-up"}
              />
              <p className="cursor-pointer">2 and up</p>
            </div>
          </label>
        </div>
      </div>
      <HR />
      <div className="p-5">
        <div className="w-full flex items-center justify-between">
          <h4 className={"text-[18px] font-bold"}>Baggage Allowances</h4>
          {isFilterApplied("baggage") && (
            <Button
              onClick={() => resetFilter("baggage")}
              size={"xs"}
              className="font-medium"
            >
              Reset
            </Button>
          )}
        </div>
        <div className="flex flex-col mt-3">
          {shownBaggages.map((baggage, i) => (
            <label
              id={`baggage-${i + 1}`}
              key={i}
              className="checkbox-group p-2 hover:bg-slate-100 cursor-pointer"
            >
              <input
                onChange={() =>
                  setBaggage({ amount: baggage.amount, type: baggage.type })
                }
                checked={isBaggageSelected({
                  amount: baggage.amount,
                  type: baggage.type,
                })}
                type="checkbox"
                id={`baggage-${i + 1}`}
                className="cursor-pointer"
              />
              <p className="cursor-pointer">
                {baggage.amount} {baggage.type === "quantity" ? "Pcs" : "KG"}
              </p>
            </label>
          ))}
          {needBaggageShowButton && (
            <Button
              onClick={toggleShowBaggages}
              variant={"secondaryText"}
              className="!p-0 justify-center h-[20px] text-[14px]"
            >
              {allBaggagesShown ? (
                <>
                  Show less <FaChevronDown />
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <span>
                    Show {BAGGAGES.length - shownBaggages.length} more baggages
                  </span>
                  <FaChevronUp />
                </div>
              )}
            </Button>
          )}
        </div>
      </div>
      <HR />
      <div className="p-5">
        <div className="w-full flex items-center justify-between">
          <h4 className={"text-[18px] font-bold"}>Refundability</h4>
          {isFilterApplied("refundability") && (
            <Button
              onClick={() => resetFilter("refundability")}
              size={"xs"}
              className="font-medium"
            >
              Reset
            </Button>
          )}
        </div>
        <div className="flex flex-col mt-3">
          <label
            className="checkbox-group p-2 hover:bg-slate-100 rounded-lg cursor-pointer"
            htmlFor="r-1"
          >
            <input
              checked={filters?.filters?.refundability === "refundable"}
              onChange={() => handleRefundFilter("refundable")}
              type="checkbox"
              id="r-1"
              className="cursor-pointer"
            />
            <p className="cursor-pointer">Refundable</p>
          </label>
          <label
            className="checkbox-group p-2 hover:bg-slate-100 rounded-lg cursor-pointer"
            htmlFor="r-2"
          >
            <input
              checked={filters?.filters?.refundability === "non-refundable"}
              onChange={() => handleRefundFilter("non-refundable")}
              type="checkbox"
              id="r-2"
              className="cursor-pointer"
            />
            <p className="cursor-pointer">Non Refundable</p>
          </label>
          <label
            className="checkbox-group p-2 hover:bg-slate-100 rounded-lg cursor-pointer"
            htmlFor="r-3"
          >
            <input
              checked={
                filters?.filters?.refundability === "partially-refundable"
              }
              onChange={() => handleRefundFilter("partially-refundable")}
              type="checkbox"
              id="r-3"
              className="cursor-pointer"
            />
            <p className="cursor-pointer">Partially Refundable</p>
          </label>
        </div>
      </div>
    </Fragment>
  );
};

export default FlightSearchFilters;
