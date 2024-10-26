import { useSearchAirportsQuery } from "@/features/airport/airportApi";
import { roboto } from "@/fonts/google";
import { FlightTypes } from "@/types/common";
import { cn } from "@/utils/common";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MdAirplanemodeActive } from "react-icons/md";
import { useDebounce } from "use-debounce";
import SearchOptionList, { ISearchOption } from "../SearchOptionList";

interface IAirport {
  iata_code: string;
  city: string;
  country: string;
  airport: string;
}

interface FromToSelectMobile {
  from: IAirport;
  to: IAirport;
  focus: "from" | "to";
  onFromSelectChange: (selected: ISearchOption) => void;
  onToSelectChange: (selected: ISearchOption) => void;
  type: FlightTypes;
}

const FromToSelectMobile: React.FC<FromToSelectMobile> = ({
  from,
  to,
  focus,
  onFromSelectChange,
  onToSelectChange,
  type,
}) => {
  const [fromSearchValue, setFromSearchValue] = useState(from.city);
  const [toSearchValue, setToSearchValue] = useState(to.city);

  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus === "from") {
      fromInputRef.current?.focus();
    }
    if (focus === "to") {
      toInputRef.current?.focus();
    }
  }, [focus, fromInputRef, toInputRef]);

  const [focusedInput, setFocusedInput] = useState<"from" | "to" | undefined>();

  const [fromKeyword] = useDebounce(fromSearchValue, 500);
  const [toKeyword] = useDebounce(toSearchValue, 500);

  const { data: fromAirportsResponse } = useSearchAirportsQuery(fromKeyword);
  const { data: toAirportsResponse } = useSearchAirportsQuery(toKeyword);

  const fromAirportsData = fromAirportsResponse?.data;
  const toAirportsData = toAirportsResponse?.data;
  const fromAirportsAsOptions: ISearchOption[] = useMemo(
    () =>
      fromAirportsData?.map((l) => ({
        title: l.iata_code,
        descriptions: [l.country, l.airport_name],
        subtitle: l.city,
        id: l.iata_code,
      })) || [],
    [fromAirportsData]
  );

  const toAirportsAsOptions: ISearchOption[] = useMemo(
    () =>
      toAirportsData?.map((l) => ({
        title: l.iata_code,
        descriptions: [l.country, l.airport_name],
        subtitle: l.city,
        id: l.iata_code,
      })) || [],
    [toAirportsData]
  );

  return (
    <div className={cn("w-full h-full space-y-4 p-2", roboto.className)}>
      <div
        tabIndex={0}
        onFocus={() => setFocusedInput("from")}
        onBlur={() => setFocusedInput(undefined)}
        className="rounded-md overflow-hidden border border-gray-200 relative"
      >
        <h5 className="text-center">From</h5>
        <hr />
        <div className="py-3 px-4 gap-3 flex items-center">
          <MdAirplanemodeActive className="text-3xl text-gray-text rotate-45" />
          <input
            ref={fromInputRef}
            value={fromSearchValue}
            onChange={(e) => setFromSearchValue(e.target.value)}
            type="text"
            placeholder="Flying from Airport/City"
            className="w-full h-full text-gray-text outline-none"
          />
          <h5
            onClick={() => {
              setFromSearchValue("");
              fromInputRef.current?.focus();
            }}
            className="text-primary font-bold text-[14px]"
          >
            Clear
          </h5>
        </div>
        <div
          className={cn("hidden w-full", focusedInput === "from" && "block")}
        >
          <SearchOptionList
            options={fromAirportsAsOptions}
            leftClassName="w-[20%]"
            selectedId={from.iata_code}
            onSelectChange={(selected) => {
              onFromSelectChange(selected);
              setFromSearchValue(selected.subtitle);
              setFocusedInput("to");
              toInputRef.current?.focus();
            }}
          />
        </div>
      </div>
      <div
        className={cn(
          "rounded-md overflow-hidden border border-gray-200 relative",
          focusedInput === "from" && "opacity-0 pointer-events-none"
        )}
        tabIndex={0}
        onFocus={() => setFocusedInput("to")}
        onBlur={() => setFocusedInput(undefined)}
      >
        <h5 className="text-center">To</h5>
        <hr />
        <div className="py-3 px-4 gap-3 flex items-center">
          <MdAirplanemodeActive className="text-3xl text-gray-text -rotate-[135deg]" />
          <input
            ref={toInputRef}
            value={toSearchValue}
            onChange={(e) => setToSearchValue(e.target.value)}
            type="text"
            placeholder="Flying from Airport/City"
            className="w-full h-full text-gray-text outline-none"
          />
          <h5
            onClick={() => {
              setToSearchValue("");
              toInputRef.current?.focus();
            }}
            className="text-primary font-bold text-[14px]"
          >
            Clear
          </h5>
        </div>
        <div className={cn("hidden w-full", focusedInput === "to" && "block")}>
          <SearchOptionList
            options={toAirportsAsOptions}
            leftClassName="w-[20%]"
            selectedId={from.iata_code}
            onSelectChange={(selected) => {
              onToSelectChange(selected);
              setFocusedInput(undefined);
              setToSearchValue(selected.subtitle);
              toInputRef.current?.blur();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FromToSelectMobile;
