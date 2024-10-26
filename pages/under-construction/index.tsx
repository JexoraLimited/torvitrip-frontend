import Head from "next/head";
import { useRouter } from "next/router";
import { BsArrowLeft } from "react-icons/bs";
import { nunitoSans } from "../../fonts/google";

const UnderConstruction = () => {
  const router = useRouter();
  return (
    <div className="flex items-center flex-col justify-center w-full h-screen">
      <Head>
        <title>This page is under construction</title>
        <meta
          name="description"
          content="This page is under construction! Check out this page later."
        />
      </Head>
      <h3
        className={`text-3xl md:text-5xl text-center font-bold ${nunitoSans.className}`}
      >
        This <span className="text-primary">page</span> is under{" "}
        <span className="text-secondary">construction</span>
      </h3>
      <button
        onClick={() => router.back()}
        className="px-[30px] h-[35px] flex gap-3 items-center justify-center rounded-md bg-secondary text-white mt-5"
      >
        <BsArrowLeft className="text-[25px]" /> Go Back
      </button>
    </div>
  );
};

export default UnderConstruction;
