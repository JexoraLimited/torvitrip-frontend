import { cn } from "@/utils/common";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Ancillaries from "./Ancillaries";
import BookingDetails from "./BookingDetails";
import TravelInsurance from "./TravelInsurance";

const TABS = [
  {
    title: "Booking details",
    id: 1,
    element: <BookingDetails />,
  },
  {
    title: "Travel Insurance",
    id: 2,
    element: <TravelInsurance />,
  },
  {
    title: "Extra Baggages",
    id: 3,
    element: <Ancillaries />,
  },
];

const AddOnServices = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden flex">
      <div className="w-[300px] h-full bg-primary/10">
        <div className="p-4 flex items-center justify-between bg-slate-100 border-b text-lg border-gray">
          <div className="flex items-center gap-3">
            <FaArrowLeft className="text-slate-600 text-lg" />
            <h5 className="font-semibold">Add-On Services</h5>
          </div>
          <h5 className="font-semibold text-slate-600">Skip</h5>
        </div>
        {TABS.map((tab) => (
          <div
            onClick={() => setActiveTab(tab)}
            key={tab.id}
            className={cn(
              "w-full py-3 px-4 cursor-pointer duration-300 flex items-center gap-3 bg-white relative overflow-hidden",
              activeTab.id === tab.id && "bg-slate-200"
            )}
          >
            <span className="w-[20px] text-sm h-[20px] font-medium rounded-full flex items-center justify-center bg-secondary text-white">
              {tab.id}
            </span>
            <h5>{tab.title}</h5>
            {tab.id === activeTab.id && (
              <div className="w-[3px] absolute left-0 top-0 h-full rounded-tr-lg rounded-br-lg bg-secondary"></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex-1 relative pb-[64px] h-[calc(100vh_-_250px)] overflow-y-auto grayScrollBar border-l border-border">
        {activeTab.element}
      </div>
    </div>
  );
};

export default AddOnServices;
