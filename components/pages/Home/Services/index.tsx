import holiday from "@/assets/images/icons/beach.png";
import hotel from "@/assets/images/icons/hotel.png";
import flight from "@/assets/images/icons/plane.png";
import umrah from "@/assets/images/icons/umrah.png";
import SectionHeading from "@/components/shared/SectionHeading";
import ServiceCard from "@/components/shared/ServiceCard";
import { cn } from "@/utils/common";
import { FC, HTMLAttributes } from "react";

interface IServices extends HTMLAttributes<HTMLDivElement> {}

const Services: FC<IServices> = (props) => {
  return (
    <section {...props} className={cn("w-full py-12", props.className)}>
      <div className="main-container">
        <SectionHeading
          title="Our Services"
          description={`TorviTrip offers flight booking, hotel reservation, holiday
        packages,
        umrah packages, tourist visa, student visa and work visa`}
          className="mb-6"
        />
        <div className="grid grid-cols-1 gap-2 md:gap-3 md:grid-cols-3 lg:grid-cols-4">
          <ServiceCard
            img={flight.src}
            title="Flight Booking"
            description="Find air ticket prices in Bangladesh. Book cheap airline tickets online with TorviTrip - your go-to flight booking website!"
            link="/flight"
            image_alt="flight booking"
          />
          <ServiceCard
            img={hotel.src}
            title="Hotel Booking"
            description="Book your ideal stay with ease at the top hotel booking platform. Discover the best deals for hotels and flights with OTA!"
            link="/hotel"
            image_alt="hotel booking"
          />
          <ServiceCard
            img={holiday.src}
            title="Holiday Packages"
            description="Discover the best deals on cheap holiday packages and vacation deals for 2024. Plan your affordable and amazing holiday with TorviTrip."
            link="/holiday"
            image_alt="holiday packages"
          />
          <ServiceCard
            img={umrah.src}
            title="Umrah Packages"
            description="Discover cheap Umrah packages in 2024! Book family-friendly and low-cost Umrah tours with TorviTrip for an unforgettable spiritual journey."
            link="/umrah-packages/view-all"
            image_alt="work visa"
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
