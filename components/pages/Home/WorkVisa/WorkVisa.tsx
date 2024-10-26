import CardSlider2 from "@/components/shared/CardSlider2/CardSlider2";
import CommonCard, { ICommonCard } from "@/components/shared/CommonCard";
import { cn } from "@/utils/common";
import { FC, HTMLAttributes } from "react";
import { SwiperSlide } from "swiper/react";
import { workVisaData } from "../../../../data/workVisa";

interface IWorkVisa extends HTMLAttributes<HTMLDivElement> {}

const WorkVisa: FC<IWorkVisa> = (props) => {
  return (
    <section {...props} className={cn("py-12", props.className)}>
      <div className="main-container">
        <CardSlider2
          title="Work Visa"
          subtitle="Packages In Popular Destinations"
          viewAllLink="/work-visa/view-all"
          className="pb-[10px]"
        >
          {workVisaData?.map((d, i) => {
            const data: ICommonCard = {
              images: d.images,
              pricing: {
                amount: d.processingFees,
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
                  title: "Job Title",
                  description: d.jobTitle,
                  className: "text-[16px] text-secondary",
                },
                {
                  title: "Working Hours",
                  description: d.workingHours,
                },
                {
                  title: "Salary",
                  description: d.salary,
                },
                {
                  title: "Overtime",
                  description: d.overtime,
                },
                {
                  title: "Age",
                  description: d.age,
                },
                {
                  title: "Visa Duration",
                  description: d.duration,
                },
                {
                  title: "Work Permit Renewal",
                  description: d.workPermitRenewal,
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

export default WorkVisa;
