import { BsCheck2All } from "react-icons/bs";
import { IoSchoolOutline } from "react-icons/io5";
import { studentVisaData } from "../../../../../data/studentVisa";
import CommonCard, { ICommonCard } from "../../../../shared/CommonCard";
import Breadcrumb, { defaultBreadCrumbItems } from "../../../../ui/Breadcrumb";
const AllStudentVisa = () => {
  return (
    <div className="mt-10 main-container">
      <Breadcrumb
        className="my-5"
        items={[
          ...defaultBreadCrumbItems,
          {
            label: "Student Visa",
            link: "/student-visa",
            icon: <IoSchoolOutline />,
          },
          {
            label: "View All",
            link: "/student-visa/view-all",
            icon: <BsCheck2All />,
          },
        ]}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          return <CommonCard key={i} {...data} />;
        })}
      </div>
    </div>
  );
};

export default AllStudentVisa;
