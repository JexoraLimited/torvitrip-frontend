import AuthPersist from "@/components/shared/AuthPersist";
import {
  inter,
  murecho,
  nunitoSans,
  openSans,
  poppins,
  roboto,
} from "@/fonts/google";
import type { AppProps } from "next/app";
import NextTopLoader from "nextjs-toploader";
import "react-datepicker/dist/react-datepicker.css";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper.min.css";
import { store } from "../app/store";
import "../styles/banner.css";
import "../styles/form.css";
import "../styles/globals.css";

export const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <style jsx global>
          {`
            :root {
              --font-poppins: ${poppins.style.fontFamily};
              --font-inter: ${inter.style.fontFamily};
              --font-nunito-sans: ${nunitoSans.style.fontFamily};
              --font-open-sans: ${openSans.style.fontFamily};
              --font-murecho: ${murecho.style.fontFamily};
              --font-roboto: ${roboto.style.fontFamily};
            }
          `}
        </style>
        <QueryClientProvider client={queryClient}>
          <NextTopLoader
            color={"#0B3155"}
            easing="ease"
            showSpinner={true}
            crawl={true}
            zIndex={100000000}
            shadow={false}
            height={4}
          />
          <AuthPersist>
            <Component {...pageProps} />
          </AuthPersist>
        </QueryClientProvider>
        <Toaster />
      </Provider>
    </>
  );
}
