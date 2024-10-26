import Banner from "@/components/shared/Banner";
import Layout from "@/layouts/Layout";
import HolidayPackages from "../Home/HolidayPackages/HolidayPackages";

const HolidayPageComponent = () => {
  return (
    <Layout>
      <Banner type="tour" />
      <HolidayPackages />
    </Layout>
  );
};

export default HolidayPageComponent;
