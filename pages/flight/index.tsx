import FlightPageComponent from "@/components/pages/Flight";
import Head from "next/head";

const FlightPage = () => {
  return (
    <>
      <Head>
        <title>Best Flight Bookings in Bangladesh</title>
        <meta
          name="description"
          content="Find air ticket prices in Bangladesh. Book cheap airline tickets online with OTA - your go-to flight booking website!"
        />
        <meta
          name="keywords"
          content="Flight booking BD, domestic air ticket price in Bangladesh, cheap airline tickets, flight booking website"
        />
      </Head>
      <FlightPageComponent />
    </>
  );
};

export default FlightPage;
