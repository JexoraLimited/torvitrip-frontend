import { useFilterFlights, useSearchFlights } from "@/hooks/api/flight";
import { IFlightFilterQuery } from "@/types/api/flight";
import {
  APIResponse,
  IAirCraft,
  IAirline,
  IAirport,
  IFlight,
  IFlightOfferSearchResponse,
  QueryStatus,
} from "@/types/common";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type FilterType =
  | "pricing"
  | "schedule"
  | "airline"
  | "stoppage"
  | "baggage"
  | "refundability";
type FilterTypeWithAll =
  | "pricing"
  | "schedule"
  | "airline"
  | "stoppage"
  | "baggage"
  | "all"
  | "refundability";

interface ISearchData extends IFlightOfferSearchResponse {
  error: AxiosError<APIResponse> | null;
  status: QueryStatus;
}

interface IFlightSearchContext {
  searchData: ISearchData;
  filters: IFlightFilterQuery;
  handleFilterFlights: (
    filter: IFlightFilterQuery,
    resetPagination?: boolean
  ) => void;
  filterLoading: boolean;
  isFilterApplied: (filterType: FilterType) => boolean;
  resetFilter: (filterType: FilterTypeWithAll) => void;
  getFiltersCount: () => number;
}

const FlightSearchContext = createContext<IFlightSearchContext>({
  searchData: {
    error: null,
    status: "idle",
    aircrafts: [],
    airlines: [],
    destinationAirports: [],
    originAirports: [],
    flights: [],
    page: 1,
    searchId: "",
    totalFlights: 0,
    ttl: 0,
    currency: "USD",
    filters: {
      cheapestFlightPrice: 0,
      earliestFlightTime: "",
      fastestFlightDuration: "",
      price: {
        max: 0,
        min: 0,
      },
    },
    sort: "cheapest",
  },
  filters: {
    page: 1,
    searchId: "",
    sort: "cheapest",
    filters: {
      airlines: undefined,
      baggage: undefined,
      pricing: undefined,
      schedule: undefined,
      stops: undefined,
      refundability: undefined,
    },
  },
  handleFilterFlights: () => {},
  filterLoading: false,
  isFilterApplied: () => true,
  resetFilter: () => {},
  getFiltersCount: () => 0,
});

