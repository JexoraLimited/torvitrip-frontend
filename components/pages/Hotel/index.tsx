import Banner from "@/components/shared/Banner";
import Layout from "@/layouts/Layout";
import HotelBooking from "../Home/HotelBooking/HotelBooking";

const HotelPageComponent = () => {
  return (
    <Layout>
      <Banner type="hotel" />
      <HotelBooking className="bg-gray-background" />
    </Layout>
  );
};

export default HotelPageComponent;
