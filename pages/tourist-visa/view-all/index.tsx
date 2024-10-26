import AllTouristVisa from "@/components/pages/Home/TouristVisa/AllTouristVisa";
import Head from "next/head";
import Layout from "../../../layouts/Layout";

const TouristVisaViewAllPage = () => {
  return (
    <Layout>
      <Head>
        <title>
          Tourist Visa Consultants: Your Gateway to Visa Solutions Across
          Europe, America, Australia, Asia, and the Middle East.
        </title>
        <meta
          name="description"
          content="Looking for a tourist visa? Explore visa solutions worldwide with OTA. From Canadian tourist visas to Schengen visas, we've got you covered."
        />
        <meta
          name="keywords"
          content="Canadian tourist visa, apply for Australian tourist visa, travel visa services, visitor visa immigration, tourist visa, business visa, Schengen visa"
        />
      </Head>
      <AllTouristVisa />
    </Layout>
  );
};

export default TouristVisaViewAllPage;
