import { BsCheck2All } from "react-icons/bs";
import { RiHotelLine } from "react-icons/ri";
import { umrahPackagesData } from "../../../../../data/umrahPackages";
import CommonCard, { ICommonCard } from "../../../../shared/CommonCard";
import Breadcrumb, { defaultBreadCrumbItems } from "../../../../ui/Breadcrumb";

const AllUmrahPackages = () => {
  return (
    <div className="mt-10 main-container">
      <Breadcrumb
        className="my-5"
        items={[
          ...defaultBreadCrumbItems,
          {
            label: "Umrah Packages",
            link: "/umrah-packages",
            icon: <RiHotelLine />,
          },
          {
            label: "View All",
            link: "/umrah-packages/view-all",
            icon: <BsCheck2All />,
          },
        ]}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          return <CommonCard style={{ marginBottom: "0" }} key={i} {...data} />;
        })}
      </div>
    </div>
  );
};

export default AllUmrahPackages;
