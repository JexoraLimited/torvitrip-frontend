import { Button } from "@/components/ui/Button";
import {
  TRAVEL_CLASSES_WITH_LABEL,
  defaultAirportsMultiCity,
} from "@/data/flight";
import { FlightTypes } from "@/types/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { ISearchFlight } from ".";
import MultiCityRow from "./MultiCityRow";

const multiCitySchema = z.object({
  routes: z
    .array(
      z.object({
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
        dates: z.object({
          from: z.date({
            required_error: "From Date is required",
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
      })
    )
    .max(5),
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

type FormType = z.infer<typeof multiCitySchema>;

interface IOneAndRoundTrip extends ISearchFlight {
  tripType: FlightTypes;
}

const MultiCity: React.FC<IOneAndRoundTrip> = ({
  tripType,
  origins,
  destinations,
  fromDates,
  toDates,
  searchText,
  travelClass,
  travelers,
  type,
}) => {
  const [loading, setLoading] = useState(false);
  const currentDate = new Date();
  const router = useRouter();

  const defaultDatesOptions = [
    addDays(currentDate, 1),
    addDays(currentDate, 3),
  ];

  const MAX_ROUTES = 5;

  const otherDefaultRoutes =
    (origins?.length || 0) > 2
      ? origins?.slice(1, origins.length - 1).map((_, index) => {
          const startingIndex = index + 2;
          return {
            from: {
              airport:
                origins?.[startingIndex]?.airport_name ||
                defaultAirportsMultiCity[startingIndex].airport_name,
              city:
                origins?.[startingIndex]?.city ||
                defaultAirportsMultiCity[startingIndex].airport_name,
              country:
                origins?.[startingIndex]?.country ||
                defaultAirportsMultiCity[startingIndex].airport_name,
              iata_code:
                origins?.[startingIndex]?.iata_code ||
                defaultAirportsMultiCity[startingIndex].airport_name,
            },
            to: {
              airport:
                destinations?.[startingIndex]?.airport_name ||
                defaultAirportsMultiCity[startingIndex].airport_name,
              city:
                destinations?.[startingIndex]?.city ||
                defaultAirportsMultiCity[startingIndex].airport_name,
              country:
                destinations?.[startingIndex]?.country ||
                defaultAirportsMultiCity[startingIndex].airport_name,
              iata_code:
                destinations?.[startingIndex]?.iata_code ||
                defaultAirportsMultiCity[startingIndex].airport_name,
            },
            dates: {
              from:
                fromDates?.[startingIndex] ||
                defaultDatesOptions[startingIndex],
            },
          };
        }) || []
      : [];

  const { watch, control, setValue, getValues, handleSubmit } =
    useForm<FormType>({
      resolver: zodResolver(multiCitySchema),
      defaultValues: {
        routes: [
          {
            from: {
              airport:
                origins?.[0]?.airport_name ||
                defaultAirportsMultiCity[0].airport_name,
              city: origins?.[0]?.city || defaultAirportsMultiCity[0].city,
              country:
                origins?.[0]?.country || defaultAirportsMultiCity[0].country,
              iata_code:
                origins?.[0]?.iata_code ||
                defaultAirportsMultiCity[0].iata_code,
            },
            to: {
              airport:
                destinations?.[0]?.airport_name ||
                defaultAirportsMultiCity[1].airport_name,
              city: destinations?.[0]?.city || defaultAirportsMultiCity[1].city,
              country:
                destinations?.[0]?.country ||
                defaultAirportsMultiCity[1].country,
              iata_code:
                destinations?.[0]?.iata_code ||
                defaultAirportsMultiCity[1].iata_code,
            },
            dates: {
              from: fromDates?.[0] || defaultDatesOptions[0],
            },
          },
          {
            from: {
              airport:
                origins?.[1]?.airport_name ||
                defaultAirportsMultiCity[1].airport_name,
              city: origins?.[1]?.city || defaultAirportsMultiCity[1].city,
              country:
                origins?.[1]?.country || defaultAirportsMultiCity[1].country,
              iata_code:
                origins?.[1]?.iata_code ||
                defaultAirportsMultiCity[1].iata_code,
            },
            to: {
              airport:
                destinations?.[1]?.airport_name ||
                defaultAirportsMultiCity[2].airport_name,
              city: destinations?.[1]?.city || defaultAirportsMultiCity[2].city,
              country:
                destinations?.[1]?.country ||
                defaultAirportsMultiCity[2].country,
              iata_code:
                destinations?.[1]?.iata_code ||
                defaultAirportsMultiCity[2].iata_code,
            },
            dates: {
              from: toDates?.[1] || defaultDatesOptions[1],
            },
          },
          ...otherDefaultRoutes,
        ],
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

  const { fields, append, remove } = useFieldArray({
    name: "routes",
    control: control,
    rules: { maxLength: MAX_ROUTES },
  });

  const shuffleAirports = (index: number) => {
    const previousFrom = getValues(`routes.${index}.from`);
    const previousTo = getValues(`routes.${index}.to`);
    setValue(`routes.${index}.to`, previousFrom);
    setValue(`routes.${index}.from`, previousTo);
  };

  const handleAddRoute = (index: number) => {
    append({
      dates: { from: addDays(watch("routes")[index].dates.from, 2) },
      from: {
        airport: defaultAirportsMultiCity[index + 1].airport_name,
        city: defaultAirportsMultiCity[index + 1].city,
        country: defaultAirportsMultiCity[index + 1].country,
        iata_code: defaultAirportsMultiCity[index + 1].iata_code,
      },
      to: {
        airport: defaultAirportsMultiCity[index + 2].airport_name,
        city: defaultAirportsMultiCity[index + 2].city,
        country: defaultAirportsMultiCity[index + 2].country,
        iata_code: defaultAirportsMultiCity[index + 2].iata_code,
      },
    });
  };

  const handleRemoveRoute = (index: number) => {
    remove(index);
  };

  const handleSearch = (data: FormType) => {
    setLoading(true);
    router.push({
      pathname: "/flight-search",
      query: {
        origin: data.routes.map((route) => route.from.iata_code).join(","),
        destination: data.routes.map((route) => route.to.iata_code).join(","),
        departureDate: data.routes
          .map((route) => moment(route.dates.from).format("YYYY-MM-DD"))
          .join(","),
        adults: data.bookingInfo.travelers.adults,
        children: data.bookingInfo.travelers.children,
        infants: data.bookingInfo.travelers.infants,
        currency: localStorage?.getItem("currency") || "BDT",
        tripType: tripType,
        travelClass: data.bookingInfo.class.value,
        max: 10,
      },
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleSearch)}>
        {fields.map((field, i) => (
          <MultiCityRow
            control={control}
            getValues={getValues}
            watch={watch}
            handleAddRoute={handleAddRoute}
            handleRemoveRoute={handleRemoveRoute}
            index={i}
            canAdded={fields.length < MAX_ROUTES && i + 1 === fields.length}
            canRemoved={fields.length !== 2}
            shuffle={shuffleAirports}
            setValue={setValue}
            key={field.id}
          />
        ))}
        <Button
          isLoading={loading}
          type="submit"
          className="gap-4 mx-auto flex mt-5 w-full md:w-auto px-16 font-bold"
        >
          {searchText || "Search Flight"}
        </Button>
      </form>
    </>
  );
};

export default MultiCity;
