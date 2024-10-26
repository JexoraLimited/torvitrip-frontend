import AuthBackground from "@/assets/images/backgrounds/travel-3.jpg";
import { buttonVariants } from "@/components/ui/Button";
import Layout from "@/layouts/Layout";
import { cn } from "@/utils/common";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import LoginPage from "./Login";
import SignUpPage from "./SignUp";

type AuthPage = "signup" | "signin";
const AuthPages = () => {
  const router = useRouter();
  const type = router.query.type as AuthPage;
  return (
    <Layout>
      <Head>
        <title>{type === "signin" ? "Log in to OTA" : "Join OTA Now"}</title>
        <meta
          name="description"
          content={
            type === "signin"
              ? "Log in to access your OTA account"
              : "Register for exclusive offers and travel updates"
          }
        />
        <meta
          name="keywords"
          content={type === "signin" ? "Log in, Account" : "Register, Offers"}
        />
      </Head>
      <div className="min-h-screen bg-gray py-10 px-4 md:px-0">
        <div
          className={cn(
            "bg-white rounded-2xl overflow-hidden flex md:min-h-[560px] md:mx-auto w-full md:max-w-[880px]",
            type === "signup" ? "flex-row-reverse" : "flex-row"
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
              {type === "signup" && (
                <>
                  <h4 className="text-white text-center text-3xl">
                    Already signed up?
                  </h4>
                  <p className="text-white text-center text-sm w-2/3 pt-3 pb-5">
                    Login to your account so you can continue building and
                    editing your onboarding flows.
                  </p>
                  <Link
                    href={"/auth/signin"}
                    scroll={false}
                    className={cn(
                      "w-[170px]",
                      buttonVariants({ variant: "outlineLight" })
                    )}
                  >
                    Login
                  </Link>
                </>
              )}
              {type === "signin" && (
                <>
                  <h4 className="text-white text-center text-3xl">
                    Don’t Have an Account yet?
                  </h4>
                  <p className="text-white text-center text-sm w-2/3 pt-3 pb-5">
                    Login to your account so you can continue building and
                    editing your onboarding flows.
                  </p>
                  <Link
                    href={"/auth/signup"}
                    scroll={false}
                    className={cn(
                      "w-[170px]",
                      buttonVariants({ variant: "outlineLight" })
                    )}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex-1 min-h-full flex items-center justify-center">
            {type === "signin" && <LoginPage />}
            {type === "signup" && <SignUpPage />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPages;
