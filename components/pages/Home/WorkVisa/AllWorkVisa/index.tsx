import { BsCheck2All, BsPersonWorkspace } from "react-icons/bs";
import { workVisaData } from "../../../../../data/workVisa";
import CommonCard, { ICommonCard } from "../../../../shared/CommonCard";
import Breadcrumb, { defaultBreadCrumbItems } from "../../../../ui/Breadcrumb";

const AllWorkVisa = () => {
  return (
    <div className="mt-10 main-container">
      <Breadcrumb
        className="my-5"
        items={[
          ...defaultBreadCrumbItems,
          {
            label: "Work Visa",
            link: "/work-visa",
            icon: <BsPersonWorkspace />,
          },
          {
            label: "View All",
            link: "/work-visa/view-all",
            icon: <BsCheck2All />,
          },
        ]}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          return <CommonCard key={i} {...data} />;
        })}
      </div>
    </div>
  );
};

export default AllWorkVisa;
