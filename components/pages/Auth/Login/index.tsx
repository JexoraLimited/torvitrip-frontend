import Facebook from "@/assets/images/social/facebook.png";
import Google from "@/assets/images/social/google.png";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/CheckBox";
import { Input } from "@/components/ui/Input";
import { Keys } from "@/config";
import { authenticate, setUser } from "@/features/auth/authSlice";
import { useGetMe, useSignIn } from "@/hooks/api/auth";
import { useAppDispatch } from "@/hooks/redux";
import { APIResponse } from "@/types/common";
import { encryptString } from "@/utils/encrypt";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IoMdMail } from "react-icons/io";
import { RiKeyFill } from "react-icons/ri";
import { z } from "zod";

interface ILoginForm {}

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

const validationSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(1, "Password must be at least 8 characters long"),
  rememberMe: z.boolean({ required_error: "Remember me is required" }),
});

type FormSchema = z.infer<typeof validationSchema>;

function LoginPage({}: ILoginForm) {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      rememberMe: true,
    },
  });

  const { refetch: refetchUserDetails } = useGetMe({
    queryKey: "me",
    enabled: false,
    refetchOnWindowFocus: true,
    retry: 0,
  });

  const { mutateAsync: signIn } = useSignIn();
  const dispatch = useAppDispatch();

  const onSubmit = async (values: FormSchema) => {
    try {
      setIsLoading(true);
      const res = await signIn({
        email: values.email,
        password: values.password,
      });

      dispatch(
        authenticate({
          access_token: res.data.access_token,
          refresh_token: res.data.access_token,
          exp: values.rememberMe ? res.data.exp : undefined,
          set_cookie: true,
          authenticated: false,
        })
      );
      if (res.success) {
        const refetchData = await refetchUserDetails();
        const user = refetchData?.data?.data;
        if (user) {
          dispatch(setUser({ user, authenticate: true }));
          setIsLoading(true);
          if (!user.email_verified) {
            router.replace(
              `/verify-email?e=${encryptString(
                user.email as string,
                Keys.ENCRYPTION_STRING
              )}`
            );
          } else {
            router.replace("/");
          }
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
      className="mx-auto w-full md:max-w-[342px] px-5 py-8 md:px-5 md:py-7 text-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="mb-3 text-center text-xl font-medium leading-normal text-primary-heading lg:text-[28px] lg:leading-10">
        Login to Your Account
      </h1>

      <div className="space-y-3">
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
                className="px-2 text-sm placeholder:text-[13px] placeholder:text-neutral-400"
                inputContainerClassName="font-inter"
                labelClassName="text-[15px] block text-start text-[#121127] font-inter font-medium"
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
        <div className="flex flex-col items-start gap-0.5">
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                label="Password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter your Password"
                error={error}
                className="px-2 text-sm placeholder:text-[13px] placeholder:text-neutral-400"
                inputContainerClassName="font-inter"
                labelClassName="text-[15px] block text-start text-[#121127] font-inter font-medium"
                inputPrefixClassName="border-r-0 pr-0 p-0 text-2xl text-neutral-400 pl-2"
                inputPrefix={
                  <span>
                    <RiKeyFill />
                  </span>
                }
                inputSuffixClassName="border-l-0 pr-3 pl-0"
                inputSuffix={
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="text-2xl text-neutral-400"
                  >
                    {isPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </button>
                }
              />
            )}
          />
        </div>

        <div className="form-check flex items-center justify-between gap-2 font-normal leading-6">
          <Controller
            control={control}
            name="rememberMe"
            render={({ field, fieldState: { error } }) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    field.onChange(checked as boolean)
                  }
                  id="rememberMe"
                />
                <label
                  htmlFor="rememberMe"
                  className="select-none font-inter text-sm font-medium text-primary-heading"
                >
                  Remember Me
                </label>
              </div>
            )}
          />
          <div>
            <Link
              href="/forgot-password"
              className="text-[14px] font-normal text-[#EF4F4E] hover:cursor-pointer"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <div className="text-center text-white">
          <Button
            isLoading={isLoading}
            type="submit"
            variant={"secondary"}
            className="w-full shadow-sm"
          >
            Login
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[14px] font-normal text-[#121127]">
          Don’t have an account?
          <span className="text-primary font-bold">
            <Link href="/auth/signup"> Register</Link>
          </span>
        </p>
      </div>
      <div className="mt-3">
        <p className="text-[14px] font-medium text-[#121127]">Continue with</p>
      </div>

      <div className="flex items-center justify-center gap-2 py-2 w-full">
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
}

export default LoginPage;
