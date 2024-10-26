import { cn } from "@/utils/common";
import { useWindowWidth } from "@react-hook/window-size";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import holiday from "../../../assets/images/icons/beach.png";
import hotel from "../../../assets/images/icons/hotel.png";
import flight from "../../../assets/images/icons/plane.png";
import { murecho } from "../../../fonts/google";
import SearchFlight from "../SearchFlight";

const TABS = [
  {
    id: "flight",
    count: 1,
    image: {
      src: flight,
      alt: "Flight",
    },
    label: "Flight",
    component: <SearchFlight />,
  },
  {
    id: "hotel",
    count: 2,
    image: {
      src: hotel,
      alt: "Hotel",
    },
    label: "Hotel",
    component: (
      <div className="h-full mt-3 w-full text-center">
        <h3 className="text-3xl">Hotel Booking Is Under Construction</h3>
      </div>
    ),
  },
  {
    id: "tour",
    count: 3,
    image: {
      src: holiday,
      alt: "Holiday",
    },
    label: "Holiday",
    component: (
      <div className="h-full mt-3 w-full text-center">
        <h3 className="text-3xl">Holiday Booking Is Under Construction</h3>
      </div>
    ),
  },
  // {
  //   id: "visa",
  //   count: 4,
  //   image: {
  //     src: visa,
  //     alt: "Visa",
  //   },
  //   label: "Visa",
  //   component: (
  //     <div className="h-full mt-3 w-full text-center">
  //       <h3 className="text-3xl">Visa Booking Is Under Construction</h3>
  //     </div>
  //   ),
  // },
  // {
  //   id: 2,
  //   image: {
  //     src: bus,
  //     alt: "Bus",
  //   },
  //   label: "Bus",
  //   component: (
  //     <div className="h-full mt-3 w-full text-center">
  //       <h3 className="text-3xl">Bus Booking Is Under Construction</h3>
  //     </div>
  //   ),
  // },
  // {
  //   id: 3,
  //   image: {
  //     src: train,
  //     alt: "Train",
  //   },
  //   label: "Train",
  //   component: (
  //     <div className="h-full mt-3 w-full text-center">
  //       <h3 className="text-3xl">Train Booking Is Under Construction</h3>
  //     </div>
  //   ),
  // },
];

export type TabTypes = "flight" | "hotel" | "tour" | "visa";
interface ISearchNew {
  style?: React.CSSProperties;
  type?: TabTypes;
}

const SearchNew: React.FC<ISearchNew> = ({ style, type }) => {
  const getInitialActiveTab = useCallback(() => {
    const tab = TABS.find((tab) => tab.id === type);
    return tab || TABS[0];
  }, [type]);

  const [activeTab, setActiveTab] = useState(getInitialActiveTab());
  const width = useWindowWidth();

  useEffect(() => {
    setActiveTab(getInitialActiveTab());
  }, [getInitialActiveTab]);

  const getLeft = () => {
    const w = width < 1024 ? 65 : 120;
    return `${(activeTab.count - 1) * w}px`;
  };
  return (
    <div
      style={style}
      className="bg-white lg:mt-0 mt-12 w-full shadow-1 rounded-lg"
    >
      <div className="w-full flex items-center !px-4 justify-center">
        <div
          className="mt-[-35px] bg-white rounded-lg shadow-[rgba(104,111,119,0.11)_0px_2px_12px] lg:shadow-none lg:mx-0 lg:mt-[0px] w-full max-w-full text-[14px] text-[#1A2B3D] font-normal px-[5px] lg:px-[32px]"
          style={murecho.style}
        >
          <div className="flex items-center justify-center lg:justify-start">
            <ScrollMenu
              wrapperClassName="max-w-full"
              // LeftArrow={ArrowLeft}
              // RightArrow={ArrowRight}
              scrollContainerClassName="relative no-scrollbar px-1"
              itemClassName="flex"
            >
              <>
                {TABS.sort((tab) => tab.count).map((tab) => (
                  <div
                    onClick={() => setActiveTab(tab)}
                    key={tab.id}
                    itemID={String(tab.id)}
                    className="flex flex-col lg:flex-row w-[65px] lg:w-[120px] cursor-pointer items-center justify-center gap-1 lg:gap-[12px] h-[64px] px-1 lg:px-4"
                  >
                    <Image
                      src={tab.image.src}
                      className={`${
                        activeTab.id === tab.id ? "saturate-100" : "saturate-0"
                      } duration-300`}
                      style={{ width: "20px", height: "20px" }}
                      alt={tab.image.alt}
                    />
                    <span
                      className={cn(
                        "text-[12px] lg:text-[16px] font-semibold lg:font-bold",
                        murecho.className
                      )}
                    >
                      {tab.label}
                    </span>
                  </div>
                ))}
                <motion.div
                  animate={{ x: getLeft() }}
                  className="absolute h-[2px] lg:h-[3px] bg-primary bottom-0 rounded-tl-md rounded-tr-md w-[65px] lg:w-[120px]"
                ></motion.div>
              </>
            </ScrollMenu>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <hr />
      </div>
      <div className="w-full h-full p-4 lg:p-[32px]">{activeTab.component}</div>
    </div>
  );
};

export default SearchNew;
