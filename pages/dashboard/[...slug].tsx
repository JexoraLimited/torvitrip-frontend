import Dashboard from "@/components/pages/Dashboard";
import WithAuth from "@/hoc/WithAuth";
import Layout from "@/layouts/Layout";
import Head from "next/head";

const DashboardPage = () => {
  return (
    <Layout>
      <Head>
        <title>Dashboard - OTA</title>
      </Head>
      <Dashboard />
    </Layout>
  );
};

export default WithAuth(DashboardPage);
