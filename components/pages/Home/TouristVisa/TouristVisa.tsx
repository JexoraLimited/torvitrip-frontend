import CardSlider2 from "@/components/shared/CardSlider2/CardSlider2";
import { cn } from "@/utils/common";
import { FC, HTMLAttributes } from "react";
import { SwiperSlide } from "swiper/react";
import { touristVisaData } from "../../../../data/touristVisa";
import CommonCard, { ICommonCard } from "../../../shared/CommonCard";

interface ITouristVisa extends HTMLAttributes<HTMLDivElement> {}

const TouristVisa: FC<ITouristVisa> = (props) => {
  return (
    <section {...props} className={cn("py-12", props.className)}>
      <div className="main-container">
        <CardSlider2
          title="Tourist Visa"
          subtitle="Packages In Popular Destinations"
          viewAllLink="/tourist-visa/view-all"
          className="pb-[10px]"
        >
          {touristVisaData?.map((d, i) => {
            const data: ICommonCard = {
              images: d.images,
              pricing: {
                amount: d.price,
                currency: "BDT",
                title: "Processing Fees",
                unit: "/per visa",
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
              points: [
                {
                  title: "Country",
                  description: d.country,
                  className: "text-[18px] font-extrabold pt-3 pb-[2px]",
                  headingClassName: "font-extrabold",
                },
                {
                  title: "Visa Type",
                  description: d.tourType,
                },
                {
                  title: "Entry Type",
                  description: d.entryType,
                },
                {
                  title: "Visa processing time",
                  description: d.visaProcessingTime,
                },
                {
                  title: "Visa Validity",
                  description: d.visaValidity,
                },
              ],
            };
            return (
              <SwiperSlide key={i}>
                <CommonCard {...data} />
              </SwiperSlide>
            );
          })}
        </CardSlider2>
      </div>
    </section>
  );
};

export default TouristVisa;
