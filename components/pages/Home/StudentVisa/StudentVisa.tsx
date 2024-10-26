import CardSlider2 from "@/components/shared/CardSlider2/CardSlider2";
import { cn } from "@/utils/common";
import { FC, HTMLAttributes } from "react";
import { SwiperSlide } from "swiper/react";
import { studentVisaData } from "../../../../data/studentVisa";
import CommonCard, { ICommonCard } from "../../../shared/CommonCard";

interface IStudentVisa extends HTMLAttributes<HTMLDivElement> {}

const StudentVisa: FC<IStudentVisa> = (props) => {
  return (
    <section {...props} className={cn("py-12", props.className)}>
      <div className="main-container">
        <CardSlider2
          title="Student Visa"
          subtitle="Packages In Popular Destinations"
          viewAllLink="/student-visa/view-all"
          className="pb-[10px]"
        >
          {studentVisaData?.map((d, i) => {
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
                  title: "University",
                  description: d.university,
                  className: "text-[16px] text-secondary",
                },
                {
                  title: "Visa Type",
                  description: d.visaType,
                },
                {
                  title: "IELTS Score",
                  description: d.iELTSScore,
                },
                {
                  title: "Degree",
                  description: d.degree,
                },
                {
                  title: "Degree Duration",
                  description: d.degreeDuration,
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

export default StudentVisa;