export const FlightSearchContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const query = router.query;

  const { mutate: filterFlights } = useFilterFlights();

  const [filters, setFilters] = useState<IFlightFilterQuery>({
    page: 1,
    searchId: "",
    sort: "cheapest",
  });
  const [flights, setFlights] = useState<IFlight[]>([]);
  const [destinationAirports, setDestinationAirports] = useState<IAirport[]>(
    []
  );
  const [originAirports, setOriginAirports] = useState<IAirport[]>([]);
  const [airlines, setAirlines] = useState<
    { airline: IAirline; count: number; price: number }[]
  >([]);
  const [aircrafts, setAircrafts] = useState<
    { aircraft: IAirCraft; count: number; price: number }[]
  >([]);
  const [page, setPage] = useState(1);
  const [searchId, setSearchId] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [ttl, setTtl] = useState(0);
  const [totalFlights, setTotalFlights] = useState(0);

  const [filterLoading, setFilterLoading] = useState(false);
  const {
    mutate: searchFlights,
    data: flightResponse,
    status,
    error,
  } = useSearchFlights({
    retry: false,
  });
  const flightResponseData = flightResponse?.data;

  const handleFilterFlights = (
    filter: IFlightFilterQuery,
    resetPagination?: boolean,
    ignorePricingCheck?: boolean
  ) => {
    const obj = { ...filter, page: resetPagination ? 1 : filter.page };
    setFilters(obj);

    if (resetPagination) {
      setFilterLoading(true);
    }

    let pricing: any = obj.filters?.pricing;

    if (!ignorePricingCheck) {
      if (
        obj.filters?.pricing?.minPrice ===
          flightResponseData?.filters.price.min &&
        obj.filters?.pricing?.maxPrice === flightResponseData?.filters.price.max
      ) {
        if (obj.filters) {
          pricing = undefined;
        }
      }
    }

    const isAnyFilter = Object.keys(obj?.filters || {}).length > 0;

    filterFlights(
      {
        ...obj,
        filters: isAnyFilter
          ? {
              ...obj.filters,
              pricing: pricing,
            }
          : undefined,
      },
      {
        onSuccess: (data) => {
          setFlights((pv) => [...pv, ...data.data.flights]);
          setPage(data.data.page);
          if (resetPagination) {
            setFlights([]);
            setFlights(data.data.flights);
            setPage(1);
            setFilterLoading(false);
          }
          setTotalFlights(data.data.totalFlights);
        },
      }
    );
  };

  const isFilterApplied = useCallback(
    (filterType: FilterType) => {
      if (filterType === "pricing") {
        const minFilterPrice = filters.filters?.pricing?.minPrice;
        const maxFilterPrice = filters.filters?.pricing?.maxPrice;
        if (
          minFilterPrice === flightResponseData?.filters.price.min &&
          maxFilterPrice === flightResponseData?.filters.price.max
        )
          return false;
        else return true;
      }
      if (filterType === "schedule") {
        return !!Object.keys(filters.filters?.schedule || {}).length;
      }
      if (filterType === "airline") {
        return !!filters.filters?.airlines?.length;
      }
      if (filterType === "baggage") {
        return !!filters.filters?.baggage?.length;
      }
      if (filterType === "stoppage") {
        return !!filters.filters?.stops;
      }
      if (filterType === "refundability") {
        return !!filters.filters?.refundability;
      }
      return false;
    },
    [filters]
  );

  const getFiltersCount = useCallback(() => {
    let count = 0;
    const minFilterPrice = filters.filters?.pricing?.minPrice;
    const maxFilterPrice = filters.filters?.pricing?.maxPrice;
    if (
      minFilterPrice !== flightResponseData?.filters.price.min ||
      maxFilterPrice !== flightResponseData?.filters.price.max
    ) {
      count += 1;
    }
    if (!!Object.keys(filters.filters?.schedule || {}).length) {
      count += 1;
    }
    if (!!filters.filters?.airlines?.length) {
      count += 1;
    }
    if (!!filters.filters?.baggage?.length) {
      count += 1;
    }
    if (!!filters.filters?.stops) {
      count += 1;
    }
    if (!!filters.filters?.refundability) {
      count += 1;
    }
    return count;
  }, [filters]);

  const resetFilter = useCallback(
    (filterType: FilterTypeWithAll) => {
      if (filterType === "all") {
        return handleFilterFlights(
          {
            ...filters,
            filters: {
              pricing: {
                minPrice: flightResponseData?.filters.price.min || 0,
                maxPrice: flightResponseData?.filters.price.max || 0,
              },
              airlines: undefined,
              baggage: undefined,
              schedule: undefined,
              stops: undefined,
            },
          },
          true
        );
      }
      if (filterType === "pricing") {
        return handleFilterFlights(
          {
            ...filters,
            filters: {
              ...filters.filters,
              pricing: {
                minPrice: flightResponseData?.filters.price.min || 0,
                maxPrice: flightResponseData?.filters.price.max || 0,
              },
            },
          },
          true,
          true
        );
      }
      if (filterType === "stoppage") {
        return handleFilterFlights(
          {
            ...filters,
            filters: { ...filters.filters, stops: undefined },
          },
          true
        );
      }
      if (filterType === "airline") {
        return handleFilterFlights(
          {
            ...filters,
            filters: { ...filters.filters, airlines: undefined },
          },
          true
        );
      }
      return handleFilterFlights(
        {
          ...filters,
          filters: { ...filters.filters, [filterType]: undefined },
        },
        true
      );
    },
    [filters]
  );

  useEffect(() => {
    const {
      adults,
      children,
      infants,
      currency,
      departureDate,
      destination,
      max,
      origin,
      returnDate,
      travelClass,
      tripType,
    } = query;
    if (
      adults &&
      children &&
      infants &&
      currency &&
      departureDate &&
      destination &&
      max &&
      origin &&
      travelClass &&
      tripType
    ) {
      const dataObj = {
        adults: +adults,
        children: +children,
        infants: +infants,
        childrenDob: "2018-03-23",
        currency,
        departureDate,
        destination,
        max: +max,
        origin,
        returnDate,
        travelClass,
        tripType,
      };
      searchFlights(dataObj, {
        onSuccess: (data) => {
          if (data.data) {
            const responseData = data.data;
            setFlights(responseData.flights);
            setFilters({
              page: responseData.page,
              sort: responseData.sort,
              searchId: responseData.searchId,
              filters: {
                airlines: undefined,
                baggage: undefined,
                pricing: {
                  maxPrice: responseData.filters.price.max,
                  minPrice: responseData.filters.price.min,
                },
                schedule: undefined,
                stops: undefined,
              },
            });
            setCurrency(responseData.currency);
            setAircrafts(responseData.aircrafts);
            setAirlines(responseData.airlines);
            setDestinationAirports(responseData.destinationAirports);
            setOriginAirports(responseData.originAirports);
            setPage(responseData.page);
            setSearchId(responseData.searchId);
            setTtl(responseData.ttl);
            setTotalFlights(responseData.totalFlights);
          }
        },
      });
    }
  }, [searchFlights, query]);

  const value: IFlightSearchContext = {
    searchData: {
      error,
      status: status,
      aircrafts,
      airlines,
      destinationAirports,
      flights,
      originAirports,
      page,
      searchId,
      totalFlights,
      ttl,
      currency: currency,
      filters: {
        cheapestFlightPrice:
          flightResponseData?.filters.cheapestFlightPrice || 0,
        earliestFlightTime:
          flightResponseData?.filters.earliestFlightTime || "",
        fastestFlightDuration:
          flightResponseData?.filters.fastestFlightDuration || "",
        price: {
          min: flightResponseData?.filters.price.min || 0,
          max: flightResponseData?.filters.price.max || 0,
        },
      },
      sort: filters.sort,
    },
    filters,
    handleFilterFlights,
    filterLoading,
    isFilterApplied,
    resetFilter,
    getFiltersCount,
  };
  return (
    <FlightSearchContext.Provider value={value}>
      {children}
    </FlightSearchContext.Provider>
  );
};

export const useFlightSearchContext = () => useContext(FlightSearchContext);
