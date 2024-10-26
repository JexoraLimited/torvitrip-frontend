import Layout from "../../../layouts/Layout";
import Banner from "../../shared/Banner";
import ExploreBangladesh from "./ExploreBangladesh";
import MostPopularDestinations from "./MostPopularDestinations";
import PaymentMethods from "./PaymentMethods/PaymentMethods";
import SearchOtherTopAirlines from "./SearchOtherTopAirlines/SearchOtherTopAirlines";
import Services from "./Services";
import TopTravelDestinations from "./TopTravelDestinations";

const HomeComponents = () => {
  return (
    <Layout navbarType="static">
      <Banner />
      <Services className="bg-gray-background" />
      <TopTravelDestinations />
      <ExploreBangladesh className="bg-gray-background" />
      <MostPopularDestinations />
      <SearchOtherTopAirlines className="bg-gray-background" />
      <PaymentMethods />
    </Layout>
  );
};

export default HomeComponents;
