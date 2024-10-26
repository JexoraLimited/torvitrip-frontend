import { TravelerType } from "@/data/flight";
import React from "react";

export interface ISelectValue<label = string, value = string> {
  label: label;
  value: value;
}
export type Gender = "male" | "female" | "others";

export interface IAirport extends IDocumentWithoutTimestamp {
  airport_name: string;
  city: string;
  country: string;
  iata_code: string;
  icao_code: string;
  latitude: number;
  longitude: number;
  altitude: number;
  timezone: string;
}

export interface IAirline extends IDocumentWithoutTimestamp {
  airline_name: string;
  callsign: string;
  country: string;
  iata_code: string;
  icao_code: string;
  logo: string;
}

export interface IAirCraft extends IDocumentWithoutTimestamp {
  aircraft_name: string;
  country: string;
  iata_code: string;
  icao_code: string;
  capacity?: number;
}

export interface IItinerary {
  code: string;
  flightDuration: string;
  segments: {
    departure: {
      iataCode: string;
      airport: IAirport;
      terminal: string;
      at: string;
    };
    arrival: {
      iataCode: string;
      airport: IAirport;
      terminal: string;
      at: string;
    };
    aircraft: {
      aircraft_name: string;
      icao_code: string;
      iata_code: string;
      capacity: string;
      country: string;
    };
    airline: IAirline;
    duration: string;
    number: string;
    cabin: string;
    class: string;
  }[];
}

export type Refundable =
  | "refundable"
  | "non-refundable"
  | "partially-refundable";

export interface IFlightBaggage {
  segment: string;
  type: "weight" | "quantity";
  weight?: number;
  unit?: string;
  quantity?: number;
  cabin: string;
}

export interface IFlightTraveler {
  id: string;
  fareOption: string;
  type: TravelerType;
  price: {
    base: number;
    total: number;
    tax: number;
    currency: string;
  };
}

export interface IFlight {
  code: string;
  refundable: Refundable;
  changeable: boolean;
  instantTicketingRequired: boolean;
  lastTicketingDateTime: string;
  bookableSeats: number;
  itineraries: IItinerary[];
  price: number;
  currency: string;
  baggage: IFlightBaggage[];
  pricingDetails: {
    base: number;
    total: number;
    tax: number;
    travelers: IFlightTraveler[];
  };
}

export interface IFlightOfferSearchResponse {
  flights: IFlight[];
  destinationAirports: IAirport[];
  originAirports: IAirport[];
  airlines: { airline: IAirline; count: number; price: number }[];
  aircrafts: { aircraft: IAirCraft; count: number; price: number }[];
  page: number;
  searchId: string;
  ttl: number;
  totalFlights: number;
  currency: string;
  filters: {
    price: {
      min: number;
      max: number;
    };
    earliestFlightTime: string;
    cheapestFlightPrice: number;
    fastestFlightDuration: string;
  };
  sort: FlightSort;
}

export interface IFlightFilterResponse {
  flights: IFlight[];
  page: number;
  searchId: string;
  ttl: number;
  totalFlights: number;
}
[];

export type FlightTypes = "one-way" | "round-trip" | "multi-city";

export interface ICSBox {
  label: string;
  value: string;
}

export type UserRoles = "freelancer" | "client";

export interface APIResponse<T = any> {
  success: boolean;
  responseStatus: string;
  message: string;
  statusCode: number;
  data: T;
  errorMessages: { path: string; message: string }[];
}

export interface IPaginatedAPIResponse<T = any> {
  success: boolean;
  responseStatus: string;
  message: string;
  statusCode: number;
  data: {
    docs: T[];
    totalDocs: number;
    offset: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: null | number;
    nextPage: null | number;
  };
  errorMessages: { path: string; message: string }[];
}
export type TravelerTitle =
  | "Mr"
  | "Ms"
  | "Mrs"
  | "Dr"
  | "Engr"
  | "Prof"
  | "Miss";

export interface ITraveler extends IDocument {
  title: TravelerTitle;
  given_name: string;
  surname: string;
  gender: Gender;
  nationality: {
    country_code: string;
    country_name: string;
  };
  email: string;
  phone: string;
  birth_date: Date;
  frequent_flyer_number?: string;
  passport_number: string;
  passport_expiry_date: Date;
  passport_issue_date: Date;
  passport_img?: IFile;
  visa_img?: IFile;
  user: IUser;
  myself: boolean;
}

export type Provider = "google" | "facebook";

export interface IDocument {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IDocumentWithoutTimestamp {
  _id: string;
  __v: number;
}

export interface IFile {
  _id: string;
  src: string;
  size?: number;
  key?: string;
  mimetype?: string;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface IAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

export interface IUser extends IDocument {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  permissions: string[];
  profile_pic: IFile | null;
  phone: string;
  email_verified: boolean;
  is_banned: boolean;
  address: IAddress | null;
  full_name: string;
}

export interface Tab {
  visible: boolean;
  accessible: boolean;
  title: string;
  href: string;
  icon: React.ReactNode;
  element: React.ReactNode;
  submenus?: Omit<Tab, "submenus">[];
}

export interface ITimezone {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

export interface ILocation {
  name: string;
  isoCode: string;
  flag: string;
  phonecode: string;
  currency: string;
  latitude: string;
  longitude: string;
  timezones: ITimezone[];
}

export type DeleteAccountReason =
  | "I would like to reduce my digital footprint on the Internet."
  | "I accidentally created my account at ShareTrip."
  | "I have another ShareTrip account."
  | "I didn't find ShareTrip useful."
  | "I receive too many emails from ShareTrip."
  | "I have a privacy concern."
  | "Other (please explain further).";

export type QueryStatus = "error" | "idle" | "loading" | "success";

export type FlightSort = "cheapest" | "fastest" | "earliest";

export type NavbarType = "interactive" | "static";
