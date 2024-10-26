import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import React from "react";
import { IoMdMail } from "react-icons/io";

interface IStepOne {
  handleNextStep: () => void;
}

const StepOne: React.FC<IStepOne> = ({ handleNextStep }) => {
  return (
    <>
      <h5 className="text-center text-3xl">Forgot Password?</h5>
      <p className="text-center text-sm text-muted-foreground font-medium mt-1">
        Please type your email to receive a confirmation code to set a new
        password
      </p>
      <div className="w-full mt-3">
        <Input
          type="text"
          inputContainerClassName="w-full"
          label="Email Address"
          placeholder="Enter your email address"
          inputPrefixClassName="border-r-0 pr-0 p-0 text-2xl text-neutral-400 pl-2"
          inputPrefix={
            <span>
              <IoMdMail />
            </span>
          }
        />
      </div>
      <div className="flex items-center justify-center gap-3 w-full mt-3">
        <Button
          onClick={handleNextStep}
          variant={"secondary"}
          className="flex-1"
        >
          Confirm Email
        </Button>
      </div>
    </>
  );
};

export default StepOne;
