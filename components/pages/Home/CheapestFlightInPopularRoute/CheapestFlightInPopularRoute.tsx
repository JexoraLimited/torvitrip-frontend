import SectionHeading from "@/components/shared/SectionHeading";
import { cn } from "@/utils/common";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import { GiCommercialAirplane } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";
import Colors from "../../../../constants/Colors";
import { searchForData } from "../../../../data/cheapestFlight";

interface ICheapestFlightInPopularRoute
  extends HTMLAttributes<HTMLDivElement> {}

const CheapestFlightInPopularRoute: FC<ICheapestFlightInPopularRoute> = (
  props
) => {
  return (
    <div {...props} className={cn("py-12", props.className)}>
      <div className="main-container">
        <SectionHeading
          title="Search for cheapest flights"
          description="Search for cheapest flights on popular destination and enjoy your flight."
          className="mb-6"
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {searchForData?.map((d) => {
            return (
              <div key={d?.id}>
                <Link
                  className="flex items-center bg-white shadow-2 hover:rounded-lg justify-between px-4 py-8"
                  href="/"
                >
                  <div className="flex items-center">
                    <GiCommercialAirplane
                      color={Colors.primary}
                      fontSize={25}
                    />
                    <div className="pl-5">
                      {d?.title.length > 15 ? (
                        <h3 className="text-[#000] font-normal text-xl leading-5">
                          {d?.title.slice(0, 15)}...
                        </h3>
                      ) : (
                        <h3 className="text-[#000] font-normal text-xl leading-5">
                          {d?.title}
                        </h3>
                      )}
                      <p className="text-base leading-6 font-normal">
                        From{" "}
                        <strong>
                          <span>BDT {d?.taka}</span>
                        </strong>
                      </p>
                    </div>
                  </div>
                  <IoIosArrowForward fontSize={25} className="text-[#1882ff]" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CheapestFlightInPopularRoute;
