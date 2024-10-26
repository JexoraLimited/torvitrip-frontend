import useSession from "@/hooks/useSession";
import { IFlight } from "@/types/common";
import { cn, getRefundableText } from "@/utils/common";
import { useWindowWidth } from "@react-hook/window-size";
import { motion } from "framer-motion";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { nunitoSans } from "../../../fonts/google";
import FlightDetails from "./FlightDetails";
import StoppageInfo from "./StoppageInfo";
interface IFlightCard {
  flight: IFlight;
  count: number;
  totalFlights: number;
  searchId?: string;
}

const FlightCard: FC<IFlightCard> = ({
  flight,
  count,
  totalFlights,
  searchId,
}) => {
  const [detailsActive, setDetailsActive] = useState(false);

  const router = useRouter();
  const session = useSession();

  const width = useWindowWidth();
  const isMobileOrTablet = width <= 768;
  const [shownItineraries, setShownItineraries] = useState(
    flight.itineraries.slice(0, 1)
  );
  const [allShown, setAllShown] = useState(
    shownItineraries.length === flight.itineraries.length
  );

  const switchShown = () => {
    if (!allShown) {
      setShownItineraries(flight.itineraries);
      setAllShown(true);
    } else {
      setShownItineraries(flight.itineraries.slice(0, 1));
      setAllShown(false);
    }
  };

  const getPrimaryAirline = (itinerary: any) => {
    let sortedAirlines;
    const airlinesUsed: {
      airline: {
        airline_name: string;
        callsign: string;
        country: string;
        iata_code: string;
        icao_code: string;
        logo: string;
      };
      count: number;
    }[] = [];
    itinerary.segments.forEach((sg: any) => {
      const existing = airlinesUsed.findIndex(
        (ar) => sg?.airline?.iata_code === ar?.airline?.iata_code
      );
      if (existing === -1) {
        airlinesUsed.push({ airline: sg.airline, count: 1 });
      } else {
        airlinesUsed[existing].count += 1;
      }
    });
    sortedAirlines = airlinesUsed.sort((a, b) => b.count - a.count);
    return sortedAirlines[0].airline;
  };
  const getDivider = (index: number) => {
    if (flight.itineraries.length > 1) {
      if (index !== 0 && index <= flight.itineraries.length) {
        return <div className="my-2 md:my-4 bg-gray-200 h-[3px] w-full"></div>;
      }
      return null;
    }
    return null;
  };
  return (
    <div
      style={nunitoSans.style}
      className={`w-full bg-white overflow-hidden rounded-lg`}
    >
      <div className="h-[35px] md:hidden bg-white border-b w-full flex items-center justify-between px-4 text-black">
        <h5 className="text-xs font-medium">
          {getRefundableText(flight.refundable)}
        </h5>
        <p className="text-center text-xs">
          {count} of {totalFlights} Available flights
        </p>
      </div>
      <div
        className={`w-full flex flex-col md:flex-row relative items-stretch`}
      >
        <div className="flex-1 md:px-4 py-2 md:py-4">
          {shownItineraries.map((it, i) => {
            const primaryAirline = getPrimaryAirline(it);
            return (
              <div className="w-full" key={i}>
                {getDivider(i)}
                <div
                  key={i}
                  className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-0 md:gap-3 relative`}
                >
                  {flight.itineraries.length > 1 && i === 0 && (
                    <div
                      onClick={switchShown}
                      className={cn(
                        "absolute right-3 lg:right-[-25px] 2xl:right-3 bottom-5 md:bottom-4 cursor-pointer flex items-center justify-center select-none flex-col gap-5 duration-300 text-gray-500",
                        allShown ? "rotate-180" : "rotate-0"
                      )}
                    >
                      <h5 className="rotate-90 text-xs font-medium">
                        {allShown ? "See less" : "See more"}
                      </h5>
                      <MdKeyboardDoubleArrowDown className="text-gray-500 text-xl" />
                    </div>
                  )}
                  {/* it's only for desktop */}
                  <div className="hidden flex-col px-0 items-center justify-center md:block w-[40px] md:w-full md:max-w-[20%] md:gap-3 md:mb-0 mx-5 md:mx-0">
                    <div className="relative md:mx-auto w-[40px] h-[40px] md:w-[100px] md:h-[100px]">
                      <Image
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                        src={primaryAirline.logo}
                        alt={primaryAirline.iata_code}
                        fill
                      />
                    </div>
                    <span className="text-md text-gray-600 md:mt-3 text-center hidden md:block">
                      {primaryAirline.airline_name}
                    </span>
                    <span className="text-sm md:mt-3 text-center block md:hidden">
                      {primaryAirline.iata_code}
                    </span>
                  </div>

                  {/* it's for mobile */}
                  <div className="flex md:hidden items-center px-5 gap-6 w-full">
                    <div className="flex-col px-0 items-center justify-center w-[40px]">
                      <div className="relative md:mx-auto w-[40px] h-[40px] md:w-[100px] md:h-[100px]">
                        <Image
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                          src={primaryAirline.logo}
                          alt={primaryAirline.iata_code}
                          fill
                        />
                      </div>
                      <span className="text-sm md:mt-3 text-center block md:hidden">
                        {primaryAirline.iata_code}
                      </span>
                    </div>
                    <StoppageInfo
                      className="md:hidden block flex-1"
                      itinerary={it}
                    />
                  </div>
                  <div className="w-full md:w-auto px-5 md:px-0 md:flex-grow md:ml-5">
                    {!isMobileOrTablet && (
                      <StoppageInfo
                        itinerary={it}
                        className="md:block hidden"
                      />
                    )}
                    <div className="w-full flex items-start flex-col md:flex-row md:gap-3">
                      <div className="flex-1 w-full md:w-auto space-y-[3px]">
                        <div className="w-full md:w-auto">
                          <h4 className="text-[14px] text-center md:text-left lg:text-[16px] font-bold text-gray-500 tracking-wider">
                            Departure
                          </h4>
                        </div>
                        <h3 className="w-[90%] text-ellipsis whitespace-nowrap overflow-hidden text-sm md:text-md font-bold tracking-wide">
                          <span>{it.segments[0].departure.iataCode} - </span>
                          <span>{it.segments[0].departure.airport.city}</span>
                        </h3>
                        <div className="w-full">
                          <span className="text-xs text-gray-700 md:w-[90%] block">
                            {it.segments[0].departure.airport.airport_name}
                          </span>
                        </div>
                        <div className="flex items-center gap-5">
                          <span className="font-semibold text-gray-500 text-sm md:text-base">
                            {moment(it.segments[0].departure.at).format(
                              "h:mm A"
                            )}
                          </span>
                          <span className="text-xs text-gray-500 font-normal">
                            {isMobileOrTablet
                              ? moment(it.segments[0].departure.at).format(
                                  "dddd, DD MMM YYYY"
                                )
                              : moment(it.segments[0].departure.at).format(
                                  "ddd, DD MMM YYYY"
                                )}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 w-full md:w-auto space-y-[3px]">
                        <div className="w-full md:w-auto">
                          <h4 className="text-[14px] text-center md:text-left lg:text-[16px] font-bold text-gray-500 tracking-wider">
                            Arrival
                          </h4>
                        </div>
                        <h3 className="w-[90%] text-ellipsis whitespace-nowrap overflow-hidden text-sm md:text-md font-bold tracking-wide">
                          <span>
                            {
                              it.segments[it.segments.length - 1].arrival
                                .iataCode
                            }{" "}
                            -{" "}
                          </span>
                          <span>
                            {
                              it.segments[it.segments.length - 1].arrival
                                .airport.city
                            }
                          </span>
                        </h3>
                        <div className="w-full">
                          <span className="text-xs text-gray-700 md:w-[90%] block">
                            {
                              it.segments[it.segments.length - 1].arrival
                                .airport.airport_name
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-5">
                          <span className="font-semibold text-gray-500 text-sm md:text-base">
                            {moment(it.segments[0].arrival.at).format("h:mm A")}
                          </span>
                          <span className="text-xs text-gray-500 font-normal">
                            {isMobileOrTablet
                              ? moment(it.segments[0].arrival.at).format(
                                  "dddd, DD MMM YYYY"
                                )
                              : moment(it.segments[0].arrival.at).format(
                                  "ddd, DD MMM YYYY"
                                )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={cn(
            "flex right-0 bg-white w-full md:max-w-[170px] flex-col md:flex-grow relative items-stretch font-nunito-sans"
          )}
        >
          <div className="flex items-center justify-end flex-col md:gap-3 text-right flex-1 md:border-l-2">
            <div className="h-[30px] hidden bg-white w-full md:flex items-center justify-center text-black">
              <h5 className="text-sm font-medium">
                {getRefundableText(flight.refundable)}
              </h5>
            </div>
            <div className="flex-1 items-center md:items-end justify-end md:mb-3 w-full flex flex-row md:flex-col px-4 pt-1 pb-3 md:pt-1 md:pb-1 md:p-4 gap-5 md:gap-0 relative">
              <div className="absolute top-0 hidden md:block right-0 w-full">
                <p className="text-center text-xs">
                  {count} of {totalFlights} Available flights
                </p>
              </div>
              <div className="space-x-1">
                <del className="text-xs md:text-[11px] text-primary">
                  {Math.round(flight.price * 1.2).toLocaleString("en-US", {
                    style: "currency",
                    currency: flight.currency,
                    maximumFractionDigits: 0,
                    currencyDisplay: "code",
                  })}
                </del>
                <span className="text-sm font-medium text-primary">
                  10% off
                </span>
              </div>
              <h3 className="text-base md:text-xl font-semibold text-gray-700">
                {Math.round(flight.price).toLocaleString("en-US", {
                  style: "currency",
                  currency: flight.currency,
                  maximumFractionDigits: 0,
                  currencyDisplay: "code",
                })}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className={"bg-white font-nunito-sans"}>
        <div
          className={
            "w-full flex select-none items-center justify-end gap-3 border-t-2 px-3 py-3"
          }
        >
          <div
            onClick={() => setDetailsActive((active) => !active)}
            className="flex-1 md:flex-none cursor-pointer py-2.5 md:py-1 md:px-6 flex bg-secondary text-white items-center justify-center font-bold text-sm md:text-base gap-1.5 md:gap-3 rounded-lg"
          >
            <h4>Flight Details</h4>{" "}
            <FaAngleDown
              className={cn("duration-300", detailsActive && "rotate-180")}
            />
          </div>
          <a
            href={`/flight-booking?searchId=${searchId}&flightCode=${flight.code}`}
            onClick={(e) => {
              if (!session.authenticated) {
                e.preventDefault();
                router.push("/auth/signin");
              }
            }}
            target="_blank"
            rel="noreferrer noopener"
            className="flex-1 md:flex-none cursor-pointer py-2.5 md:py-1 md:px-10 flex bg-primary text-white items-center justify-center font-bold text-sm md:text-base gap-1.5 md:gap-3 rounded-lg"
          >
            <h4>Book Now</h4>
          </a>
        </div>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: detailsActive ? "auto" : 0 }}
        >
          <FlightDetails flight={flight} />
        </motion.div>
      </div>
    </div>
  );
};

export default FlightCard;
