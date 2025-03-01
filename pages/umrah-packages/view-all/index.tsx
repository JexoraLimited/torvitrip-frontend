import AllUmrahPackages from "@/components/pages/Home/UmrahPackages/AllUmrahPackages";
import Head from "next/head";
import Layout from "../../../layouts/Layout";

const AllUmrahPackagesPage = () => {
  return (
    <Layout>
      <Head>
        <title>
          Best Umrah Packages 2024 | Low Price & Family-Friendly Tours - OTA
        </title>
        <meta
          name="description"
          content="Discover cheap Umrah packages in 2024! Book family-friendly and low-cost Umrah tours with TorviTrip for an unforgettable spiritual journey."
        />
        <meta
          name="keywords"
          content="cheap Umrah package, family Umrah packages 2024, Umrah package 2024, low price Umrah packages, group Umrah packages 2024"
        />
      </Head>
      <AllUmrahPackages />
    </Layout>
  );
};

export default AllUmrahPackagesPage;
