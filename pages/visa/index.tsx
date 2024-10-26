import VisaPageComponent from "@/components/pages/Visa";
import Head from "next/head";

const VisaPage = () => {
  return (
    <>
      <Head>
        <title>
          Visa Consultants: Your Gateway to Visa Solutions Across Europe,
          America, Australia, Asia, and the Middle East.
        </title>
        <meta
          name="description"
          content="Looking for a visa? Explore visa solutions worldwide with OTA. From Canadian visas to Schengen visas, we've got you covered."
        />
        <meta
          name="keywords"
          content="Apply for Canadian visa, Australian visa, travel visa services, visitor visa immigration, tourist visa, business visa, Schengen visa, work visa, student visa"
        />
      </Head>
      <VisaPageComponent />
    </>
  );
};

export default VisaPage;
