import Image from "next/image";
import React from "react";
import styles from "./AllHotelBooking.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdAvTimer, MdLocalOffer } from "react-icons/md";
import { AiTwotoneStar } from "react-icons/ai";
import { GiEternalLove } from "react-icons/gi";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosShareAlt,
} from "react-icons/io";

interface StudentVisaCardProps {
  swiperRef: any;
  data: any;
}

const AllHotelBookingCard: React.FC<StudentVisaCardProps> = ({
  swiperRef,
  data,
}) => {
  return (
    <div
      style={{
        background: "var(--White-Color, #FFF)",
        paddingTop: "0",
      }}
      className={`md:py-[15px] ${styles.card} shadow-[0_4px_28px_-2px_rgba(0,0,0,0.12)] rounded-lg mt-4 mb-[50px] relative`}
    >
      <Swiper
        spaceBetween={50}
        loop
        slidesPerView={1}
        onSwiper={(s) => {
          swiperRef.current = s;
          // console.log(s);
        }}
      >
        {data?.images?.map((s: any, i: any) => (
          <SwiperSlide key={i}>
            <div className="relative">
              <div className="flex items-center justify-center">
                <div className="relative rounded-md h-[300px] w-full overflow-hidden z-0">
                  <Image fill={true} src={s?.image} alt="" />
                </div>
              </div>
              <div
                className={`absolute top-4 text-[16px] w-full h-full flex items-start justify-evenly text-[#54545E] font-semibold font-['Nunito Sans']`}
              >
                <p className="flex items-center">
                  <AiTwotoneStar className="mr-2" />
                  {s?.star}
                </p>
                <p className="flex items-center">{s?.review}</p>
                <p className="flex items-center">
                  <GiEternalLove className="mr-2" />
                  {s?.save}
                </p>
                <p className="flex items-center">
                  <IoIosShareAlt className="mr-2" />
                  {s?.share}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div>
        <button
          onClick={() => {
            swiperRef.current?.slidePrev();
          }}
          className={`${styles.navigationIcon} absolute left-3 top-[20%]`}
        >
          <IoIosArrowBack className="text-[20px] md:text-[25px]" />
        </button>
        <button
          onClick={() => {
            swiperRef.current?.slideNext();
          }}
          className={`${styles.navigationIcon} absolute right-3 top-[20%]`}
        >
          <IoIosArrowForward className="text-[20px] md:text-[25px]" />
        </button>
      </div>
      <div className="px-4">
        <h3 className="text-[18px] font-extrabold font-['Nunito Sans'] text-[#30303C] leading-[25px] py-2">
          {data?.title}
        </h3>
        <p className="text-[16px] font-normal leading-[25px] pb-2 font-['Nunito Sans'] text-[#30303C]">
          Country: {data?.country}
        </p>
        <p className="text-[16px] font-normal leading-[25px] pb-2 font-['Nunito Sans'] text-[#30303C]">
          Type: {data?.type}
        </p>
        <p className="text-[16px] font-normal leading-[25px] pb-2 font-['Nunito Sans'] text-[#30303C]">
          check-in: {data?.checkIn}
        </p>
        <p className="text-[16px] font-normal leading-[25px] pb-2 font-['Nunito Sans'] text-[#30303C]">
          check-Out: {data?.checkOut}
        </p>
        <p className="text-[16px] font-normal leading-[25px] pb-2 font-['Nunito Sans'] text-[#30303C]">
          Features: {data?.features}
        </p>
        <div className="flex items-center justify-between">
          <h4
            style={{ color: "var(--color-blue-primary, #1882FF)" }}
            className="text-[16px] font-extrabold leading-[25px] pb-2 font-['Nunito Sans'] flex items-center"
          >
            <MdLocalOffer className="mr-2" />
            <del className="pr-1">${data?.price}</del>
            {data?.discount} OFF
          </h4>
          <p
            style={{ color: "var(--color-blue-primary, #1882FF)" }}
            className="text-[16px] font-extrabold leading-[25px] pb-2 font-['Nunito Sans'] flex items-center"
          >
            <MdAvTimer className="mr-2" />
            {data?.time}
          </p>
        </div>
        <p className="text-[16px] font-normal leading-[25px] pb-2 font-['Nunito Sans'] text-[#30303C]">
          {data?.actualPrice}
        </p>
        <div className="flex items-center justify-between">
          <button
            className={`px-[37px] py-[6px] rounded-lg text-center border-0 text-white bg-[#1882FF]`}
          >
            Book now
          </button>
          <button
            className={`px-[37px] py-[6px] rounded-lg text-center border-[1px] border-[#30303C] text-black bg-white`}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllHotelBookingCard;
