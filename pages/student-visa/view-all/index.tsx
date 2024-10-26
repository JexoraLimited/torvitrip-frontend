import Head from "next/head";
import AllStudentVisa from "../../../components/pages/Home/StudentVisa/AllStudentVisa";
import Layout from "../../../layouts/Layout";

const StudentVisaViewAllPage = () => {
  return (
    <Layout>
      <Head>
        <title>
          Study Visa Services in Bangladesh | Apply for Student Visa Online
        </title>
        <meta
          name="description"
          content="Explore study visa options and apply hassle-free! Get expert guidance on work permits, dependent visas, study permits, and more."
        />
        <meta
          name="keywords"
          content="Study visa, work visa, dependent visa, spouse visa, study permit, work permit, apply for student visa, student visa consultants, study visa consultants, education visa, student visa working hours, international student visa"
        />
      </Head>
      <AllStudentVisa />
    </Layout>
  );
};

export default StudentVisaViewAllPage;
