import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { TRAVEL_CLASSES_WITH_LABEL, defaultAirports } from "@/data/flight";
import { useSearchAirportsQuery } from "@/features/airport/airportApi";
import { FlightTypes } from "@/types/common";
import { cn } from "@/utils/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWindowWidth } from "@react-hook/window-size";
import { addDays, addYears, isAfter, isBefore, subDays } from "date-fns";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TbArrowsRightLeft } from "react-icons/tb";
import { useDebounce } from "use-debounce";
import { z } from "zod";
import { ISearchFlight } from ".";
import PhoneInputOverlay from "../Search/PhoneInputOverlay";
import SearchInput from "../SearchInput";
import SearchOptionList, { ISearchOption } from "../SearchOptionList";
import TravelersSelect from "../TravelersSelect";
import DayPickerHead from "./DayPickerHead";
import styles from "./FlightSearch.module.css";
import FromToSelectMobile from "./FromToSelectMobile";

type PopupTypes =
  | "from_city"
  | "to_city"
  | "from_date"
  | "to_date"
  | "travelers";

type PopupState = { [key in PopupTypes]: boolean };
const FlightSearchSchema = z.object({
  from: z.object({
    iata_code: z
      .string({
        required_error: "IATA code is required",
      })
      .length(3, { message: "IATA CODE must 3 characters" }),
    city: z.string({
      required_error: "City is required",
    }),
    country: z.string({
      required_error: "Country is required",
    }),
    airport: z.string({
      required_error: "Airport is required",
    }),
  }),
  to: z.object({
    iata_code: z
      .string({
        required_error: "IATA code is required",
      })
      .length(3, { message: "IATA CODE must 3 characters" }),
    city: z.string({
      required_error: "City is required",
    }),
    country: z.string({
      required_error: "Country is required",
    }),
    airport: z.string({
      required_error: "Airport is required",
    }),
  }),
  dates: z.object({
    from: z.date({
      required_error: "From Date is required",
    }),
    to: z.date({
      required_error: "To Date is required",
    }),
  }),
  bookingInfo: z.object({
    travelers: z.object({
      adults: z
        .number({ required_error: "Adult travelers is required" })
        .min(1, { message: "At least one travelers required" })
        .max(9, {
          message: "Adult can't be greater than 9",
        }),
      children: z
        .number({ required_error: "Adult travelers is required" })
        .min(0, { message: "Children can't be negative" }),
      infants: z
        .number({ required_error: "Adult travelers is required" })
        .min(0, { message: "Infant can't be negative" }),
    }),
    class: z.object({ label: z.string(), value: z.string() }),
  }),
});

type FlightSearchSchemaType = Zod.infer<typeof FlightSearchSchema>;

