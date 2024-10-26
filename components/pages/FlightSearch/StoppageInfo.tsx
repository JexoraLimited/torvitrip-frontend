import { IItinerary } from "@/types/common";
import { cn } from "@/utils/common";
import { useWindowWidth } from "@react-hook/window-size";
import moment from "moment";
import { HTMLAttributes } from "react";
import { GiCommercialAirplane } from "react-icons/gi";
import styles from "./FlightCard.module.css";

interface IStoppageInfo extends HTMLAttributes<HTMLDivElement> {
  itinerary: IItinerary;
}
const StoppageInfo: React.FC<IStoppageInfo> = ({
  itinerary,
  className,
  ...props
}) => {
  const width = useWindowWidth();
  const getStoppageInfo = (itinerary: IItinerary) => {
    const segments = itinerary.segments;
    const stops = [];
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      if (segments[i - 1]) {
        const lastArrivalAt = segments[i - 1].arrival.at;
        const flightAt = segment.departure.at;
        const difference = moment.duration(
          moment(flightAt).diff(lastArrivalAt)
        );
        const hours = difference.days() + difference.hours();
        const minutes = difference.minutes();
        const durationStr = `${hours ? `${hours}h ` : ""}${
          minutes ? `${minutes}m` : ""
        }`;
        stops.push({
          duration: durationStr,
          airport: segment.departure.airport,
        });
      }
    }
    return stops;
  };

  const isMobileOrTablet = width <= 768;

  const stoppages = getStoppageInfo(itinerary);
  const getDuration = (duration: string) => {
    const durationInst = moment.duration(duration);
    const hours = durationInst.hours() + durationInst.days() * 24;
    const minutes = durationInst.minutes();
    const durationStringDesktop = `${hours ? `${hours} hours` : ""}${
      minutes ? ` ${minutes} minutes` : ""
    }`;
    const durationStringMobile = `${hours ? `${hours} h` : ""}${
      minutes ? ` ${minutes} m` : ""
    }`;
    return isMobileOrTablet ? durationStringMobile : durationStringDesktop;
  };
  return (
    <div {...props} className={cn(styles.stoppageInfoContainer, className)}>
      <div
        className={`w-full flex items-center justify-around md:justify-center gap-5 md:gap-10`}
      >
        <div>
          <GiCommercialAirplane className="rotate-45 mx-auto text-[20px] md:text-[30px] text-secondary" />
        </div>
        <h5 className="text-center font-bold text-xs md:text-sm">
          {stoppages.length ? `${stoppages.length} stops` : "Non Stop"}
        </h5>
        <h5 className="text-[12px] md:text-sm text-center text-gray-600">
          {getDuration(itinerary.flightDuration)}
        </h5>
      </div>
      <div className="relative w-full h-[2px] md:h-[3px] bg-slate-300 my-2 mx-auto">
        <div className={styles.stoppagePoints}>
          {stoppages.map((s, i) => (
            <div
              className="w-[13px] h-[13px] border-[2px] md:border-[3px] border-secondary bg-white rounded-full"
              key={i}
            ></div>
          ))}
        </div>
        {stoppages.length ? (
          <div
            className={cn(
              styles.stoppageDetailsTooltip,
              "bg-primary text-white rounded-lg"
            )}
          >
            {stoppages.map((s, i) => (
              <h5 className="text-sm" key={i}>
                {s.duration} layover at {s.airport.city} ({s.airport.iata_code})
              </h5>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StoppageInfo;
