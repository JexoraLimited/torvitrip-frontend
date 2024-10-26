import { buttonVariants } from "@/components/ui/Button";
import Colors from "@/constants/Colors";
import { inter, nunitoSans } from "@/fonts/google";
import { cn } from "@/utils/common";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { SwiperOptions, type Swiper as SwiperRef } from "swiper";
import { Swiper } from "swiper/react";
import styles from "./CardSlider2.module.css";

interface IAllSlidesInfo {
  currentSlide: number | undefined;
  totalSlides: number | undefined;
}
interface ISlider {
  children: React.ReactNode;
  breakpoints?: object;
  className?: string;
  getAllSlidesInfo?: (allSlidesInfo: IAllSlidesInfo) => void;
  title?: string;
  subtitle?: string;
  viewAllLink?: string;
  pagination?: boolean;
  header?: boolean;
  sliderSettings?: SwiperOptions;
}

const CardSlider2 = ({
  children,
  breakpoints,
  className,
  getAllSlidesInfo,
  title = "Sample Title",
  viewAllLink,
  pagination = true,
  header = true,
  sliderSettings,
  subtitle = "Sample title",
}: ISlider) => {
  const swiperRef = useRef<SwiperRef>();
  const [totalSlides, setTotalSlides] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  // getAllSlidesInfo && getAllSlidesInfo({ currentSlide, totalSlides });
  return (
    <div>
      {header ? (
        <div className={`${styles.sliderHeaderContainer} ${inter.className}`}>
          <div className={`${styles.sliderHeader}`}>
            <h3
              className={
                "text-[25px] font-bold w-full md:w-[43%] text-left md:text-[32px] md:font-[700]"
              }
            >
              {title}
            </h3>
            <div className="flex gap-12 justify-between w-full md:w-auto md:flex-grow mt-3 md:mt-0">
              <div className={`${styles.navigation} ${styles.inactive}`}>
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className={`${styles.navigationIcon}`}
                >
                  <BsCaretLeftFill className="text-[25px]" />
                </button>
                <div className="font-bold">
                  <span style={{ color: Colors.primary }}>
                    {currentSlide + 1}
                  </span>{" "}
                  <span>/</span> <span>{totalSlides}</span>
                </div>
                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className={`${styles.navigationIcon}`}
                >
                  <BsCaretRightFill className="text-[25px]" />
                </button>
              </div>
              <Link
                href={viewAllLink || "/under-construction"}
                style={nunitoSans.style}
                className={cn(
                  buttonVariants({ variant: "default", size: "md" }),
                  "text-[16px] h-[36px]"
                )}
              >
                View All
              </Link>
            </div>
          </div>
          <hr />
          {/* <div className="py-[5px] px-[10px] w-full">
            <p className="text-md md:text-base">{subtitle}</p>
          </div> */}
        </div>
      ) : null}
      <Swiper
        onSwiper={(s) => {
          swiperRef.current = s;
          // console.log(s)
          if (setTotalSlides) {
            setTotalSlides(s.slides.length);
          }
          getAllSlidesInfo &&
            getAllSlidesInfo({
              currentSlide: s.realIndex,
              totalSlides: s.slides.length,
            });
        }}
        className={className && className}
        onRealIndexChange={(s) => {
          setCurrentSlide && setCurrentSlide(s.realIndex);
          getAllSlidesInfo &&
            getAllSlidesInfo({
              currentSlide: s.realIndex,
              totalSlides: s.slides.length,
            });
        }}
        // grabCursor={true}
        navigation={false}
        freeMode={false}
        pagination={false}
        spaceBetween={15}
        loop={true}
        // style={{
        //   paddingLeft: "15px",
        //   paddingRight: "15px",
        // }}
        breakpoints={{
          0: {
            slidesPerView: "auto",
            centeredSlides: true,
            freeMode: true,
          },
          480: {
            slidesPerView: "auto",
            centeredSlides: true,
            freeMode: true,
          },
          640: {
            slidesPerView: "auto",
            centeredSlides: true,
            freeMode: true,
          },
          767: {
            slidesPerView: "auto",
            centeredSlides: true,
            freeMode: true,
          },
          1024: {
            slidesPerView: 3,
          },
          1536: {
            slidesPerView: 4,
          },
          ...breakpoints,
        }}
        {...sliderSettings}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default CardSlider2;
