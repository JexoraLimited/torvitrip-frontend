import { DUMMY_FLIGHT } from "@/data/flight";
import { murecho } from "@/fonts/google";
import { cn } from "@/utils/common";
import { FaArrowLeft } from "react-icons/fa";
import FlightCard from "../../FlightSearch/FlightCard";

const ReviewAndPayment = () => {
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden flex">
      <div className="flex-1 text-lg relative pb-[64px] h-[calc(100vh_-_250px)] overflow-y-auto grayScrollBar border-l border-border">
        <div className="p-4 border-b w-full flex items-center gap-3 bg-slate-100 text-lg border-gray">
          <FaArrowLeft className="text-slate-600 text-lg" />
          <h5 className="font-semibold">Add-On Services</h5>
        </div>
        <div className="w-full p-5">
          <FlightCard flight={DUMMY_FLIGHT} count={1} totalFlights={10} />
          <div
            className={cn(
              "w-full rounded-lg flex mt-5 overflow-hidden border border-border divide-x divide-border",
              murecho.className
            )}
          >
            <div className={"flex-1 bg-slate-100 p-4 flex flex-col gap-y-3"}>
              <h5 className="font-semibold">John Doe</h5>
              <div className="flex items-center gap-4">
                <span className="text-gray-800 text-xs">Date of Birth</span>
                <span className="text-black font-medium text-xs">
                  07 Dec, 2011
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-800 text-xs">Gender</span>
                <span className="text-black font-medium text-xs">Male</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-800 text-xs">Nationality</span>
                <span className="text-black font-medium text-xs">BD</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-800 text-xs">Phone No.</span>
                <span className="text-black font-medium text-xs">
                  01936900932
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-800 text-xs">Freq. Flyer No.</span>
                <span className="text-black font-medium text-xs">-</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-800 text-xs">Passport</span>
                <span className="text-black font-medium text-xs">
                  Not Taken
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-800 text-xs">VISA</span>
                <span className="text-black font-medium text-xs">
                  Not Taken
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-800 text-xs">Meal Type</span>
                <span className="text-black font-medium text-xs">-</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-800 text-xs">Wheel Chair</span>
                <span className="text-black font-medium text-xs">-</span>
              </div>
            </div>
            <div className={"flex-1 bg-slate-50 p-4 flex flex-col gap-y-5"}>
              <h5 className="font-semibold">Addons</h5>
              <div className="flex flex-col items-start justify-center gap-1">
                <span className="text-gray-800 text-xs">
                  Baggage Protection
                </span>
                <span className="text-black font-medium text-xs">
                  Blue Ribbon Bags
                </span>
              </div>
              <div className="flex flex-col items-start justify-center gap-1">
                <span className="text-gray-800 text-xs">
                  Ancillary Services
                </span>
                <span className="text-black font-medium text-xs">
                  Not taken
                </span>
              </div>
              <div className="flex flex-col items-start justify-center gap-1">
                <span className="text-gray-800 text-xs">Travel Insurance</span>
                <span className="text-black font-medium text-xs">
                  Not taken
                </span>
              </div>
              <div className="flex flex-col items-start justify-center gap-1">
                <span className="text-gray-800 text-xs">Covid-19 Test</span>
                <span className="text-black font-medium text-xs">
                  Not taken
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndPayment;
