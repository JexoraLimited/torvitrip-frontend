import HotelPageComponent from "@/components/pages/Hotel";
import Head from "next/head";

const HotelPage = () => {
  return (
    <>
      <Head>
        <title>Best Hotel Booking Site in Bangladesh | OTA</title>
        <meta
          name="description"
          content="Book your ideal stay with ease at the top hotel booking platform. Discover the best deals for hotels and flights with OTA!"
        />
        <meta
          name="keywords"
          content="Hotel reservations, hotel booking sites, book hotel, book hotel and flight, best hotel booking site, cheapest hotel booking site, online hotel booking platforms, Bangladesh hotels"
        />
      </Head>
      <HotelPageComponent />
    </>
  );
};

export default HotelPage;
