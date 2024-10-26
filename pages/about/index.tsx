import Head from "next/head";
import About from "../../components/pages/About/About";
import Layout from "../../layouts/Layout";

const index = () => {
  return (
    <Layout>
      <Head>
        <title>Discover OTA</title>
        <meta
          name="description"
          content="Learn about OTA - Your Ultimate Travel Companion"
        />
        <meta name="keywords" content="OTA, About, Company" />
      </Head>
      <About />
    </Layout>
  );
};

export default index;
