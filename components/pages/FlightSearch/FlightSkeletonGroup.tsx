import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/utils/common";
import React, { HTMLAttributes } from "react";
interface IFlightSkeletonGroup extends HTMLAttributes<HTMLDivElement> {}
const FlightSkeletonGroup: React.FC<IFlightSkeletonGroup> = (props) => {
  return (
    <div {...props} className={cn("space-y-5", props.className)}>
      {new Array(10).fill("flight").map((_, i) => (
        <div
          key={i}
          className="w-full h-[320px] md:h-[230px] rounded-lg overflow-hidden bg-white"
        >
          <div className="flex md:flex-row flex-col items-center w-full h-[282px] md:h-[192px]">
            <div className="w-full pt-5 md:pt-0 md:min-w-[20%] md:w-[20%] flex flex-row gap-4 md:gap-3 items-center justify-center px-5 md:px-0">
              <div className="w-[50px] md:w-full flex flex-col gap-3 items-center justify-center">
                <Skeleton className="w-[40px] h-[40px] md:w-[100px] md:h-[100px] rounded-2xl" />
                <Skeleton className="w-[20px] h-[20px] md:w-[60%] md:h-[20px]" />
              </div>
              <div className="w-full block md:hidden">
                <div className="flex items-center justify-around mb-3">
                  <Skeleton className="w-[25px] h-[25px]" />
                  <Skeleton className="w-[60px] h-[10px]" />
                  <Skeleton className="w-[70px] h-[10px]" />
                </div>
                <Skeleton className="w-full h-[10px]" />
              </div>
            </div>
            <div className="w-full px-5 md:px-0 md:min-w-[55%] md:w-[55%] mx-auto flex flex-col">
              <div className="w-full hidden md:block">
                <div className="flex items-center justify-around mb-3">
                  <Skeleton className="w-[25px] h-[25px]" />
                  <Skeleton className="w-[60px] h-[10px]" />
                  <Skeleton className="w-[70px] h-[10px]" />
                </div>
                <Skeleton className="w-full h-[10px]" />
              </div>
              <div className="flex md:flex-row flex-col mt-8 md:mt-3 gap-5 md:gap-0">
                <div className="flex flex-1 items-start justify-center flex-col gap-1">
                  <Skeleton className="h-[10px] md:h-[15px] w-[60px] md:mx-0 mx-auto" />
                  <Skeleton className="h-[8px] md:h-[10px] w-[80px]" />
                  <Skeleton className="h-[8px] md:h-[10px] w-[100px]" />
                  <Skeleton className="h-[10px] md:h-[15px] w-[100px]" />
                </div>
                <div className="flex flex-1 items-start justify-center flex-col gap-1">
                  <Skeleton className="h-[10px] md:h-[15px] w-[60px] md:mx-0 mx-auto" />
                  <Skeleton className="h-[8px] md:h-[10px] w-[80px]" />
                  <Skeleton className="h-[8px] md:h-[10px] w-[100px]" />
                  <Skeleton className="h-[10px] md:h-[15px] w-[100px]" />
                </div>
              </div>
            </div>
            <div className="w-full md:min-w-[20%] relative md:w-[20%] h-[30px] md:h-full md:block hidden">
              <div className="h-[30px] bg-slate-100 absolute top-0 left-0 right-0 flex items-center justify-center w-full">
                <Skeleton className="w-[100px] h-[10px]" />
              </div>
              <div className="h-full bg-slate-50 flex flex-col items-end justify-center p-5 gap-2">
                <Skeleton className="w-[140px] h-[8px] absolute top-10" />
                <Skeleton className="w-[40px] h-[12px] mt-10" />
                <Skeleton className="w-[100px] h-[20px]" />
              </div>
            </div>
            <div className="w-full md:hidden h-[28px] gap-3 bg-slate-50 flex px-5 py-1 items-center justify-end mt-[15px]">
              <Skeleton className="w-[60px] h-[10px]" />
              <Skeleton className="w-[90px] h-[15px]" />
            </div>
          </div>
          <div className="w-full flex gap-3 h-[38px]">
            <div className="flex-1 h-[38px] rounded-none bg-slate-100"></div>
            <div className="flex-1 h-[38px] rounded-none bg-slate-100"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightSkeletonGroup;
