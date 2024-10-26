import { FlightSort } from "../common";

export interface IFlightFilterQuery {
  page: number;
  searchId: string;
  filters?: {
    airlines?: string[];
    stops?: "non-stop" | "one-stop" | "two-and-up";
    baggage?: { type: "quantity" | "weight"; amount: number }[];
    schedule?: { departure: string[]; arrival: string[] };
    pricing?: {
      minPrice: number;
      maxPrice: number;
    };
    refundability?: "refundable" | "non-refundable" | "partially-refundable";
  };
  sort: FlightSort;
}
