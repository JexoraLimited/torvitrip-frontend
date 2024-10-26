import Banner from "@/components/shared/Banner";
import Layout from "@/layouts/Layout";
import UmrahPackages from "../Home/UmrahPackages/UmrahPackages";

const UmrahPageComponent = () => {
  return (
    <Layout>
      <Banner />
      <UmrahPackages />
    </Layout>
  );
};

export default UmrahPageComponent;
