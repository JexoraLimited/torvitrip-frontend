import { BsCheck2All } from "react-icons/bs";
import { FaUmbrellaBeach } from "react-icons/fa";
import { holidayPackagesData } from "../../../../../data/holidayPackages";
import CommonCard, { ICommonCard } from "../../../../shared/CommonCard";
import Breadcrumb, { defaultBreadCrumbItems } from "../../../../ui/Breadcrumb";

const AllHolidayPackages = () => {
  return (
    <div className="main-container py-10">
      <Breadcrumb
        items={[
          ...defaultBreadCrumbItems,
          {
            label: "Holiday Packages",
            link: "/holiday-packages",
            icon: <FaUmbrellaBeach />,
          },
          {
            label: "View All",
            link: "/holiday-packages/view-all",
            icon: <BsCheck2All />,
          },
        ]}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-5">
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
          return <CommonCard style={{ marginBottom: "0" }} key={i} {...data} />;
        })}
      </div>
    </div>
  );
};

export default AllHolidayPackages;
