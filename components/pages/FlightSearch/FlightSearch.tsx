import lottieLoading from "@/assets/lotties/logo.json";
import SearchFlight from "@/components/shared/SearchFlight";
import { Button } from "@/components/ui/Button";
import { useFlightSearchContext } from "@/context/flight-search/FlightSearchContext";
import { TRAVEL_CLASSES_WITH_LABEL, TravelClass } from "@/data/flight";
import useDeviceIndicator from "@/hooks/useDeviceIndicator";
import { FlightTypes } from "@/types/common";
import { cn, formatCurrency } from "@/utils/common";
import { motion } from "framer-motion";
import moment from "moment";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Marquee from "react-fast-marquee";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { nunitoSans } from "../../../fonts/google";
import FlightSearchLeft from "./FlightSearchLeft";
import FlightSearchRight from "./FlightSearchRight";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const FlightSearch = () => {
  const { isPhone } = useDeviceIndicator();
  const {
    searchData: {
      status,
      destinationAirports,
      originAirports,
      totalFlights,
      airlines,
      currency,
    },
    getFiltersCount,
    filters,
    resetFilter,
    handleFilterFlights,
  } = useFlightSearchContext();
  const [modifySearchActive, setModifySearchActive] = useState(false);
  const [airlineDirection, setAirlineDirection] = useState<"left" | "right">(
    "left"
  );
  const [filtersActive, setFiltersActive] = useState(false);
  const [sortActive, setSortActive] = useState(false);
  const router = useRouter();
  const query = router.query as Record<string, string>;
  const departureDates = query.departureDate?.split(",");
  const returnDates = query.returnDate?.split(",");
  const tripType = query.tripType as FlightTypes;
  const travelClassId = query.travelClass as TravelClass;
  const currentTravelClass = useMemo(
    () =>
      TRAVEL_CLASSES_WITH_LABEL.find(
        (travelClass) => travelClass.value === travelClassId
      ),
    [travelClassId]
  );

  useEffect(() => {
    setModifySearchActive(false);
  }, [query]);

  const availableFilters = getFiltersCount();

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
    <>
      {status === "success" && (
        <>
          <Head>
            <title>
              {originAirports?.[0]?.city} ({originAirports?.[0]?.iata_code}) -{" "}
              {tripType === "one-way" || tripType === "multi-city"
                ? `
                  ${
                    destinationAirports?.[destinationAirports.length - 1]?.city
                  } (
                  ${
                    destinationAirports?.[destinationAirports.length - 1]
                      ?.iata_code
                  }
                  )
                `
                : ""}
              {tripType === "round-trip"
                ? `
                  ${destinationAirports?.[0]?.city} (${destinationAirports?.[0]?.iata_code})
                `
                : ""}
            </title>
          </Head>
          <div
            className={cn(
              "w-full bg-white main-container py-5",
              nunitoSans.className
            )}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex-grow">
                <h3 className="flex flex-col md:flex-row items-center text-center gap-[3px] text-[16px] md:text-[24px] font-bold">
                  <span>
                    {originAirports[0].iata_code} ({originAirports[0].city}) -{" "}
                    {tripType === "round-trip" && (
                      <>
                        {
                          destinationAirports?.[destinationAirports.length - 2]
                            ?.iata_code
                        }{" "}
                        (
                        {
                          destinationAirports?.[destinationAirports.length - 2]
                            ?.city
                        }
                        )
                      </>
                    )}
                    {(tripType === "one-way" || tripType === "multi-city") && (
                      <>
                        {
                          destinationAirports?.[destinationAirports.length - 1]
                            ?.iata_code
                        }{" "}
                        (
                        {
                          destinationAirports?.[destinationAirports.length - 1]
                            ?.city
                        }
                        )
                      </>
                    )}
                  </span>
                  <span className="font-normal text-[12px] md:text-[xl]">
                    ({query.travelClass})
                  </span>
                </h3>
                <p className="text-[12px] text-center md:text-left md:text-[16px] gap-[3px]">
                  {moment(departureDates[0]).format("Do MMMM YYYY")}{" "}
                  {tripType !== "one-way" &&
                    `- ${moment(
                      tripType === "round-trip"
                        ? returnDates?.[returnDates?.length - 1]
                        : departureDates?.[departureDates?.length - 1]
                    ).format("Do MMMM YYYY")} `}
                  |{" "}
                  {+query.adults
                    ? `Adult: ${query.adults} ${
                        +query.children || +query.infants ? "| " : ""
                      }`
                    : ""}
                  {+query.children
                    ? `Children: ${query.children} ${
                        +query.infants ? "| " : ""
                      }`
                    : ""}
                  {+query.infants ? `Infant: ${query.infants}` : ""}
                </p>
              </div>
              <Button
                size={"md"}
                onClick={() => setModifySearchActive((msa) => !msa)}
                className="w-full font-bold md:w-auto mt-2 md:mt-0 text-[18px] py-5"
              >
                {modifySearchActive ? "Close Modify Search" : "Modify Search"}
              </Button>
            </div>
            <motion.div
              animate={{ height: modifySearchActive ? "auto" : 0 }}
              className="w-full overflow-hidden"
            >
              <div className="mt-5 bg-white p-4 md:p-8 rounded-lg shadow-md">
                <SearchFlight
                  origins={originAirports}
                  destinations={destinationAirports}
                  fromDates={departureDates?.map((date) =>
                    moment(date, "YYYY-MM-DD").toDate()
                  )}
                  toDates={returnDates?.map((date) =>
                    moment(date, "YYYY-MM-DD").toDate()
                  )}
                  travelers={{
                    adults: +query.adults,
                    children: +query.children,
                    infants: +query.infants,
                  }}
                  type={tripType}
                  travelClass={currentTravelClass}
                  searchText="Modify Search"
                />
              </div>
            </motion.div>
          </div>
          <div className="w-full bg-gray">
            <div className="main-container py-3 md:py-4">
              <div className="flex flex-col-reverse md:flex-row items-center mb-3 justify-center md:justify-between mx-[-0.5rem] md:mx-auto">
                <div className="w-full flex items-center gap-3">
                  <div className="w-full md:w-fit py-5 px-3 md:p-0 bg-white rounded-none md:bg-transparent">
                    <div className="flex gap-2 md:gap-5 items-center justify-between mx-auto mb-3 md:mb-0">
                      <h5 className="text-base md:text-2xl text-center md:text-left font-bold leading-4 md:leading-8">
                        {totalFlights} Available Flights
                      </h5>
                      {availableFilters > 0 && (
                        <Button
                          onClick={() => resetFilter("all")}
                          size={"xs"}
                          className="font-medium"
                        >
                          Reset {availableFilters} filters
                        </Button>
                      )}
                    </div>
                    {isPhone && (
                      <div className={"flex"}>
                        <div
                          onClick={() => setAirlineDirection("left")}
                          className="h-[55px] w-[40px] flex items-center justify-center bg-primary cursor-pointer shadow-1 rounded-tl-lg rounded-bl-lg"
                        >
                          <BsCaretLeftFill className="text-[20px] md:text-[25px] text-white" />
                        </div>
                        <Marquee
                          pauseOnHover
                          className="flex-1"
                          speed={30}
                          direction={airlineDirection}
                        >
                          {airlines.map((ar, i) => (
                            <div
                              onClick={() =>
                                setUnsetAirline(ar.airline.iata_code)
                              }
                              className={cn(
                                "flex cursor-pointer px-3 gap-3 h-[55px] items-center justify-center bg-white border-y",
                                filters.filters?.airlines?.includes(
                                  ar.airline.iata_code
                                ) && "bg-primary text-white",
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
                          className="h-[55px] w-[40px] flex items-center justify-center bg-primary shadow-1 cursor-pointer rounded-tr-lg rounded-br-lg"
                        >
                          <BsCaretRightFill className="text-[20px] md:text-[25px] text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between md:flex-row gap-3">
                <FlightSearchLeft
                  className="hidden md:block"
                  open={filtersActive}
                  onOpenChange={setFiltersActive}
                  setFiltersActive={setFiltersActive}
                  setSortActive={setSortActive}
                />
                <FlightSearchRight
                  sortOpen={sortActive}
                  onSortOpenChange={setSortActive}
                  setFiltersActive={setFiltersActive}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {status === "loading" && (
        <div className="h-[calc(100vh-70px)] w-full flex items-center justify-center">
          <Head>
            <title>Search Flights - OTA</title>
          </Head>
          <Lottie
            animationData={lottieLoading}
            className="w-full h-full md:w-[80%] md:h-[80%]"
            loop={true}
          />
        </div>
      )}
    </>
  );
};

export default FlightSearch;
