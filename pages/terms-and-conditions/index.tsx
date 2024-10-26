import Head from "next/head";
import TermsAndConditions from "../../components/pages/TermsAndConditions/TermsAndConditions";
import Layout from "../../layouts/Layout";

const index = () => {
  return (
    <Layout>
      <Head>
        <title>OTA Terms and Conditions</title>
        <meta
          name="description"
          content="Review OTA's terms and conditions before using"
        />
        <meta name="keywords" content="OTATerms, Conditions" />
      </Head>
      <TermsAndConditions />
    </Layout>
  );
};

export default index;
