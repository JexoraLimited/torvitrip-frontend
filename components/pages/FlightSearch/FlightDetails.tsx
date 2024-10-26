import { IFlight } from "@/types/common";
import { cn, formatDurationFromIso } from "@/utils/common";
import moment from "moment";
import Image from "next/image";
import { FC, useMemo, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdAirplanemodeActive } from "react-icons/md";
import { Button } from "../../ui/Button";
interface IFlightDetails {
  flight: IFlight;
}
const FlightDetails: FC<IFlightDetails> = ({ flight }) => {
  const [detailsInfoTab, setDetailsInfoTab] = useState<"policy" | "baggage">(
    "policy"
  );
  const [selectedItinerary, setSelectedItinerary] = useState(
    flight.itineraries[0].code
  );

  const itinerary = useMemo(
    () => flight.itineraries.find((it) => it.code === selectedItinerary),
    [selectedItinerary]
  );

  const departureSegment = itinerary?.segments[0];
  return (
    <div className="flex font-roboto items-stretch flex-col md:flex-row justify-between gap-1 p-2">
      <div className="bg-white w-full flex-1 rounded-lg px-2 py-3 md:px-4 md:py-4 flex flex-col">
        <div className="w-full">
          <div className="flex w-full h-[40px] mb-3 rounded-lg overflow-hidden">
            {flight.itineraries.map((it) => {
              const firstSegment = it.segments[0];
              const lastSegment = it.segments[it.segments.length - 1];
              const fromTo = `${firstSegment.departure.airport.iata_code}-${lastSegment.arrival.airport.iata_code}`;
              return (
                <div
                  key={it.code}
                  onClick={() => setSelectedItinerary(it.code)}
                  className={cn(
                    "flex-1 h-full flex items-center justify-between cursor-pointer px-4 py-2 text-[10px] md:text-sm",
                    selectedItinerary === it.code
                      ? "bg-primary text-white"
                      : "bg-slate-200 text-black"
                  )}
                >
                  <h5 className="font-semibold">{fromTo}</h5>
                  <h5 className="font-semibold">
                    {formatDurationFromIso(it.flightDuration)}
                  </h5>
                </div>
              );
            })}
          </div>
          <div className="flex items-center md:gap-[10px]">
            <div className="w-[30px] min-w-[30px] md:w-[35px] md:min-w-[35px]">
              <FaLocationDot className="text-gray-text block mx-auto" />
            </div>
            <div className="bg-primary/5 flex flex-1 flex-col md:flex-row rounded-lg md:items-center justify-between p-2 md:py-[10px] md:px-4">
              <h5 className="text-[12px] font-medium">
                Departure From {departureSegment?.departure.airport.city},{" "}
                {departureSegment?.departure.airport.country}
              </h5>
              <h5 className="text-[12px] font-normal md:max-w-[280px] md:overflow-hidden md:whitespace-nowrap md:text-ellipsis">
                <span className="font-medium">
                  Terminal {departureSegment?.departure.terminal} :{" "}
                </span>
                <span>{departureSegment?.departure.airport.airport_name}</span>
              </h5>
            </div>
          </div>
          {itinerary?.segments.map((sg, i) => {
            let segmentType: "destination" | "layover" = "destination";
            if (i + 1 === itinerary.segments.length) {
              segmentType = "destination";
            } else if (i + 1 < itinerary.segments.length) {
              segmentType = "layover";
            }
            let durationStr = "";
            if (segmentType === "layover") {
              const arrivalAt = sg?.arrival?.at;
              const nextFlightAt = itinerary.segments?.[i + 1]?.departure.at;
              const difference = moment.duration(
                moment(nextFlightAt).diff(arrivalAt)
              );
              const hours = difference.days() + difference.hours();
              const minutes = difference.minutes();
              durationStr = `${hours ? `${hours}h ` : ""}${
                minutes ? `${minutes}m` : ""
              }`;
            }
            return (
              <>
                <div className="flex items-center gap-[10px] md:mt-4 mt-2">
                  <div className="w-[32px] min-w-[32px] md:w-[35px] md:min-w-[35px]">
                    <Image
                      src={sg.airline.logo}
                      alt={sg.airline.iata_code}
                      style={{
                        objectFit: "contain",
                      }}
                      className="mx-auto"
                      width={48}
                      height={48}
                      quality={100}
                    />
                  </div>
                  <div className="flex items-center flex-1">
                    <div className="flex-1">
                      <h5 className="text-[15px] font-semibold">
                        {sg.departure.airport.iata_code}-
                        {sg.arrival.airport.iata_code}
                      </h5>
                      <p className="text-[12px] font-regular">
                        {formatDurationFromIso(sg.duration)}
                      </p>
                    </div>
                    <div className="flex-1 text-center">
                      <h5 className="text-[15px] font-semibold">
                        {moment(sg.departure.at).format("h:mm A")}
                      </h5>
                      <p className="text-[12px] hidden md:block font-regular">
                        {moment(sg.departure.at).format("D MMM, dddd")}
                      </p>
                      <p className="text-[12px] block md:hidden font-regular">
                        {moment(sg.departure.at).format("DD-MM-YYYY")}
                      </p>
                    </div>
                    <div className="flex-1 text-right">
                      <h5 className="text-[15px] font-semibold">
                        {moment(sg.arrival.at).format("h:mm A")}
                      </h5>
                      <p className="text-[12px] hidden md:block font-regular">
                        {moment(sg.arrival.at).format("D MMM, dddd")}
                      </p>
                      <p className="text-[12px] block md:hidden font-regular">
                        {moment(sg.arrival.at).format("DD-MM-YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-[10px]">
                  <div className="flex flex-col items-center w-[30px] min-w-[30px] md:w-[35px] md:min-w-[35px] gap-1 h-[65px]">
                    <div className="w-[2px] h-full bg-gray-foreground"></div>
                    <div className="rotate-180">
                      <MdAirplanemodeActive className="text-gray-text" />
                    </div>
                    <div className="w-[2px] h-full bg-gray-foreground"></div>
                  </div>
                  <div className="flex items-center w-full justify-between">
                    <div className="space-y-[2px]">
                      <h5 className="text-[12px]">{sg.airline.airline_name}</h5>
                      <p className="text-[12px] font-regular">
                        {sg.aircraft?.aircraft_name ||
                          "Aircraft Name Unavailable"}
                      </p>
                    </div>
                    <div className="text-right space-y-[2px]">
                      <h5 className="text-[12px] font-regular">
                        Flight no :{" "}
                        <span className="font-medium">{sg.number}</span>
                      </h5>
                      <p className="text-[12px] font-regular">
                        Class :{" "}
                        <span className="font-medium">
                          {sg.cabin}-{sg.class}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center md:gap-[10px]">
                  <div className="w-[30px] min-w-[30px] md:w-[35px] md:min-w-[35px]">
                    <FaLocationDot className="text-gray-text block mx-auto" />
                  </div>
                  <div className="bg-primary/5 flex flex-1 flex-col md:flex-row rounded-lg md:items-center justify-between p-2 md:py-[10px] md:px-4">
                    <h5 className="text-[12px] font-medium">
                      {segmentType === "destination" &&
                        `Destination at ${sg.arrival.airport.city}, ${sg.arrival.airport.country}`}
                      {segmentType === "layover" &&
                        `Layover at ${sg.arrival.airport.city}, ${sg.arrival.airport.country} : ${durationStr}`}
                    </h5>
                    <h5 className="text-[12px] font-normal md:max-w-[280px] md:overflow-hidden md:whitespace-nowrap md:text-ellipsis">
                      {segmentType === "destination" && (
                        <span className="font-medium">
                          Terminal {sg.arrival.terminal} :{" "}
                        </span>
                      )}
                      <span>{sg.arrival.airport.airport_name}</span>
                    </h5>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="bg-white flex-1 w-full md:w-[35%] md:max-w-[35%] rounded-lg px-2 py-3 md:px-4 md:py-4 font-nunito-sans">
        <div className="flex gap-[2px] rounded-md overflow-hidden">
          <div
            onClick={() => setDetailsInfoTab("baggage")}
            className={cn(
              "flex items-center cursor-pointer justify-center text-[12px] font-bold flex-1 h-[36px] tracking-[0.3px]",
              detailsInfoTab === "baggage"
                ? "text-white bg-primary"
                : "bg-slate-200 text-black"
            )}
          >
            <span>Baggage</span>
          </div>
          <div
            onClick={() => setDetailsInfoTab("policy")}
            className={cn(
              "flex items-center cursor-pointer justify-center text-[12px] font-bold flex-1 h-[36px] tracking-[0.3px]",
              detailsInfoTab === "policy"
                ? "text-white bg-primary"
                : "bg-slate-200 text-black"
            )}
          >
            <h5>Policy</h5>
          </div>
        </div>
        {detailsInfoTab === "baggage" && (
          <div className="flex flex-col py-4">
            {flight.baggage.map((baggage, i) => (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h6 className="text-xs font-semibold">{baggage.segment}</h6>
                    <p className="text-xs font-normal">{baggage.cabin}</p>
                  </div>
                  <div>
                    <p className="text-xs font-normal text-right">Baggage</p>
                    <h6 className="text-xs font-semibold">
                      {baggage.type === "quantity" &&
                        `${baggage.quantity} ${
                          (baggage.quantity || 0) > 1 ? "Pieces" : "Piece"
                        } / person`}

                      {baggage.type === "weight" &&
                        `${baggage.weight} ${baggage.unit} / person`}
                    </h6>
                  </div>
                </div>
                {i + 1 < flight.baggage.length && (
                  <div className="w-full h-[1px] bg-slate-300 my-3"></div>
                )}
              </>
            ))}
          </div>
        )}
        {detailsInfoTab === "policy" && (
          <div className="w-full overflow-hidden pt-4">
            <div className="text-[#5a6573] space-y-[6px] text-[12px] font-normal">
              {(flight.refundable === "refundable" ||
                flight.refundable === "partially-refundable" ||
                flight.changeable) && (
                <p>
                  Refunds and Date Changes are done as per the following
                  policies.
                </p>
              )}
              {(flight.refundable === "refundable" ||
                flight.refundable === "partially-refundable") && (
                <p>
                  <span className="text-black font-medium">Refund Amount</span>
                  <br />
                  Paid Amount – (Airline’s Cancellation Fee* + FGTL Service Fee)
                </p>
              )}
              {flight.changeable && (
                <p>
                  <span className="text-black font-medium">
                    Date Change Amount
                  </span>
                  <br />
                  Airline’s Date Change Fee* + Fare Difference + FGTL Service
                  Fee
                </p>
              )}
              <p>
                <span className="text-black font-medium">
                  *Fees are shown for all traveler
                </span>
              </p>
              <p>
                <span className="text-[10px]">
                  *FGTL Convenience fee is non-refundable. We can not guarantee
                  the accuracy of airline refund/date change fees as they are
                  subject to change without prior notice.
                </span>
              </p>
              <Button
                className={
                  "text-[12px] text-secondary hover:text-secondary p-0"
                }
                variant={"ghost"}
              >
                See More Information
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightDetails;
