import Banner from "@/components/shared/Banner";
import Layout from "@/layouts/Layout";
import PaymentMethods from "../Home/PaymentMethods/PaymentMethods";
import StudentVisa from "../Home/StudentVisa/StudentVisa";
import TouristVisa from "../Home/TouristVisa/TouristVisa";
import UmrahPackages from "../Home/UmrahPackages/UmrahPackages";

const VisaPageComponent = () => {
  return (
    <Layout>
      <Banner type="visa" />
      <UmrahPackages />
      <TouristVisa className="bg-gray-background" />
      <StudentVisa />
      <PaymentMethods className="bg-gray-background" />
    </Layout>
  );
};

export default VisaPageComponent;
