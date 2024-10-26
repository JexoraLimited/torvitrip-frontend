import AllHotelBooking from "@/components/pages/Home/HotelBooking/AllHotelBooking/AllHotelBooking";
import Head from "next/head";
import Layout from "../../../layouts/Layout";

const AllHotelBookingPage = () => {
  return (
    <Layout>
      <Head>
        <title>Best Hotel Booking Sites in Bangladesh | OTA</title>
        <meta
          name="description"
          content="Book your ideal stay with ease at the top hotel booking platform. Discover the best deals for hotels and flights with OTA!"
        />
        <meta
          name="keywords"
          content="Hotel reservations, hotel booking sites, book hotel, book hotel and flight, best hotel booking site, cheapest hotel booking site, online hotel booking platforms, Bangladesh hotels"
        />
      </Head>
      <AllHotelBooking />
    </Layout>
  );
};

export default AllHotelBookingPage;
