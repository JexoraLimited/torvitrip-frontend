import CardSlider2 from "@/components/shared/CardSlider2/CardSlider2";
import CommonCard, { ICommonCard } from "@/components/shared/CommonCard";
import { cn } from "@/utils/common";
import React, { HTMLAttributes } from "react";
import { SwiperSlide } from "swiper/react";
import { hotelBookingData } from "../../../../data/hotelBooking";

interface IHotelBooking extends HTMLAttributes<HTMLDivElement> {}

const HotelBooking: React.FC<IHotelBooking> = (props) => {
  return (
    <section {...props} className={cn("py-12", props.className)}>
      <div className={"main-container"}>
        {/* <SectionHeading
          title="Featured Hotels"
          description="Discover our handpicked selection of top-rated hotels worldwide with TorviTrip. Enjoy exceptional stays in Asia, Europe, America, Australia, and beyond."
        /> */}
        {/* <div className="mb-12 mt-5 w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
          {hotelBookingData2.map((hotel) => {
            return (
              <div className="w-full bg-white cursor-pointer min-h-[400px] rounded-lg overflow-hidden shadow-md">
                <div className="h-[150px] md:h-[250px] w-full relative overflow-hidden">
                  <Image
                    src={hotel.image}
                    className="object-cover"
                    alt={hotel.title}
                    fill
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-3">
                    <Rating value={hotel.rating} />{" "}
                    <span className="text-sm font-bold">Rating</span>
                  </div>
                  <h5 className="font-bold text-lg text-gray-900">
                    {hotel.title}
                  </h5>
                  <span className="text-gray-500 font-semibold">
                    {hotel.location}
                  </span>
                  <div className="flex gap-1 items-center">
                    <h5 className="font-bold text-xl">${hotel.price}</h5>
                    <del className="text-sm">${hotel.price + 100}</del>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-600">
                      per night
                    </span>
                    <span className="text-xs font-semibold text-gray-600">
                      $284 total
                    </span>
                    <span className="text-xs font-semibold text-gray-600">
                      Includes taxes and fees
                    </span>
                  </div>
                  <div className="bg-green-800 text-white px-2 py-1 inline-block rounded-xl text-xs mt-3">
                    <span>35% off</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div> */}
        <CardSlider2
          title="Hotel Booking"
          subtitle="Packages In Popular Destinations"
          viewAllLink="/hotel-booking/view-all"
          className="pb-[10px]"
        >
          {hotelBookingData?.map((d, i) => {
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
                isVisible: false,
              },
              save: {
                isVisible: false,
              },
              review: {
                isVisible: false,
                totalReviews: 0,
              },
              share: {
                isVisible: false,
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
              bookNowVisible: false,
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

export default HotelBooking;
