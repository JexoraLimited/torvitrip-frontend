import Head from "next/head";
import MissionVisionValues from "../../components/pages/MissionVisionValues/MissionVisionValues";
import Layout from "../../layouts/Layout";

const index = () => {
  return (
    <Layout>
      <Head>
        <title>TorviTrip Mission, Vision and Values</title>
        <meta
          name="description"
          content="Empowering global travel solutions for an enriched world"
        />
        <meta name="keywords" content="Jmission, vision, values" />
      </Head>
      <MissionVisionValues />
    </Layout>
  );
};

export default index;
