import { Button } from "@/components/ui/Button";
import Image, { StaticImageData } from "next/image";
import React, { useRef, useState } from "react";
import { AiTwotoneCalendar, AiTwotoneStar } from "react-icons/ai";
import { GiEternalLove } from "react-icons/gi";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosShareAlt,
} from "react-icons/io";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { nunitoSans } from "../../../fonts/google";
import styles from "./CommonCard.module.css";

export interface ICommonCard {
  rating: {
    avgRating: number;
    onClick?: () => void;
    isVisible: boolean;
  };
  review: {
    totalReviews: number;
    onClick?: () => void;
    isVisible: boolean;
  };
  save: {
    isVisible: boolean;
    onClick?: () => void;
  };
  share: {
    isVisible: boolean;
    onClick?: () => void;
  };
  images: {
    src: string | StaticImageData;
    alt: string;
  }[];
  title?: string;
  points: {
    icon?: React.ReactNode;
    title: string;
    description: string;
    className?: string;
    headingClassName?: string;
  }[];
  discount?: {
    icon?: React.ReactNode;
    amount: number;
    text?: string;
    remainingTime: string;
    timeIcon?: React.ReactNode;
    showRegularPrice?: boolean;
    regularPrice?: number;
    unit?: string;
  };
  pricing: {
    title: string;
    amount: number;
    currency: string;
    unit?: string;
  };
  bookNowClick?: () => void;
  detailsClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  bookNowVisible?: boolean;
}

/**
 * CommonCard Component
 *
 * This component represents a common card used for displaying various types of content, such as product listings,
 * services, or any other items with images, ratings, and pricing information.
 *
 * @component
 *
 * @param {object} props - The properties for configuring the CommonCard.
 * @param {Function} props.bookNowClick - A function to handle the "Book Now" button click.
 * @param {Function} props.detailsClick - A function to handle the "Details" button click.
 * @param {Array<object>} props.images - An array of objects containing image source and alt text.
 * @param {Array<object>} props.points - An array of point objects, each with an icon, title, and description.
 * @param {object} props.pricing - An object containing pricing information (title, amount, currency).
 * @param {object} props.rating - An object containing rating information (average rating, click handler, visibility).
 * @param {object} props.review - An object containing review information (total reviews, click handler, visibility).
 * @param {object} props.save - An object containing save information (visibility, click handler).
 * @param {object} props.share - An object containing share information (visibility, click handler).
 * @param {string} props.title - The title or name of the item.
 * @param {object} [props.discount] - An optional object containing discount information (icon, amount, text, remaining time, time icon).
 *
 * @returns {JSX.Element} The rendered CommonCard component.
 */

