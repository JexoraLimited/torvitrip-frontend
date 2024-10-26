import { BsCheck2All } from "react-icons/bs";
import { FaUmbrellaBeach } from "react-icons/fa";
import { touristVisaData } from "../../../../../data/touristVisa";
import CommonCard, { ICommonCard } from "../../../../shared/CommonCard";
import Breadcrumb, { defaultBreadCrumbItems } from "../../../../ui/Breadcrumb";

const AllTouristVisa = () => {
  return (
    <div className="mt-10 main-container">
      <Breadcrumb
        className="my-5"
        items={[
          ...defaultBreadCrumbItems,
          {
            label: "Tourist Visa",
            link: "/tourist-visa",
            icon: <FaUmbrellaBeach />,
          },
          {
            label: "View All",
            link: "/tourist-visa/view-all",
            icon: <BsCheck2All />,
          },
        ]}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          return <CommonCard style={{ marginBottom: "0" }} key={i} {...data} />;
        })}
      </div>
    </div>
  );
};

export default AllTouristVisa;
