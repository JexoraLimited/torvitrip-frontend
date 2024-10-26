import Banner from "@/components/shared/Banner";
import Layout from "@/layouts/Layout";
import CheapestFlightInPopularRoute from "../Home/CheapestFlightInPopularRoute/CheapestFlightInPopularRoute";
import SearchOtherTopAirlines from "../Home/SearchOtherTopAirlines/SearchOtherTopAirlines";

const FlightPageComponent = () => {
  return (
    <Layout>
      <Banner type="flight" />
      <CheapestFlightInPopularRoute />
      <SearchOtherTopAirlines className="bg-gray-background" />
    </Layout>
  );
};

export default FlightPageComponent;
