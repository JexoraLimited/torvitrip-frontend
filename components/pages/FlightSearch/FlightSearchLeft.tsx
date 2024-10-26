import { Button } from "@/components/ui/Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/Sheet";
import { useFlightSearchContext } from "@/context/flight-search/FlightSearchContext";
import { cn } from "@/utils/common";
import { useWindowWidth } from "@react-hook/window-size";
import React from "react";
import { nunitoSans } from "../../../fonts/google";
import FlightSearchFilters from "./FlightSearchFilters";

interface IFlightSearchLeft {
  className?: string;
  style?: React.CSSProperties;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setFiltersActive: (open: boolean) => void;
  setSortActive: (open: boolean) => void;
}

const FlightSearchLeft: React.FC<IFlightSearchLeft> = ({
  className,
  style,
  open,
  onOpenChange,
  setFiltersActive,
  setSortActive,
}) => {
  const {
    searchData: { airlines },
  } = useFlightSearchContext();
  const width = useWindowWidth();
  const isPhone = width <= 768;
  return (
    <div
      style={{ ...nunitoSans.style, ...style }}
      className={cn(
        `sticky top-20 pb-4 bottom-10 h-0 w-full md:w-[300px] md:h-[90vh] overflow-y-auto rounded-lg no-scrollbar bg-white`,
        className
      )}
    >
      <Sheet open={isPhone && open} onOpenChange={onOpenChange}>
        <SheetContent
          side={"bottom"}
          className="p-0 overflow-hidden flex flex-col gap-0 border-0 max-h-[85vh]"
        >
          <SheetHeader>
            <SheetTitle>Flight Filters</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto no-scrollbar h-full w-full">
            <FlightSearchFilters
              setFiltersActive={setFiltersActive}
              setSortActive={setSortActive}
              airlines={airlines}
            />
          </div>
          <SheetFooter>
            <SheetClose className="w-full">
              <Button variant={"secondary"} className="w-full">
                Save
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <FlightSearchFilters
        setFiltersActive={setFiltersActive}
        setSortActive={setSortActive}
        airlines={airlines}
      />
    </div>
  );
};

export default FlightSearchLeft;
