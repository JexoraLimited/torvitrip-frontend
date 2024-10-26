import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { password_regex } from "@/constants/regex";
import { useChangePassword } from "@/hooks/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { RiKeyFill } from "react-icons/ri";
import { z } from "zod";

const formSchema = z
  .object({
    current_password: z
      .string({ required_error: "Password is required" })
      .regex(password_regex, { message: "Invalid password" }),
    new_password: z
      .string({ required_error: "New Password is required" })
      .regex(password_regex, { message: "Invalid password" }),
    confirm_new_password: z
      .string({
        required_error: "New Password is required",
      })
      .regex(password_regex, { message: "Invalid password" }),
  })
  .refine((data) => data.confirm_new_password === data.new_password, {
    message: "Passwords doesn't match",
    path: ["confirm_new_password"],
  });

type FormType = z.infer<typeof formSchema>;

const ChangePassword = () => {
  const { control, handleSubmit, reset } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirm_new_password: "",
      current_password: "",
      new_password: "",
    },
  });
  const { mutate: changePassword } = useChangePassword();
  const [passwordVisible, setPasswordVisible] = useState({
    current_password: false,
    new_password: false,
    confirm_new_password: false,
  });
  const handlePasswordToggle = (type: keyof typeof passwordVisible) => {
    setPasswordVisible((pv) => ({ ...pv, [type]: !pv[type] }));
  };

  const handleChangePassword = async (data: FormType) => {
    toast.loading("Changing password", { id: "CHANGE_PASSWORD" });
    changePassword(
      {
        new_password: data.new_password,
        old_password: data.current_password,
      },
      {
        onSuccess: () => {
          toast.success("Changing password", { id: "CHANGE_PASSWORD" });
          reset({
            confirm_new_password: "",
            current_password: "",
            new_password: "",
          });
        },
        onError: (err) => {
          toast.error(err.response?.data.message || "Something went wrong", {
            id: "CHANGE_PASSWORD",
          });
        },
      }
    );
  };
  return (
    <div className="p-5 w-full h-full font-nunito-sans">
      <h5 className="text-2xl md:text-3xl font-bold text-center">
        Change Your password
      </h5>
      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className="md:w-1/2 mt-5 space-y-3"
      >
        <Controller
          control={control}
          name="current_password"
          render={({ field, fieldState: { error } }) => (
            <div className="w-full">
              <Input
                {...field}
                type={passwordVisible.current_password ? "text" : "password"}
                error={error}
                label="Current Password"
                placeholder="Enter your current password"
                inputPrefixClassName="border-r-0 pr-0 p-0 text-2xl text-neutral-400 pl-2"
                required
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
                    onClick={() => handlePasswordToggle("current_password")}
                    className="text-xl text-neutral-400"
                  >
                    {passwordVisible.current_password ? (
                      <AiFillEyeInvisible />
                    ) : (
                      <AiFillEye />
                    )}
                  </button>
                }
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="new_password"
          render={({ field, fieldState: { error } }) => (
            <div className="w-full">
              <Input
                {...field}
                type={passwordVisible.new_password ? "text" : "password"}
                error={error}
                label="New Password"
                placeholder="Enter your new password"
                inputPrefixClassName="border-r-0 pr-0 p-0 text-2xl text-neutral-400 pl-2"
                required
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
                    onClick={() => handlePasswordToggle("new_password")}
                    className="text-xl text-neutral-400"
                  >
                    {passwordVisible.new_password ? (
                      <AiFillEyeInvisible />
                    ) : (
                      <AiFillEye />
                    )}
                  </button>
                }
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="confirm_new_password"
          render={({ field, fieldState: { error } }) => (
            <div className="w-full">
              <Input
                {...field}
                type={
                  passwordVisible.confirm_new_password ? "text" : "password"
                }
                error={error}
                label="Confirm Password"
                placeholder="Confirm your new password"
                inputPrefixClassName="border-r-0 pr-0 p-0 text-2xl text-neutral-400 pl-2"
                required
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
                    onClick={() => handlePasswordToggle("confirm_new_password")}
                    className="text-xl text-neutral-400"
                  >
                    {passwordVisible.confirm_new_password ? (
                      <AiFillEyeInvisible />
                    ) : (
                      <AiFillEye />
                    )}
                  </button>
                }
              />
            </div>
          )}
        />
        <div className="flex items-center justify-end gap-3">
          <Button type="submit" variant={"default"}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
