import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { RiKeyFill } from "react-icons/ri";

interface IStepFour {
  handleNextStep: () => void;
}

const StepFour: React.FC<IStepFour> = ({ handleNextStep }) => {
  const [passwordVisible, setPasswordVisible] = useState({
    password: false,
    confirm_password: false,
  });
  const handlePasswordToggle = (name: keyof typeof passwordVisible) => {
    setPasswordVisible((prev) => ({ ...prev, [name]: !prev[name] }));
  };
  return (
    <>
      <h5 className="text-center text-3xl">New Password</h5>
      <p className="text-center text-sm text-muted-foreground font-medium mt-1">
        Enter the new password you want to set and confirm it
      </p>
      <div className="w-full mt-3 flex flex-col gap-3">
        <div>
          <Input
            type={passwordVisible.password ? "text" : "password"}
            label="New Password"
            placeholder="Enter your new password"
            inputPrefixClassName="border-r-0 pr-0 p-0 text-2xl text-neutral-400 pl-2"
            inputPrefix={
              <span>
                <RiKeyFill />
              </span>
            }
            inputSuffixClassName="border-l-0"
            className="px-2 text-sm"
            inputSuffix={
              <button
                type="button"
                onClick={() => handlePasswordToggle("password")}
                className="text-xl text-neutral-400"
              >
                {passwordVisible.password ? (
                  <AiFillEyeInvisible />
                ) : (
                  <AiFillEye />
                )}
              </button>
            }
          />
        </div>
        <div>
          <Input
            type={passwordVisible.confirm_password ? "text" : "password"}
            label="Confirm Password"
            placeholder="Confirm your new password"
            inputSuffixClassName="border-l-0"
            inputPrefixClassName="border-r-0 pr-0 p-0 text-2xl text-neutral-400 pl-2"
            inputPrefix={
              <span>
                <RiKeyFill />
              </span>
            }
            className="px-2 text-sm"
            inputSuffix={
              <button
                type="button"
                onClick={() => handlePasswordToggle("confirm_password")}
                className="text-xl text-neutral-400"
              >
                {passwordVisible.confirm_password ? (
                  <AiFillEyeInvisible />
                ) : (
                  <AiFillEye />
                )}
              </button>
            }
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 w-full mt-5">
        <Button
          onClick={handleNextStep}
          variant={"secondary"}
          className="flex-1"
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default StepFour;
