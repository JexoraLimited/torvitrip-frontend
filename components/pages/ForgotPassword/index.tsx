import forgotPasswordLottiePrimary from "@/assets/lotties/forgot-password-primary.json";
import forgotPasswordLottieSecondary from "@/assets/lotties/forgot-password-secondary.json";
import Layout from "@/layouts/Layout";
import Lottie from "lottie-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import StepFour from "./StepFour";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";

const ForgotPasswordPageComponent = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const handleNextStep = () => {
    if (step === STEPS.length - 1) {
      return router.replace("/auth/signin");
    }
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step === 0) {
      router.back();
    } else {
      setStep((step) => step - 1);
    }
  };

  const STEPS = [
    <StepOne key={1} handleNextStep={handleNextStep} />,
    <StepTwo key={2} handleNextStep={handleNextStep} />,
    <StepThree key={2} handleNextStep={handleNextStep} />,
    <StepFour key={2} handleNextStep={handleNextStep} />,
  ];
  return (
    <Layout>
      <Head>
        <title>Reset Your Password - OTA</title>
      </Head>
      <div className="min-h-screen bg-gray py-10 md:px-0 px-4">
        <div className="flex flex-col relative items-center justify-center max-w-[500px] mx-auto rounded-2xl bg-white p-4 md:p-10">
          <div
            onClick={handleBack}
            className="absolute left-5 top-5 cursor-pointer flex items-center gap-2"
          >
            <FaArrowLeft className="text-muted-foreground" />
            <h5 className="font-medium text-muted-foreground leading-[13px]">
              Back
            </h5>
          </div>
          <div className="w-[250px] h-[250px]">
            <Lottie
              animationData={
                step === 0
                  ? forgotPasswordLottieSecondary
                  : forgotPasswordLottiePrimary
              }
              loop
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          {STEPS[step]}
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPasswordPageComponent;