const CommonCard: React.FC<ICommonCard> = ({
  bookNowClick,
  detailsClick,
  images,
  points,
  pricing,
  rating,
  review,
  save,
  share,
  title,
  discount,
  className,
  style,
  bookNowVisible = true,
}) => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [totalSlides, setTotalSlides] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  return (
    <div style={style} className={`bg-white pt-0 pb-[15px] shadow-md relative`}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        allowTouchMove={false}
        touchRatio={0}
        onSwiper={(s) => {
          swiperRef.current = s;
          setTotalSlides(s.slides.length);
        }}
        onRealIndexChange={(s) => {
          setCurrentSlide(s.realIndex);
        }}
      >
        {images?.map((image, i) => (
          <SwiperSlide key={i}>
            <div className="relative">
              <div className="flex items-center justify-center">
                <div className="relative h-[225px] md:h-[250px] w-full overflow-hidden z-0">
                  <Image
                    fill={true}
                    src={image?.src}
                    alt={image.alt}
                    className="object-cover"
                  />
                </div>
              </div>
              <div
                className={`absolute top-2 text-[16px] w-full flex items-start justify-evenly text-white font-semibold`}
              >
                {rating.isVisible ? (
                  <button
                    onClick={rating.onClick}
                    className="flex items-center"
                  >
                    <AiTwotoneStar className="mr-2" />
                    {rating.avgRating}
                  </button>
                ) : null}
                {review.isVisible ? (
                  <button
                    onClick={review.onClick}
                    className="flex items-center"
                  >
                    {review.totalReviews} review
                  </button>
                ) : null}
                {save.isVisible ? (
                  <button onClick={save.onClick} className="flex items-center">
                    <GiEternalLove className="mr-2" />
                    Save
                  </button>
                ) : null}
                {share.isVisible ? (
                  <button onClick={share.onClick} className="flex items-center">
                    <IoIosShareAlt className="mr-2" />
                    Share
                  </button>
                ) : null}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={nunitoSans.className}>
        <button
          onClick={() => {
            swiperRef.current?.slidePrev();
          }}
          className={`${styles.navigationIcon} absolute left-3`}
        >
          <IoIosArrowBack className="text-[20px] md:text-[23px]" />
        </button>
        <button
          onClick={() => {
            swiperRef.current?.slideNext();
          }}
          className={`${styles.navigationIcon} absolute right-3`}
        >
          <IoIosArrowForward className="text-[20px] md:text-[23px]" />
        </button>
      </div>
      <div className={styles.paginationContainer}>
        <div className={styles.pagination}>
          {new Array(totalSlides).fill(totalSlides).map((slide, i) => {
            return (
              <span
                className={`${styles.paginationItem} ${
                  i === currentSlide ? styles.active : ""
                }`}
                key={i}
              ></span>
            );
          })}
        </div>
      </div>
      <div className="px-4 md:pb-0 pb-4">
        {title ? (
          <h3 className="text-[18px] font-extrabold text-[#30303C] leading-[25px] pt-3 pb-[2px] whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </h3>
        ) : null}
        {points.map((point, i) => {
          return (
            <p
              key={i}
              className={`text-[14px] pb-1 text-[#30303C] whitespace-nowrap overflow-hidden text-ellipsis ${
                point.className || ""
              }`}
            >
              {point.icon ? (
                <>
                  <AiTwotoneCalendar className="mr-2 text-[#2078FD]" />{" "}
                </>
              ) : null}
              {point.title ? (
                <span
                  className={`font-bold pr-1 ${point.headingClassName || ""}`}
                >
                  {point.title}:
                </span>
              ) : null}
              {point.description}
            </p>
          );
        })}
        <div className="flex items-center justify-between">
          <h4
            style={{ color: "var(--color-blue-primary, #1882FF)" }}
            className={`text-[13px] font-extrabold leading-[25px] font-['Nunito Sans'] flex items-center ${nunitoSans.className}`}
          >
            {/* {discount?.icon || <MdLocalOffer className="mr-2" />}{" "} */}
            {discount?.showRegularPrice ? (
              <del className="pr-1">{discount.regularPrice}</del>
            ) : null}
            {discount?.amount}
            {discount?.unit} {discount?.text}
          </h4>
          <p
            style={{ color: "var(--color-blue-primary, #1882FF)" }}
            className={`text-[13px] font-extrabold leading-[25px] flex items-center ${nunitoSans.className}`}
          >
            {/* {discount?.timeIcon || <BsSmartwatch className="mr-2" />} */}
            {discount?.remainingTime}
          </p>
        </div>

        <p className="text-[14px] font-normal pb-2 font-['Nunito Sans'] text-[#30303C] whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="font-bold text-secondary">{pricing.title}: </span>{" "}
          {pricing.currency} {pricing.amount} {pricing.unit}
        </p>
        <div className="flex items-center gap-4 justify-between">
          <Button
            size={"md"}
            onClick={detailsClick}
            variant={"secondary"}
            className={`flex-1 text-sm`}
          >
            Details
          </Button>
          {bookNowVisible && (
            <Button
              size={"md"}
              onClick={bookNowClick}
              className={`flex-1 text-sm`}
            >
              Book now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonCard;
