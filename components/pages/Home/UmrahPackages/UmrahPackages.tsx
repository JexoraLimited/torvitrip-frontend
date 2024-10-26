import CardSlider2 from "@/components/shared/CardSlider2/CardSlider2";
import { cn } from "@/utils/common";
import { FC, HTMLAttributes } from "react";
import { SwiperSlide } from "swiper/react";
import { umrahPackagesData } from "../../../../data/umrahPackages";
import CommonCard, { ICommonCard } from "../../../shared/CommonCard";

interface IUmrahPackages extends HTMLAttributes<HTMLDivElement> {}

const UmrahPackages: FC<IUmrahPackages> = (props) => {
  return (
    <section {...props} className={cn("py-12", props.className)}>
      <div className="main-container">
        <CardSlider2
          title="Umrah packages"
          subtitle="Packages In Popular Destinations"
          viewAllLink="/umrah-packages/view-all"
          className="pb-[10px]"
        >
          {umrahPackagesData?.map((d, i) => {
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
                  title: "Travel Date",
                  description: d.travelDate,
                  className: "text-[16px] text-secondary",
                },
                {
                  title: "Package Type",
                  description: d.packageType,
                },
                {
                  title: "Package Includes",
                  description: d.packageIncludes,
                },
                {
                  title: "Accommodation Included",
                  description: d.accommodationIncluded,
                },
                {
                  title: "Food",
                  description: d.food,
                },
                {
                  title: "Visit Place",
                  description: d.visitPlace,
                },
                {
                  title: "Transport Included",
                  description: d.transportIncluded,
                },
                {
                  title: "Airline",
                  description: d.airLine,
                },
                {
                  title: "Muallem",
                  description: d.maullen,
                },
              ],
            };
            return (
              <SwiperSlide key={i}>
                {/* <UmrahPackagesCard swiperRef={swiperRef} data={d} /> */}
                <CommonCard {...data} />
              </SwiperSlide>
            );
          })}
        </CardSlider2>
      </div>
    </section>
  );
};

export default UmrahPackages;
