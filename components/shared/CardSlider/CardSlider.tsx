import React from "react";
import { FreeMode, Pagination } from "swiper";
import { Swiper } from "swiper/react";

const CardSlider = ({
  children,
  breakpoints,
  setActiveSlideNumber,
  setTotalSlides,
  className,
}: {
  children: React.ReactNode;
  breakpoints?: object;
  setActiveSlideNumber?: React.Dispatch<React.SetStateAction<number>>;
  setTotalSlides?: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
}) => {
  return (
    <Swiper
      onSwiper={(s) => {
        if (setTotalSlides) {
          setTotalSlides(s.slides.length);
        }
        if (setActiveSlideNumber) {
          setActiveSlideNumber(s.realIndex + 1);
        }
      }}
      className={className && className}
      onRealIndexChange={(s) => {
        setActiveSlideNumber && setActiveSlideNumber(s.realIndex + 1);
      }}
      grabCursor={true}
      modules={[FreeMode, Pagination]}
      // className="multiProductSlider"
      navigation={false}
      freeMode={false}
      pagination={false}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        767: {
          slidesPerView: 2,
        },
        ...breakpoints,
      }}
    >
      {children}
    </Swiper>
  );
};

export default CardSlider;
