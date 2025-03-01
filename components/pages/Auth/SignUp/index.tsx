import Facebook from "@/assets/images/social/facebook.png";
import Google from "@/assets/images/social/google.png";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/CheckBox";
import DialCodeDropDown from "@/components/ui/DialCodeDropdown";
import { Input } from "@/components/ui/Input";
import { Keys } from "@/config";
import { password_regex } from "@/constants/regex";
import { authenticate, setUser } from "@/features/auth/authSlice";
import { useGetMe, useSignUp } from "@/hooks/api/auth";
import { useAppDispatch } from "@/hooks/redux";
import { APIResponse } from "@/types/common";
import { formatPhoneNumber } from "@/utils/common";
import { encryptString } from "@/utils/encrypt";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { RiKeyFill } from "react-icons/ri";
import { z } from "zod";

const changeForm = {
  initial: {
    display: "block",
    transition: {
      delay: 0.3,
    },
  },
  animate: {
    display: "none",
    transition: {
      delay: 0.3,
    },
  },
};

interface ISignUpForm {}

const formSchema = z
  .object({
    first_name: z.string().min(1, "First Name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .email("Please enter a valid email")
      .min(1, "Email is required"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(50, { message: "Password must not exceed 50 characters" })
      .regex(password_regex, {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
      })
      .refine((value) => value.trim() !== "", {
        message: "Password is required",
      }),
    confirm_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(50, { message: "Password must not exceed 50 characters" })
      .regex(password_regex, {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
      })
      .refine((value) => value.trim() !== "", {
        message: "Password is required",
      }),
    accept_terms_conditions: z.boolean({
      required_error: "Please accept our terms & conditions",
    }),
    phone: z.object({
      dial_code: z.string({ required_error: "Dial code is required" }),
      phone_number: z
        .string({ required_error: "Phone number is required" })
        .min(4, { message: "Phone number is required" }),
    }),
  })
  .refine((data) => data.accept_terms_conditions, {
    message: "Please accept our terms & conditions",
    path: ["accept_terms_conditions"],
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

type FormSchema = z.infer<typeof formSchema>;

const SignUpPage: React.FC<ISignUpForm> = ({}) => {
  const [passwordVisible, setPasswordVisible] = useState({
    password: false,
    confirm_password: false,
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleSubmit, control } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: {
        dial_code: "880",
        phone_number: undefined,
      },
    },
  });

  const { mutateAsync, status } = useSignUp();

  const dispatch = useAppDispatch();

  const { refetch: refetchUserDetails } = useGetMe({
    queryKey: "me",
    enabled: false,
    refetchOnWindowFocus: true,
    retry: 0,
  });

  const handlePasswordToggle = (name: keyof typeof passwordVisible) => {
    setPasswordVisible((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const onSubmit = async (values: FormSchema) => {
    const { email, first_name, last_name, password, phone } = values;
    try {
      setIsLoading(true);
      const response = await mutateAsync({
        email,
        first_name,
        last_name,
        password,
        phone: formatPhoneNumber(phone.dial_code, phone.phone_number),
        role: "traveler",
      });
      dispatch(
        authenticate({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
          exp: response.data.exp,
          set_cookie: true,
          authenticated: false,
        })
      );
      if (response.success) {
        const refetchData = await refetchUserDetails();
        const user = refetchData.data?.data;
        if (user) {
          dispatch(setUser({ user, authenticate: true }));
          setIsLoading(false);
          router.replace(
            `/verify-email?e=${encryptString(
              email as string,
              Keys.ENCRYPTION_STRING
            )}`
          );
        }
      }
    } catch (e) {
      setIsLoading(false);
      const error = e as unknown as AxiosError<APIResponse>;
      toast.error(error.response?.data?.message as string, { id: "SIGN_UP" });
    }
  };

  return (
    <motion.form
      variants={changeForm}
      className="mx-auto w-full max-w-[418px] px-6 py-8 text-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="mb-3 text-center text-xl font-medium leading-normal text-primary-heading lg:text-[28px] lg:leading-10">
        Create an Account
      </h1>

      <div className="flex w-full flex-col gap-3">
        <div className="flex flex-col gap-[0.4rem] text-primary-heading md:flex-row  md:gap-[1.13rem]">
          <div className="flex flex-col items-start gap-0.5">
            <Controller
              name="first_name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label="First Name"
                  type="text"
                  required
                  placeholder="First Name"
                  error={error}
                  className="px-2 text-sm"
                  inputContainerClassName="font-inter"
                  inputPrefixClassName="border-r-0 pr-0 p-0 text-lg text-neutral-400 pl-2.5"
                  inputPrefix={
                    <span>
                      <FaUser />
                    </span>
                  }
                />
              )}
            />
          </div>
          <div className="flex flex-col items-start gap-0.5">
            <Controller
              control={control}
              name="last_name"
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label="Last Name"
                  type="text"
                  required
                  placeholder="Last Name"
                  error={error}
                  className="px-2 text-sm"
                  inputContainerClassName="font-inter"
                  inputPrefixClassName="border-r-0 pr-0 p-0 text-lg text-neutral-400 pl-2.5"
                  inputPrefix={
                    <span>
                      <FaUser />
                    </span>
                  }
                />
              )}
            />
          </div>
        </div>

        {/* email */}
        <div className="flex flex-col items-start gap-0.5">
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                label="Email"
                type="email"
                placeholder="Enter your Email"
                error={error}
                required
                className="px-2 text-sm"
                inputContainerClassName="font-inter"
                inputPrefixClassName="border-r-0 pr-0 p-0 text-2xl text-neutral-400 pl-2"
                inputPrefix={
                  <span>
                    <IoMdMail />
                  </span>
                }
              />
            )}
          />
        </div>

        {/* Phone number */}
        <div className="flex flex-col items-start gap-0.5">
          <Controller
            name="phone.phone_number"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                type="tel"
                label="Mobile Number"
                placeholder="Enter your mobile number"
                name="mobile"
                required
                error={error}
                inputPrefix={
                  <Controller
                    control={control}
                    name="phone.dial_code"
                    render={({ field }) => (
                      <DialCodeDropDown
                        {...field}
                        onChange={(value: any) => {
                          field.onChange(value.value);
                        }}
                        className="min-w-[100px] h-[40px]"
                      />
                    )}
                  />
                }
                inputPrefixClassName="border-l-0 px-0"
                className="px-2 text-sm"
              />
            )}
          />
        </div>

        {/* Password */}
        <div className="flex w-full flex-col items-start gap-0.5">
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                type={passwordVisible.password ? "text" : "password"}
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
            )}
          />
        </div>
        {/* Confirm Password */}
        <div className="flex w-full flex-col items-start gap-0.5">
          <Controller
            control={control}
            name="confirm_password"
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                type={passwordVisible.confirm_password ? "text" : "password"}
                error={error}
                required
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
            )}
          />
        </div>

        <Controller
          control={control}
          name="accept_terms_conditions"
          render={({
            field: { onChange, value, ref },
            fieldState: { error },
          }) => (
            <div className="flex w-full flex-col items-start justify-center gap-0.5">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={value}
                  onCheckedChange={onChange}
                  id="accept_terms_conditions"
                />
                <label
                  htmlFor="accept_terms_conditions"
                  className="select-none font-inter font-medium text-primary-heading"
                >
                  <span className="-ml-1 select-none font-inter text-xs md:leading-[28px]">
                    I accept the{" "}
                    <span className="text-[#EF4F4E]">TorviTrip Term</span> &{" "}
                    <span className="text-[#EF4F4E]">Privacy Policy</span>{" "}
                  </span>
                </label>
              </div>
              {error && (
                <p className="font-inter text-xs text-red-400">
                  {error.message}
                </p>
              )}
            </div>
          )}
        />

        <div className="text-center">
          <Button
            isLoading={isLoading}
            type="submit"
            variant={"secondary"}
            className="w-full shadow-sm"
          >
            Register
          </Button>
        </div>
      </div>

      <div className="mt-[0.63rem]">
        <p className="text-[14px] font-normal text-primary-heading">
          Already have an account?
          <span className="text-primary font-bold">
            <Link href="/auth/signin"> Login</Link>
          </span>
        </p>
      </div>
      <div className="mt-1">
        <p className="text-[14px] font-normal text-primary-heading">
          Register with
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 py-2">
        <Button
          type="button"
          variant={"neutral"}
          className="flex-1 bg-slate-100 hover:bg-slate-100 gap-3 text-md"
        >
          <Image src={Google} alt="google" width={25} height={25} />
          <span>Google</span>
        </Button>
        <Button
          variant={"neutral"}
          type="button"
          className="flex-1 bg-slate-100 hover:bg-slate-100 gap-3 text-md"
        >
          <Image src={Facebook} alt="facebook" width={25} height={25} />
          <span>Facebook</span>
        </Button>
      </div>
    </motion.form>
  );
};

export default SignUpPage;
