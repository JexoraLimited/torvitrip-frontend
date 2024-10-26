import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/common";
import React, { useState } from "react";
import { IoMdCall, IoMdMail } from "react-icons/io";

interface IStepTwo {
  handleNextStep: () => void;
}

const StepTwo: React.FC<IStepTwo> = ({ handleNextStep }) => {
  const [selectedMethod, setSelectedMethod] = useState<"email" | "phone">(
    "email"
  );
  return (
    <>
      <h5 className="text-center text-3xl">Where to send code?</h5>
      <p className="text-center text-sm text-muted-foreground font-medium mt-1">
        Whether to send OTP via email address or phone number
      </p>
      <div className="w-full mt-3 flex flex-col md:flex-row items-center gap-3">
        <div
          onClick={() => setSelectedMethod("email")}
          className={cn(
            "bg-slate-100 border border-slate-300 rounded-lg cursor-pointer flex-1 flex items-center gap-3 px-3 py-2 select-none w-full md:w-auto",
            selectedMethod === "email" && "bg-secondary/20 border-secondary"
          )}
        >
          <IoMdMail className="text-muted-foreground" />{" "}
          <h5 className="text-muted-foreground text-sm">
            as*********a@gmail.com
          </h5>
        </div>
        <div
          onClick={() => setSelectedMethod("phone")}
          className={cn(
            "bg-slate-100 border border-slate-300 rounded-lg cursor-pointer flex-1 flex items-center gap-3 px-3 py-2 select-none w-full md:w-auto",
            selectedMethod === "phone" && "bg-secondary/20 border-secondary"
          )}
        >
          <IoMdCall className="text-muted-foreground" />{" "}
          <h5 className="text-muted-foreground text-sm">+880*********91</h5>
        </div>
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

export default StepTwo;
