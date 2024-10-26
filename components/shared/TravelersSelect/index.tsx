import Colors from "@/constants/Colors";
import { TRAVEL_CLASSES_WITH_LABEL, TravelerType } from "@/data/flight";
import { murecho, nunitoSans, poppins } from "@/fonts/google";
import { ISelectValue } from "@/types/common";
import { cn } from "@/utils/common";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface Travelers {
  adults: number;
  children: number;
  infants: number;
}

interface ITravelersSelect {
  adults: number;
  childrens: number;
  infants: number;
  travelClass: ISelectValue;
  onTravelersChange?: ({ adults, children, infants }: Travelers) => void;
  onTravelClassChange?: (travelClass: ISelectValue) => void;
}
const TravelersSelect: React.FC<ITravelersSelect> = ({
  adults,
  childrens,
  infants,
  travelClass,
  onTravelersChange,
  onTravelClassChange,
}) => {
  const [travelers, setTravelers] = useState({
    adults,
    children: childrens,
    infants,
  });
  const [_travelClass, _setTravelClass] = useState(travelClass);
  const handleIncrementDecrement = (
    action: "increment" | "decrement",
    value: number
  ) => {
    if (action === "increment" && value < 9) {
      return value + 1;
    } else if (action === "decrement" && value > 1) {
      return value - 1;
    }
    return value;
  };
  const handleTravelersChange = (
    type: TravelerType,
    action: "increment" | "decrement"
  ) => {
    let typeKey = "adults";
    switch (type) {
      case "ADULT":
        typeKey = "adults";
        break;
      case "CHILD":
        typeKey = "children";
        break;
      case "SEATED_INFANT":
        typeKey = "infants";
        break;
      default:
        break;
    }
    setTravelers((t) => {
      const travelersObj = {
        ...t,
        [typeKey]: handleIncrementDecrement(
          action,
          travelers[typeKey as keyof Travelers]
        ),
      };
      onTravelersChange && onTravelersChange(travelersObj);
      return travelersObj;
    });
  };
  return (
    <div className={cn("p-4 relative !z-[9999] bg-white", poppins.className)}>
      <div>
        <h3 className="text-secondary font-bold text-lg text-center">Class</h3>
        <div className="flex items-center justify-start gap-x-5 gap-y-2 flex-wrap">
          {TRAVEL_CLASSES_WITH_LABEL.map((tc) => (
            <div
              onClick={() => {
                _setTravelClass(tc);
                onTravelClassChange && onTravelClassChange(tc);
              }}
              key={tc.value}
              className={`flex items-center cursor-pointer justify-center gap-2`}
            >
              <div
                style={{
                  border:
                    tc.value === travelClass.value
                      ? `4px solid ${Colors.primary}`
                      : "1px solid gray",
                }}
                className="h-[16px] w-[16px] bg-white rounded-full"
              ></div>
              <span
                className={`${nunitoSans.className} font-[700] text-[#7c8db0]`}
              >
                {tc.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          height: "2px",
          width: "100%",
          display: "block",
          margin: "15px 0",
          background: "lightgray",
        }}
      ></div>
      <div>
        <h3 className="text-secondary font-bold text-lg text-center">
          Travelers
        </h3>
        <div className="mt-0">
          <div
            style={nunitoSans.style}
            className="flex items-center justify-between"
          >
            <div>
              <h3 className="text-gray-600 text-[18px]">Adults</h3>
              <small
                className={cn(
                  "text-[16px] font-bold text-black leading-3",
                  murecho.className
                )}
              >
                12+ years
              </small>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div
                onClick={() => handleTravelersChange("ADULT", "decrement")}
                className="h-[32px] rounded-md w-[32px] bg-white shadow-1 flex items-center justify-center"
              >
                <AiOutlineMinus className="text-primary" />
              </div>
              <div className="cursor-text">
                <h4 className="font-bold text-secondary">{travelers.adults}</h4>
              </div>
              <div
                onClick={() => handleTravelersChange("ADULT", "increment")}
                className="h-[32px] rounded-md w-[32px] bg-white shadow-1 flex items-center justify-center"
              >
                <AiOutlinePlus className="text-primary" />
              </div>
            </div>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <div>
              <h3 className="text-gray-600 text-[18px]">Children</h3>
              <small
                className={cn(
                  "text-[16px] font-bold text-black leading-3",
                  murecho.className
                )}
              >
                2-12 years
              </small>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div
                onClick={() => handleTravelersChange("CHILD", "decrement")}
                className="h-[32px] rounded-md w-[32px] bg-white shadow-1 flex items-center justify-center"
              >
                <AiOutlineMinus className="text-primary" />
              </div>
              <div className="cursor-text">
                <h4 className="font-bold text-secondary">
                  {travelers.children}
                </h4>
              </div>
              <div
                onClick={() => handleTravelersChange("CHILD", "increment")}
                className="h-[32px] rounded-md w-[32px] bg-white shadow-1 flex items-center justify-center"
              >
                <AiOutlinePlus className="text-primary" />
              </div>
            </div>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <div>
              <h3 className="text-gray-600 text-[18px]">Infants</h3>
              <small
                className={cn(
                  "text-[16px] font-bold text-black leading-3",
                  murecho.className
                )}
              >
                Below 2 years
              </small>
            </div>
            <div className="flex items-center rounded-md justify-between gap-3">
              <div
                onClick={() =>
                  handleTravelersChange("SEATED_INFANT", "decrement")
                }
                className="h-[32px] w-[32px] bg-white shadow-1 rounded-md flex items-center justify-center"
              >
                <AiOutlineMinus className="text-primary" />
              </div>
              <div className="cursor-text">
                <h4 className="font-bold text-secondary">
                  {travelers.infants}
                </h4>
              </div>
              <div
                onClick={() =>
                  handleTravelersChange("SEATED_INFANT", "increment")
                }
                className="h-[32px] w-[32px] rounded-md bg-white shadow-1 flex items-center justify-center"
              >
                <AiOutlinePlus className="text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelersSelect;