interface IOneAndRoundTrip extends ISearchFlight {
  tripType: FlightTypes;
}
const OneAndRoundTrip: React.FC<IOneAndRoundTrip> = ({
  searchText,
  travelClass,
  travelers,
  type,
  tripType,
  destinations,
  fromDates,
  origins,
  toDates,
}) => {
  const router = useRouter();
  const [popupsState, setPopupsState] = useState<PopupState>({
    from_city: false,
    to_city: false,
    from_date: false,
    to_date: false,
    travelers: false,
  });
  const [loading, setLoading] = useState(false);
  const windowWidth = useWindowWidth();
  const handlePopupOpenClose = (popup: PopupTypes, open: boolean) => {
    setPopupsState((ps) => ({ ...ps, [popup]: open }));
  };
  const today = new Date();
  const dateOptions = {
    today,
    from: addDays(today, 1),
    to: addDays(today, 9),
    oneYearFromNow: addYears(today, 1),
    beforeOneDay: subDays(today, 1),
  };

  const { control, watch, handleSubmit, getValues, setValue } =
    useForm<FlightSearchSchemaType>({
      resolver: zodResolver(FlightSearchSchema),
      defaultValues: {
        from: {
          airport:
            origins?.[0]?.airport_name || defaultAirports[0].airport_name,
          city: origins?.[0]?.city || defaultAirports[0].city,
          country: origins?.[0]?.country || defaultAirports[0].country,
          iata_code: origins?.[0]?.iata_code || defaultAirports[0].iata_code,
        },
        to: {
          airport:
            destinations?.[0]?.airport_name || defaultAirports[1].airport_name,
          city: destinations?.[0]?.city || defaultAirports[1].city,
          country: destinations?.[0]?.country || defaultAirports[1].country,
          iata_code:
            destinations?.[0]?.iata_code || defaultAirports[1].iata_code,
        },
        dates: {
          from: fromDates?.[0] || dateOptions.from,
          to: toDates?.[0] || dateOptions.to,
        },
        bookingInfo: {
          travelers: {
            adults: travelers?.adults || 1,
            children: travelers?.children || 0,
            infants: travelers?.infants || 0,
          },
          class: travelClass || TRAVEL_CLASSES_WITH_LABEL[0],
        },
      },
    });

  const [fromSearchValue, setFromSearchValue] = useState(
    getValues("from.city")
  );

  const [toSearchValue, setToSearchValue] = useState(getValues("to.city"));
  const [fromKeyword] = useDebounce(fromSearchValue, 500);
  const [toKeyword] = useDebounce(toSearchValue, 500);

  const { data: fromAirportsResponse } = useSearchAirportsQuery(
    fromKeyword || "Bangladesh"
  );
  const fromAirportsData = fromAirportsResponse?.data;

  const { data: toAirportsResponse } = useSearchAirportsQuery(
    toKeyword || "Bangladesh"
  );

  const toAirportsData = toAirportsResponse?.data;

  const shuffleAirports = () => {
    const previousFrom = getValues("from");
    const previousTo = getValues("to");
    setValue("to", previousFrom);
    setValue("from", previousTo);
  };

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

  const getTotalTravelersCount = () => {
    return (
      watch("bookingInfo.travelers.adults") +
      watch("bookingInfo.travelers.children") +
      watch("bookingInfo.travelers.infants")
    );
  };

  const handleSearch = (data: FlightSearchSchemaType) => {
    setLoading(true);
    router.push({
      pathname: "/flight-search",
      query: {
        origin: data.from.iata_code,
        destination: data.to.iata_code,
        departureDate: moment(data.dates.from).format("YYYY-MM-DD"),
        returnDate:
          tripType === "round-trip"
            ? moment(data.dates.to).format("YYYY-MM-DD")
            : undefined,
        adults: data.bookingInfo.travelers.adults,
        children: data.bookingInfo.travelers.children,
        infants: data.bookingInfo.travelers.infants,
        currency: localStorage?.getItem("currency") || "BDT",
        tripType: tripType,
        travelClass: data.bookingInfo.class.value,
        max: 10,
      },
    });
    console.log("push");
  };

  const isMobileOrTablet = windowWidth <= 768;
  return (
    <>
      {/* input overlays on phone */}
      {isMobileOrTablet && (
        <>
          <PhoneInputOverlay
            open={popupsState.from_city || popupsState.to_city}
            title={"Where to fly from?"}
            subtitle={tripType === "one-way" ? "One Way" : "Round Trip"}
            handleClose={() =>
              setPopupsState((pv) => ({
                ...pv,
                from_city: false,
                to_city: false,
              }))
            }
          >
            {(popupsState.from_city || popupsState.to_city) && (
              <>
                <FromToSelectMobile
                  type={tripType}
                  focus={popupsState.from_city ? "from" : "to"}
                  from={watch("from")}
                  to={watch("to")}
                  onFromSelectChange={(option) => {
                    const obj: FlightSearchSchemaType["from"] = {
                      airport: option.descriptions[1],
                      city: option.subtitle,
                      country: option.descriptions[0],
                      iata_code: option.title,
                    };
                    setValue("from", obj);
                  }}
                  onToSelectChange={(option) => {
                    const obj: FlightSearchSchemaType["from"] = {
                      airport: option.descriptions[1],
                      city: option.subtitle,
                      country: option.descriptions[0],
                      iata_code: option.title,
                    };
                    setValue("to", obj);
                    handlePopupOpenClose("from_city", false);
                    handlePopupOpenClose("to_city", false);
                    handlePopupOpenClose("from_date", true);
                  }}
                />
              </>
            )}
          </PhoneInputOverlay>

          <PhoneInputOverlay
            open={popupsState.from_date || popupsState.to_date}
            title={"Select Departure Date"}
            subtitle={tripType === "one-way" ? "One Way" : "Round Trip"}
            handleClose={() =>
              setPopupsState((pv) => ({
                ...pv,
                from_date: false,
                to_date: false,
              }))
            }
            back
            handleBack={() =>
              setPopupsState((pv) => ({
                ...pv,
                from_date: false,
                to_date: false,
                from_city: true,
                to_city: false,
              }))
            }
          >
            <div className="max-w-[320px] mx-auto mt-5 mb-28">
              <Controller
                control={control}
                name="dates"
                render={({ field }) => {
                  return (
                    // @ts-ignore
                    <Calendar
                      required
                      className="bg-white m-[0px!important] select-none"
                      mode={tripType === "round-trip" ? "range" : "single"}
                      defaultMonth={dateOptions.today}
                      selected={
                        tripType === "round-trip"
                          ? field.value
                          : field.value.from
                      }
                      onSelect={(date: any) => {
                        if (date?.from) {
                          field.onChange(date);
                        } else {
                          field.onChange({
                            from: date,
                            to: addDays(date, 8),
                          });
                        }
                      }}
                      numberOfMonths={tripType === "round-trip" ? 2 : 1}
                      classNames={{
                        row: cn("flex w-full mt-1", styles.datePickerRow),
                        head: "rdp-head select-none",
                        months: cn(
                          "flex flex-col sm:flex-row",
                          styles.datePickerMonths,
                          styles.datePickerMonthWhenHorizontal
                        ),
                      }}
                      disabled={(date) =>
                        isBefore(date, dateOptions.beforeOneDay) ||
                        isAfter(date, dateOptions.oneYearFromNow)
                      }
                      components={{
                        Caption: (props) => (
                          <DayPickerHead
                            type={
                              tripType === "one-way" ? "one-way" : "round-trip"
                            }
                            {...props}
                          />
                        ),
                      }}
                      modifiersClassNames={{
                        range_start: styles.datePickerRangeStart,
                        range_end: styles.datePickerRangeEnd,
                        range_middle: styles.datePickerRangeMiddle,
                        today: styles.datePickerToday,
                        selected: styles.datePickerSelected,
                        outside: styles.datePickerOutside,
                        disabled: styles.datePickerDisabled,
                      }}
                    />
                  );
                }}
              />
              <div className="w-full absolute bg-white bottom-0 left-0 right-0 flex items-center justify-center h-[70px] px-3">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setPopupsState((pv) => ({
                      ...pv,
                      from_date: false,
                      to_date: false,
                      travelers: true,
                    }));
                  }}
                  variant={"secondary"}
                  className="w-full h-[50px]"
                >
                  Done
                </Button>
              </div>
            </div>
          </PhoneInputOverlay>
        </>
      )}

      {isMobileOrTablet && (
        <>
          <PhoneInputOverlay
            open={popupsState.travelers}
            title={`${getTotalTravelersCount()} Travelers`}
            subtitle={watch("bookingInfo.class.label")}
            handleClose={() =>
              setPopupsState((pv) => ({
                ...pv,
                travelers: false,
              }))
            }
            back
            handleBack={() =>
              setPopupsState((pv) => ({
                ...pv,
                travelers: false,
                from_date: true,
              }))
            }
          >
            {popupsState.travelers && (
              <Controller
                control={control}
                name="bookingInfo"
                render={({ field }) => {
                  return (
                    <>
                      <TravelersSelect
                        travelClass={field.value.class}
                        adults={field.value.travelers.adults}
                        childrens={field.value.travelers.children}
                        infants={field.value.travelers.infants}
                        onTravelersChange={(travelers) =>
                          field.onChange({
                            class: field.value.class,
                            travelers,
                          })
                        }
                        onTravelClassChange={(travelClass) =>
                          field.onChange({
                            class: travelClass,
                            travelers: field.value.travelers,
                          })
                        }
                      />
                      <div className="w-full absolute bg-white bottom-0 left-0 right-0 flex items-center justify-center h-[70px] px-3">
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            setPopupsState((pv) => ({
                              ...pv,
                              travelers: false,
                            }));
                          }}
                          variant={"secondary"}
                          className="w-full h-[50px]"
                        >
                          Done
                        </Button>
                      </div>
                    </>
                  );
                }}
              />
            )}
          </PhoneInputOverlay>
        </>
      )}
      <form onSubmit={handleSubmit(handleSearch)}>
        <div
          className={cn(
            "grid gap-2 mt-[20px]",
            tripType === "round-trip"
              ? "grid-cols-1 lg:grid-cols-[2fr,2fr,1fr]"
              : "grid-cols-1 lg:grid-cols-[2fr,1fr,1fr]"
          )}
        >
          <div className="flex flex-col lg:flex-row items-end justify-center gap-1">
            <Controller
              control={control}
              name="from"
              render={({ field }) => {
                return (
                  <Popover
                    open={!isMobileOrTablet && popupsState.from_city}
                    onOpenChange={(open) =>
                      handlePopupOpenClose("from_city", open)
                    }
                  >
                    <PopoverTrigger asChild>
                      <SearchInput
                        open={!isMobileOrTablet && popupsState.from_city}
                        title={field.value.iata_code}
                        subtitle={field.value.city}
                        description={`${field.value.country}, ${field.value.airport}`}
                        badge="From"
                        parentClassName="w-full lg:w-1/2"
                        inputType="search"
                        searchProps={{
                          value: fromSearchValue,
                          onChange: (e) => setFromSearchValue(e.target.value),
                          onClose: () => setFromSearchValue(""),
                        }}
                      />
                    </PopoverTrigger>
                    {!isMobileOrTablet && (
                      <PopoverContent
                        className="w-auto p-0 rounded-lg overflow-hidden"
                        align="start"
                      >
                        <SearchOptionList
                          className="w-[250px] max-h-[315px]"
                          options={fromAirportsAsOptions}
                          selectedId={field.value.iata_code}
                          onSelectChange={(option) => {
                            const obj: FlightSearchSchemaType["from"] = {
                              airport: option.descriptions[1],
                              city: option.subtitle,
                              country: option.descriptions[0],
                              iata_code: option.title,
                            };
                            field.onChange(obj);
                            handlePopupOpenClose("from_city", false);
                          }}
                        />
                      </PopoverContent>
                    )}
                  </Popover>
                );
              }}
            />
            <div
              onClick={shuffleAirports}
              className="p-2 rounded-full rotate-90 lg:rotate-0 my-[-16px] mr-4 lg:mr-[-16px] lg:mx-[-16px] z-[2] relative lg:my-auto bg-secondary"
            >
              <TbArrowsRightLeft className="text-white" />
            </div>
            <Controller
              control={control}
              name="to"
              render={({ field }) => {
                return (
                  <Popover
                    open={!isMobileOrTablet && popupsState.to_city}
                    onOpenChange={(open) => {
                      handlePopupOpenClose("to_city", open);
                    }}
                  >
                    <PopoverTrigger asChild>
                      <SearchInput
                        open={!isMobileOrTablet && popupsState.to_city}
                        title={field.value.iata_code}
                        subtitle={field.value.city}
                        description={`${field.value.country}, ${field.value.airport}`}
                        badge="To"
                        parentClassName="w-full lg:w-1/2"
                        inputType="search"
                        searchProps={{
                          value: toSearchValue,
                          onChange: (e) => setToSearchValue(e.target.value),
                          onClose: () => setToSearchValue(""),
                        }}
                      />
                    </PopoverTrigger>
                    {!isMobileOrTablet && (
                      <PopoverContent
                        className="w-[250px] p-0 rounded-lg overflow-hidden"
                        align="start"
                      >
                        <SearchOptionList
                          className="w-full max-h-[315px]"
                          options={toAirportsAsOptions}
                          selectedId={field.value.iata_code}
                          onSelectChange={(option) => {
                            const obj: FlightSearchSchemaType["from"] = {
                              airport: option.descriptions[1],
                              city: option.subtitle,
                              country: option.descriptions[0],
                              iata_code: option.title,
                            };
                            field.onChange(obj);
                            handlePopupOpenClose("to_city", false);
                          }}
                        />
                      </PopoverContent>
                    )}
                  </Popover>
                );
              }}
            />
          </div>
          <Controller
            control={control}
            name="dates"
            render={({ field }) => {
              return (
                <Popover
                  open={
                    !isMobileOrTablet &&
                    (popupsState.from_date || popupsState.to_date)
                  }
                  onOpenChange={(open) =>
                    handlePopupOpenClose("from_date", open)
                  }
                >
                  <PopoverTrigger asChild>
                    <div className="flex flex-row items-end justify-center gap-2">
                      <SearchInput
                        open={!isMobileOrTablet && popupsState.from_date}
                        parentClassName="w-full"
                        title={moment(field.value.from).format("DD MMMM")}
                        subtitle={moment(field.value.from).format("dddd")}
                        description={moment(field.value.from).format("YYYY")}
                      />
                      {tripType === "round-trip" && (
                        <SearchInput
                          open={!isMobileOrTablet && popupsState.from_date}
                          parentClassName="w-full"
                          title={moment(field.value.to).format("DD MMMM")}
                          subtitle={moment(field.value.to).format("dddd")}
                          description={moment(field.value.to).format("YYYY")}
                          className="flex-1"
                        />
                      )}
                    </div>
                  </PopoverTrigger>
                  {!isMobileOrTablet && (
                    <PopoverContent
                      className="w-auto p-0 rounded-lg overflow-hidden"
                      align="start"
                    >
                      {/* @ts-ignore */}
                      <Calendar
                        required
                        className="bg-white m-[0px!important] select-none"
                        mode={tripType === "round-trip" ? "range" : "single"}
                        defaultMonth={dateOptions.today}
                        selected={
                          tripType === "round-trip"
                            ? field.value
                            : field.value.from
                        }
                        onSelect={(date: any) => {
                          if (date?.from) {
                            field.onChange(date);
                          } else {
                            field.onChange({
                              from: date,
                              to: addDays(date, 8),
                            });
                          }
                        }}
                        numberOfMonths={tripType === "round-trip" ? 2 : 1}
                        classNames={{
                          row: cn("flex w-full mt-1", styles.datePickerRow),
                          head: "rdp-head select-none",
                          months: cn(
                            "flex flex-col sm:flex-row",
                            styles.datePickerMonths
                          ),
                        }}
                        disabled={(date) =>
                          isBefore(date, dateOptions.beforeOneDay) ||
                          isAfter(date, dateOptions.oneYearFromNow)
                        }
                        components={{
                          Caption: (props) => (
                            <DayPickerHead
                              type={
                                tripType === "one-way"
                                  ? "one-way"
                                  : "round-trip"
                              }
                              {...props}
                            />
                          ),
                        }}
                        modifiersClassNames={{
                          range_start: styles.datePickerRangeStart,
                          range_end: styles.datePickerRangeEnd,
                          range_middle: styles.datePickerRangeMiddle,
                          today: styles.datePickerToday,
                          selected: styles.datePickerSelected,
                          outside: styles.datePickerOutside,
                          disabled: styles.datePickerDisabled,
                        }}
                      />
                    </PopoverContent>
                  )}
                </Popover>
              );
            }}
          />
          <Controller
            control={control}
            name="bookingInfo"
            render={({ field }) => {
              return (
                <Popover
                  open={!isMobileOrTablet && popupsState.travelers}
                  onOpenChange={(open) =>
                    handlePopupOpenClose("travelers", open)
                  }
                >
                  <PopoverTrigger>
                    <SearchInput
                      title={field.value.class?.label}
                      subtitle={`${getTotalTravelersCount()} Travelers`}
                      description={`${field.value.travelers.adults} Adults, ${field.value.travelers.children} Children, ${field.value.travelers.infants} Infant`}
                    />
                  </PopoverTrigger>
                  {!isMobileOrTablet && (
                    <PopoverContent
                      className="w-auto relative z-[9999] md:max-w-[320px] p-0 rounded-lg overflow-hidden"
                      align="end"
                    >
                      <TravelersSelect
                        travelClass={field.value.class}
                        adults={field.value.travelers.adults}
                        childrens={field.value.travelers.children}
                        infants={field.value.travelers.infants}
                        onTravelersChange={(travelers) =>
                          field.onChange({
                            class: field.value.class,
                            travelers,
                          })
                        }
                        onTravelClassChange={(travelClass) =>
                          field.onChange({
                            class: travelClass,
                            travelers: field.value.travelers,
                          })
                        }
                      />
                    </PopoverContent>
                  )}
                </Popover>
              );
            }}
          />
        </div>
        <Button
          isLoading={loading}
          disabled={loading}
          type="submit"
          className="gap-4 mx-auto flex mt-2 md:mt-5 w-full md:w-auto px-16 font-bold"
        >
          {searchText || "Search Flight"}
        </Button>
      </form>
    </>
  );
};

export default OneAndRoundTrip;
