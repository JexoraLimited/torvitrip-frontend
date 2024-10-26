import SearchNew from "@/components/shared/Search";
import { nunitoSans } from "@/fonts/google";
import { choose } from "@/utils/common";
import React from "react";
import styles from "./newBanner.module.css";

export type TabTypes = "flight" | "hotel" | "tour" | "visa";

interface ISearchNew {
  type?: TabTypes;
}

const getRandomImage = () => {
  return choose(["/banner_bg1.jpg", "/banner_bg2.jpg"]);
};

const Banner: React.FC<ISearchNew> = (props) => {
  return (
    <div className="bg-white relative h-auto w-full">
      <div className="h-[320px] md:h-[500px] w-full absolute top-0 left-0">
        <div
          className="w-full h-full bg-no-repeat bg-cover bg-white bg-center"
          style={{
            backgroundImage: `url(${getRandomImage()})`,
          }}
        ></div>
        <div className={styles.overlay}></div>
      </div>
      <div
        className="main-container min-h-[600px] pt-[10px] pb-[30px] lg:pt-[200px] lg:pb-10 relative"
        style={nunitoSans.style}
      >
        <div className="w-full flex flex-col items-center mb-[20px]">
          <div className="w-fit">
            <h2 className="text-xl font-semibold lg:text-4xl text-white">
              Welcome to <i className="font-bold">OTA</i>
            </h2>
            {/* <h4 className="text-[12px] lg:text-[16px] mt-[6px] text-right font-bold text-white hidden md:block">
              Dream, Explore, Discover
            </h4> */}
            <h4 className="text-[12px] lg:text-[16px] mt-[6px] text-right font-bold text-white hidden md:block">
              Where Every Journey Begins
            </h4>
          </div>
          <p className="text-[12px] lg:text-lg font-semibold text-white mt-0 lg:mt-1">
            Find Flight, Hotel & Holiday
          </p>
        </div>
        <SearchNew type={props.type} />
      </div>
    </div>
  );
};

export default Banner;
