import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/common";
import React, { useState } from "react";
import OtpInput from "react-otp-input";

interface IStepTwo {
  handleNextStep: () => void;
}

const StepThree: React.FC<IStepTwo> = ({ handleNextStep }) => {
  const [otp, setOtp] = useState("");
  return (
    <>
      <h5 className="text-center text-3xl">Enter OTP</h5>
      <p className="text-center text-sm text-muted-foreground font-medium mt-1">
        Enter the OTP (One Time Password) You received.
      </p>
      <div className="mt-3">
        <OtpInput
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
      </div>
      <div className="flex items-center justify-center gap-3 w-full mt-3">
        <Button
          onClick={handleNextStep}
          variant={"secondary"}
          className="flex-1"
        >
          Send
        </Button>
      </div>
    </>
  );
};

export default StepThree;
