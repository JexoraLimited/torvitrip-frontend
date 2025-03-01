import Head from "next/head";
import HomeComponents from "../components/pages/Home/HomeComponents";

export default function Home() {
  return (
    <>
      <Head>
        <title>TorviTrip</title>
        <meta
          name="description"
          content="TorviTrip: Book flights, hotels, holidays, and visas with ease. TorviTrip is an online travel agency that makes it easy to book flights, hotels, holidays, and visas. With our wide range of travel services and competitive prices, you can find the perfect travel deal for your next trip. We also offer a variety of travel insurance plans to protect you in case of unexpected events. Book your next trip today with TorviTrip!"
        />
        <meta
          name="keywords"
          content="flight booking, indigo flight booking, flight booking bd, best flight booking site, air india flight booking, emirates flight booking, qatar airways flight booking, cheapoair flight booking, ota, book flight tickets, cheap flights, flights"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="TorviTrip" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.torvitrip.com" />
        <meta property="og:image" content="/web_banner.png" />
      </Head>
      <HomeComponents />
    </>
  );
}
