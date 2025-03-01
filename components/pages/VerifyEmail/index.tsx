import verifyEmailSecondary from "@/assets/lotties/verify-email-secondary.json";
import { Button } from "@/components/ui/Button";
import { Keys } from "@/config";
import { useVerifyCode } from "@/hooks/api/auth";
import Layout from "@/layouts/Layout";
import { cn } from "@/utils/common";
import { decryptString } from "@/utils/encrypt";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa6";
import OTPInput from "react-otp-input";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const VerifyEmailPageComponent = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Decrypt the email when the component mounts
    const decryptedEmail = decryptString(
      router.query.e as string,
      Keys.ENCRYPTION_STRING
    );
    setEmail(decryptedEmail);
  }, [router.query.e]);
  const handleBack = () => {
    router.back();
  };
  // mutate
  const { mutate: verifyCode, status } = useVerifyCode();
  const onSubmit = () => {
    verifyCode(otp, {
      onSuccess: () => {
        router.replace("/");
      },
      onError: (err) => {
        toast.error(err.response?.data.message || "Something went wrong", {
          id: "VERIFY_CODE",
        });
      },
    });
  };
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
              animationData={verifyEmailSecondary}
              loop
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <h5 className="text-center text-3xl">Enter OTP</h5>
          <p className="text-center text-sm text-muted-foreground font-medium mt-1">
            Enter the OTP (One Time Password) we sent to{" "}
            <span className="font-semibold">{email}</span>
          </p>
          <div className="mt-3">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              inputType="number"
              containerStyle={{ gap: "10px", justifyContent: "center" }}
              renderInput={(props) => (
                <input
                  {...props}
                  className={cn(
                    "!w-[50px] border border-border outline-none bg-slate-100 rounded-lg !h-[50px] noNumberArrow"
                  )}
                />
              )}
            />
            <div className="flex items-center justify-center gap-3">
              <span>Didn&apos;t received the OTP?</span>{" "}
              <Button
                disabled
                variant={"ghost"}
                className="p-0 m-0 text-md select-none"
              >
                Resend
              </Button>{" "}
              <span>(00:59)</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 w-full mt-3">
            <Button
              onClick={onSubmit}
              isLoading={status === "loading"}
              disabled={otp?.length !== 4}
              variant={"secondary"}
              className="flex-1"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyEmailPageComponent;
