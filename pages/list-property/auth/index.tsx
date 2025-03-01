import AuthBackground from "@/assets/images/backgrounds/hotel-1.jpg";
import guestTarget from "@/assets/images/icons/gurest-target.png";
import manageReviews from "@/assets/images/icons/manage-reviews.png";
import optimizeListing from "@/assets/images/icons/optimize-listing.png";
import rateConfidence from "@/assets/images/icons/rates-with-confidence.png";
import logoImg from "@/assets/images/logo/logo.png";
import SectionHeading from "@/components/shared/SectionHeading";
import ServiceCard from "@/components/shared/ServiceCard";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/CheckBox";
import { Input } from "@/components/ui/Input";
import { Keys } from "@/config";
import { authenticate, setUser } from "@/features/auth/authSlice";
import { useGetMe, useSignIn } from "@/hooks/api/auth";
import { useAppDispatch } from "@/hooks/redux";
import Layout from "@/layouts/Layout";
import { APIResponse } from "@/types/common";
import { cn } from "@/utils/common";
import { encryptString } from "@/utils/encrypt";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
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

const HotelAuthPages = () => {
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
    <Layout footer={false} navbar={false}>
      <Head>
        <title>Log in to OTA</title>
        <meta
          name="description"
          content={"Log in to access your TorviTrip account"}
        />
        <meta name="keywords" content={"Log in, Account"} />
      </Head>
      <div className="min-h-screen bg-gray py-10 px-4 md:px-0">
        <div
          className={cn(
            "bg-white rounded-2xl overflow-hidden flex md:min-h-[560px] md:mx-auto w-full md:max-w-[880px]",
            "flex-row"
          )}
        >
          <div className="flex-1 md:block hidden relative">
            <div className="absolute left-0 right-0 w-full h-full bg-secondary/30 z-10"></div>
            <div className="relative w-full h-full">
              <Image
                src={AuthBackground}
                draggable={false}
                fill
                className="object-cover"
                alt="Auth bg"
              />
            </div>
            <div
              className={
                "z-20 absolute top-0 left-0 right-0 bottom-0 w-full h-full flex items-center justify-center flex-col"
              }
            >
              <>
                <h4 className="text-white text-center text-3xl">
                  Log in to manage your hotel
                </h4>
                <p className="text-white text-center text-base w-2/3 pt-3 pb-5">
                  Login to your account to manage your hotel reservations and
                  inventory
                </p>
              </>
            </div>
          </div>
          <div className="flex-1 min-h-full flex items-center justify-center">
            <motion.form
              variants={changeForm}
              className="mx-auto w-full md:max-w-[342px] px-5 py-8 md:px-5 md:py-7 text-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Image
                src={logoImg}
                alt="Logo"
                width={120}
                height={120}
                quality={100}
                className="object-contain mx-auto mb-5"
              />
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
                            onClick={() =>
                              setIsPasswordVisible(!isPasswordVisible)
                            }
                            className="text-2xl text-neutral-400"
                          >
                            {isPasswordVisible ? (
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
            </motion.form>
          </div>
        </div>
      </div>
      <div className="main-container py-12">
        <SectionHeading
          title="Welcome to Partner Central"
          description="Your connection to Expedia Group’s global travel marketplace, Partner Central provides tools and information to help you attract travelers, manage your business, and maximize revenue potential."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          <ServiceCard
            title="Optimize your listing"
            description="Enhance your hotel's visibility and booking rates on TorviTrip platforms by optimizing listings with high-quality photos, detailed descriptions, and competitive pricing. Ensure your property stands out to attract more guests."
            img={optimizeListing.src}
            link="/list-property/auth"
            maxLength={500}
          />
          <ServiceCard
            title="Target the right guests"
            description="Maximize bookings by identifying and targeting the right guests. Tailor your marketing strategies and amenities to meet their specific needs and preferences, ensuring a personalized and memorable stay."
            img={guestTarget.src}
            link="/list-property/auth"
            maxLength={500}
          />
          <ServiceCard
            title="Set rates with confidence"
            description="Establish competitive and profitable rates with confidence by analyzing market trends and utilizing dynamic pricing tools. Ensure your pricing strategy maximizes revenue while attracting your target guests."
            img={rateConfidence.src}
            link="/list-property/auth"
            maxLength={500}
          />
          <ServiceCard
            title="Manage reviews"
            description="Effectively manage reviews by promptly responding to guest feedback and addressing concerns. Positive engagement enhances your reputation, builds trust, and encourages more bookings.            "
            img={manageReviews.src}
            link="/list-property/auth"
            maxLength={500}
          />
        </div>
      </div>
      <div className="bg-slate-100 py-12">
        <div className="w-full text-center main-container flex flex-col items-center gap-3 justify-center">
          <SectionHeading
            title="Ready to get started?"
            description="Join us and unlock access to high value guests. Our tools make quick work of essential tasks and puts critical insights at your fingertips. Signup is easy, fast and free."
          />
          <Button
            onClick={() => router.push("/list-property")}
            className="mt-2"
          >
            Get Started
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default HotelAuthPages;
