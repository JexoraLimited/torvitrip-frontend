import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { useSearchAirportsQuery } from "@/features/airport/airportApi";
import useDeviceIndicator from "@/hooks/useDeviceIndicator";
import { cn } from "@/utils/common";
import { addDays, addYears, isAfter, isBefore, subDays } from "date-fns";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import { TbArrowsRightLeft } from "react-icons/tb";
import { useDebounce } from "use-debounce";
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

interface IMultiCityRow {
  index: number;
  getValues: (payload?: string | string[]) => any;
  control: any;
  watch: any;
  handleAddRoute: (index: number) => void;
  handleRemoveRoute: (index: number) => void;
  canAdded: boolean;
  canRemoved: boolean;
  shuffle: (index: number) => void;
  setValue: any;
}

const MultiCityRow: React.FC<IMultiCityRow> = ({
  index,
  getValues,
  control,
  watch,
  handleAddRoute,
  handleRemoveRoute,
  canAdded,
  canRemoved,
  shuffle,
  setValue,
}) => {
  const { isPhone } = useDeviceIndicator();
  const [popupsState, setPopupsState] = useState<PopupState>({
    from_city: false,
    to_city: false,
    from_date: false,
    to_date: false,
    travelers: false,
  });
  const handlePopupOpenClose = (popup: PopupTypes, open: boolean) => {
    setPopupsState((ps) => ({ ...ps, [popup]: open }));
  };

  const [fromSearchValue, setFromSearchValue] = useState(
    getValues(`routes.${index}.from.city`)
  );
  const [toSearchValue, setToSearchValue] = useState(
    getValues(`routes.${index}.to.city`)
  );
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

  const currentDate =
    index === 0 ? new Date() : watch(`routes.${index}.dates.from`);

  const dateOptions = {
    today: new Date(),
    from: addDays(currentDate, 1),
    to: addDays(currentDate, 9),
    oneYearFromNow: addYears(currentDate, 1),
    beforeOneDay: subDays(currentDate, 1),
  };

  return (
    <div
      className={"grid gap-2 mt-[20px] grid-cols-1 lg:grid-cols-[2fr,1fr,1fr]"}
    >
      {isPhone && (
        <div className="md:hidden flex items-center justify-center gap-3">
          <div className="w-[100px] h-[25px] flex items-center justify-center text-xs bg-primary rounded-full text-white font-medium">
            Flight {index + 1}
          </div>
          <div className="w-full h-[2px] bg-border"></div>
        </div>
      )}
      <>
        {isPhone && (
          <>
            <PhoneInputOverlay
              open={popupsState.from_city || popupsState.to_city}
              title={"Where to fly from?"}
              subtitle={`Multi City, Flight ${index + 1}`}
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
                    type={"multi-city"}
                    focus={popupsState.from_city ? "from" : "to"}
                    from={watch(`routes.${index}.from`)}
                    to={watch(`routes.${index}.to`)}
                    onFromSelectChange={(option) => {
                      const obj = {
                        airport: option.descriptions[1],
                        city: option.subtitle,
                        country: option.descriptions[0],
                        iata_code: option.title,
                      };
                      setValue(`routes.${index}.from`, obj);
                    }}
                    onToSelectChange={(option) => {
                      const obj = {
                        airport: option.descriptions[1],
                        city: option.subtitle,
                        country: option.descriptions[0],
                        iata_code: option.title,
                      };
                      setValue(`routes.${index}.to`, obj);
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
              subtitle={`Multi City, Flight ${index + 1}`}
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
                  name={`routes.${index}.dates`}
                  render={({ field }) => {
                    return (
                      // @ts-ignore
                      <Calendar
                        required
                        className="bg-white m-[0px!important] select-none"
                        mode={"single"}
                        defaultMonth={dateOptions.today}
                        selected={field.value.from}
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
                        numberOfMonths={1}
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
                            <DayPickerHead type={"one-way"} {...props} />
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

        {isPhone && index === 0 && (
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
      </>
      <div className="flex flex-col lg:flex-row items-end justify-center gap-1">
        <Controller
          control={control}
          name={`routes.${index}.from`}
          render={({ field }) => {
            return (
              <Popover
                open={!isPhone && popupsState.from_city}
                onOpenChange={(open) => handlePopupOpenClose("from_city", open)}
              >
                <PopoverTrigger asChild>
                  <SearchInput
                    open={!isPhone && popupsState.from_city}
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
                {!isPhone && (
                  <PopoverContent
                    className="w-auto p-0 rounded-lg overflow-hidden"
                    align="start"
                  >
                    <SearchOptionList
                      className="w-[250px] max-h-[315px]"
                      options={fromAirportsAsOptions}
                      selectedId={field.value.iata_code}
                      onSelectChange={(option) => {
                        const obj = {
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
          onClick={() => shuffle(index)}
          className="p-2 rounded-full rotate-90 lg:rotate-0 my-[-16px] mr-4 lg:mr-[-16px] lg:mx-[-16px] z-[2] relative lg:my-auto bg-secondary"
        >
          <TbArrowsRightLeft className="text-white" />
        </div>
        <Controller
          control={control}
          name={`routes.${index}.to`}
          render={({ field }) => {
            return (
              <Popover
                open={!isPhone && popupsState.to_city}
                onOpenChange={(open) => handlePopupOpenClose("to_city", open)}
              >
                <PopoverTrigger asChild>
                  <SearchInput
                    open={!isPhone && popupsState.to_city}
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
                {!isPhone && (
                  <PopoverContent
                    className="w-[250px] p-0 rounded-lg overflow-hidden"
                    align="start"
                  >
                    <SearchOptionList
                      className="w-full max-h-[315px]"
                      options={toAirportsAsOptions}
                      selectedId={field.value.iata_code}
                      onSelectChange={(option) => {
                        const obj = {
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
        name={`routes.${index}.dates`}
        render={({ field }) => {
          return (
            <Popover
              open={!isPhone && (popupsState.from_date || popupsState.to_date)}
              onOpenChange={(open) => handlePopupOpenClose("from_date", open)}
            >
              <PopoverTrigger asChild>
                <div className="flex flex-col lg:flex-row items-end justify-center gap-2">
                  <SearchInput
                    open={!isPhone && popupsState.from_date}
                    parentClassName="w-full"
                    title={moment(field.value.from).format("DD MMMM")}
                    subtitle={moment(field.value.from).format("dddd")}
                    description={moment(field.value.from).format("YYYY")}
                  />
                </div>
              </PopoverTrigger>
              {!isPhone && (
                <PopoverContent
                  className="w-auto p-0 rounded-lg overflow-hidden"
                  align="start"
                >
                  {/* @ts-ignore */}
                  <Calendar
                    required
                    className="bg-white m-[0px!important] select-none"
                    mode={"single"}
                    defaultMonth={dateOptions.today}
                    selected={field.value.from}
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
                    numberOfMonths={1}
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
                        <DayPickerHead type={"one-way"} {...props} />
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
      {index === 0 && (
        <Controller
          control={control}
          name="bookingInfo"
          render={({ field }) => {
            return (
              <Popover
                open={!isPhone && popupsState.travelers}
                onOpenChange={(open) => handlePopupOpenClose("travelers", open)}
              >
                <PopoverTrigger>
                  <SearchInput
                    title={field.value.class?.label}
                    subtitle={`${getTotalTravelersCount()} Travelers`}
                    description={`${field.value.travelers.adults} Adults, ${field.value.travelers.children} Children, ${field.value.travelers.infants} Infant`}
                  />
                </PopoverTrigger>
                {!isPhone && (
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
      )}
      {index !== 0 && (
        <div className="border border-border flex items-center justify-center p-4 gap-3 rounded-lg">
          {canAdded && (
            <Button
              onClick={() => handleAddRoute(index)}
              size={"sm"}
              variant={"default"}
              className="rounded-full w-[100px]"
            >
              Add
            </Button>
          )}
          {canRemoved && (
            <Button
              onClick={() => handleRemoveRoute(index)}
              size={"sm"}
              variant={"secondary"}
              className="rounded-full w-[100px]"
            >
              Remove
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiCityRow;
