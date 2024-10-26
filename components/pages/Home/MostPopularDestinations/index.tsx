import bandarban from "@/assets/images/place_images/bandarban.jpg";
import bangkok from "@/assets/images/place_images/bangkok.jpg";
import dubai from "@/assets/images/place_images/dubai.jpg";
import goa from "@/assets/images/place_images/goa.jpg";
import kualaLumpur from "@/assets/images/place_images/kuala-lumpur.jpg";
import london from "@/assets/images/place_images/london.jpg";
import newYork from "@/assets/images/place_images/new-york.jpg";
import paris from "@/assets/images/place_images/paris.jpg";
import saudiArabia from "@/assets/images/place_images/saudi-arabia.jpg";
import singapore from "@/assets/images/place_images/singapore.jpg";
import thailand from "@/assets/images/place_images/thailand.jpg";
import tokyo from "@/assets/images/place_images/tokyo.jpg";
import LocationCard from "@/components/shared/LocationCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { cn } from "@/utils/common";
import { FC, HTMLAttributes } from "react";
import { Autoplay, EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const places = [
  {
    img: thailand.src,
    title: "Thailand",
    description: "120 Hotels Available",
  },
  {
    img: goa.src,
    title: "Goa",
    description: "40 Hotels Available",
  },
  {
    img: kualaLumpur.src,
    title: "Kuala Lumpur",
    description: "100 Hotels Available",
  },
  {
    img: dubai.src,
    title: "Dubai",
    description: "90 Hotels Available",
  },
  {
    img: singapore.src,
    title: "Singapore",
    description: "50 Hotels Available",
  },
  {
    img: bandarban.src,
    title: "Bandarban",
    description: "60 Hotels Available",
  },
  {
    img: saudiArabia.src,
    title: "Saudi Arabia",
    description: "120 Hotels Available",
  },
  {
    img: paris.src,
    title: "Paris",
    description: "40 Hotels Available",
  },
  {
    img: newYork.src,
    title: "New York",
    description: "50 Hotels Available",
  },
  {
    img: london.src,
    title: "London",
    description: "100 Hotels Available",
  },
  {
    img: tokyo.src,
    title: "Tokyo",
    description: "90 Hotels Available",
  },
  {
    img: bangkok.src,
    title: "Bangkok",
    description: "60 Hotels Available",
  },
];

interface IMostPopularDestinations extends HTMLAttributes<HTMLDivElement> {}

const MostPopularDestinations: FC<IMostPopularDestinations> = (props) => {
  return (
    <div {...props} className={cn("py-12 bg-white", props.className)}>
      <div className="main-container">
        <SectionHeading
          title="Most popular destinations"
          description={`Explore the most popular destinations around the globe with OTA. Asia, Europe, America, Australia, and more await your exploration.`}
          className="mb-6"
        />
        <div className="max-w-full overflow-x-hidden">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            autoplay={true}
            speed={500}
            loop
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              slideShadows: true,
              modifier: 2.5,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              320: {
                slidesPerView: 1.75,
              },
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3.25,
              },
              1024: {
                slidesPerView: 3.5,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            pagination={false}
            modules={[EffectCoverflow, Autoplay]}
          >
            {places.map((place, i) => (
              <SwiperSlide className="rounded-xl overflow-hidden" key={i}>
                <LocationCard className="md:h-[400px] select-none" {...place} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MostPopularDestinations;
