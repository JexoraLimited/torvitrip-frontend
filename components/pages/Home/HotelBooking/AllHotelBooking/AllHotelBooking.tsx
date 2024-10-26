import { useState } from "react";
import { BsCheck2All } from "react-icons/bs";
import { RiHotelLine } from "react-icons/ri";
import { allHotelBookingData } from "../../../../../data/allHotelBookingData";
import CommonCard, { ICommonCard } from "../../../../shared/CommonCard";
import Breadcrumb, { defaultBreadCrumbItems } from "../../../../ui/Breadcrumb";
import AllHotelBookingPagination from "./AllHotelBookingPagination";
import SearchAndHotelBooking from "./SearchAndHotelBooking";

const AllHotelBooking = () => {
  const [openedPopup, setOpenedPopup] = useState(false);

  return (
    <div>
      <div>
        <SearchAndHotelBooking
          setOpenedPopup={setOpenedPopup}
          openedPopup={openedPopup}
        />
      </div>
      <div className="mt-10 main-container">
        <Breadcrumb
          className="my-5"
          items={[
            ...defaultBreadCrumbItems,
            {
              label: "Hotel Booking",
              link: "/hotel-booking",
              icon: <RiHotelLine />,
            },
            {
              label: "View All",
              link: "/hotel-booking/view-all",
              icon: <BsCheck2All />,
            },
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-5">
          {allHotelBookingData?.map((d, i) => {
            const data: ICommonCard = {
              images: d.images,
              pricing: {
                amount: d.price,
                currency: "BDT",
                title: "Price",
                unit: "/room",
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
                  title: "Country",
                  description: d.country,
                  className: "text-[16px] text-secondary",
                },
                {
                  title: "Hotel Star Rating",
                  description: d.type,
                },
                {
                  title: "Check-In",
                  description: d.checkIn,
                },
                {
                  title: "Check-Out",
                  description: d.checkOut,
                },
                {
                  title: "Features",
                  description: d.features,
                },
              ],
            };
            return (
              <CommonCard key={i} {...data} style={{ marginBottom: "0" }} />
            );
          })}
        </div>
        <div>
          <AllHotelBookingPagination />
        </div>
      </div>
    </div>
  );
};

export default AllHotelBooking;
