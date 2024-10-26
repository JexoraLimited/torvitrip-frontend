import CardSlider2 from "@/components/shared/CardSlider2/CardSlider2";
import { cn } from "@/utils/common";
import React, { HTMLAttributes } from "react";
import { SwiperSlide } from "swiper/react";
import { holidayPackagesData } from "../../../../data/holidayPackages";
import CommonCard, { ICommonCard } from "../../../shared/CommonCard";

interface IHolidayPackages extends HTMLAttributes<HTMLDivElement> {}

const HolidayPackages: React.FC<IHolidayPackages> = (props) => {
  return (
    <section {...props} className={cn("py-12 w-full", props.className)}>
      <div className="main-container">
        <CardSlider2
          title="Holiday packages"
          subtitle="Packages In Popular Destinations"
          viewAllLink="/holiday-packages/view-all"
          className="pb-[10px]"
        >
          {holidayPackagesData?.map((d, i) => {
            const data: ICommonCard = {
              images: d.images,
              pricing: {
                amount: d.price,
                currency: "BDT",
                title: "Price",
                unit: "/person",
              },
              rating: {
                avgRating: 4.8,
                isVisible: true,
              },
              save: {
                isVisible: true,
              },
              review: {
                isVisible: true,
                totalReviews: 30,
              },
              share: {
                isVisible: true,
              },
              title: d.title,
              discount: {
                amount: d.discount,
                remainingTime: d.time,
                text: "OFF",
                showRegularPrice: true,
                unit: "%",
                regularPrice: d.regularPrice,
              },
              points: [
                {
                  title: "Date",
                  description: d.totalTime,
                  className: "text-[16px] text-secondary",
                },
                {
                  title: "Tour Type",
                  description: d.tourType,
                },
                {
                  title: "Time",
                  description: `${d.startingTime.time} - ${d.startingTime.from}`,
                },
                {
                  title: "Visit Place",
                  description: d.visitPlace,
                },
                {
                  title: "Transportation",
                  description: d.transportation,
                },
                {
                  title: "Room Type",
                  description: d.roomType,
                },
                {
                  title: "Facilities Included",
                  description: d.facilitiesIncluded,
                },
              ],
            };
            return (
              <SwiperSlide key={i}>
                {/* <TourPackagesCard swiperRef={swiperRef} data={d} /> */}
                <CommonCard {...data} />
              </SwiperSlide>
            );
          })}
        </CardSlider2>
      </div>
    </section>
  );
};

export default HolidayPackages;
