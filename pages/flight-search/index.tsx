import { FlightSearchContextProvider } from "@/context/flight-search/FlightSearchContext";
import FlightSearch from "../../components/pages/FlightSearch/FlightSearch";
import Layout from "../../layouts/Layout";

// interface ISearchFlightsRequest {
//   adults: string;
//   children: string;
//   childrenDob: string;
//   currency: string;
//   departureDate: string;
//   destination: string;
//   infants: string;
//   max: string;
//   origin: string;
//   returnDate: string;
//   travelClass: string;
//   tripType: string;
// }

const Search = () => {
  return (
    <Layout>
      <FlightSearchContextProvider>
        <FlightSearch />
      </FlightSearchContextProvider>
    </Layout>
  );
};

export default Search;
