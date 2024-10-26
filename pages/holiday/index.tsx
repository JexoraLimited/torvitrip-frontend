import HolidayPageComponent from "@/components/pages/Holiday";
import Head from "next/head";

const TourPage = () => {
  return (
    <>
      <Head>
        <title>Holiday Packages | Cheap Vacation Deals - OTA</title>
        <meta
          name="description"
          content="Discover the best deals on cheap holiday packages and vacation deals for 2024. Plan your affordable and amazing holiday with OTA."
        />
        <meta
          name="keywords"
          content="cheap holiday packages, holiday deals, cheap vacations, vacation deals, cheap all-inclusive vacation packages"
        />
      </Head>
      <HolidayPageComponent />
    </>
  );
};

export default TourPage;
