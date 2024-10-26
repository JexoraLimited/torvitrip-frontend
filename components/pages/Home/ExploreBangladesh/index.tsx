import ctg from "@/assets/images/place_images/chittagong.jpg";
import cxb from "@/assets/images/place_images/coxsbazar.jpg";
import kua from "@/assets/images/place_images/kuakata.jpg";
import ran from "@/assets/images/place_images/rangamati.jpg";
import saj from "@/assets/images/place_images/sajek.jpg";
import syl from "@/assets/images/place_images/sylhet.jpg";
import SectionHeading from "@/components/shared/SectionHeading";
import { cn } from "@/utils/common";
import { FC, HTMLAttributes } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import LocationCard from "../../../shared/LocationCard";

const places = [
  {
    img: cxb.src,
    title: "Cox's Bazar",
    description: "120 Hotels Available",
  },
  {
    img: ctg.src,
    title: "Chittagong",
    description: "40 Hotels Available",
  },
  {
    img: syl.src,
    title: "Sylhet",
    description: "50 Hotels Available",
  },
  {
    img: kua.src,
    title: "Kuakata",
    description: "100 Hotels Available",
  },
  {
    img: ran.src,
    title: "Rangamati",
    description: "90 Hotels Available",
  },
  {
    img: saj.src,
    title: "Sajek valley",
    description: "60 Hotels Available",
  },
];

interface IExploreBangladesh extends HTMLAttributes<HTMLDivElement> {}

const ExploreBangladesh: FC<IExploreBangladesh> = (props) => {
  return (
    <div {...props} className={cn("w-full py-12", props.className)}>
      <div className="main-container">
        <SectionHeading
          title="Explore Bangladesh"
          description={`Experience Bangladesh’s vibrant culture and stunning landscapes. Explore Cox’s Bazar, Sylhet, Bandarban, Sajek Valley, and Rangamati.`}
          className="mb-6"
        />
        <div className="max-w-full overflow-x-hidden">
          <Slider
            dots={false}
            centerMode
            infinite={true}
            autoplay={true}
            autoplaySpeed={4000}
            speed={500}
            slidesToShow={4}
            centerPadding="120px"
            slidesToScroll={1}
            swipeToSlide={true}
            responsive={[
              {
                breakpoint: 640,
                settings: {
                  slidesToShow: 1,
                  centerPadding: "70px",
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                },
              },
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 3,
                },
              },
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                },
              },
              {
                breakpoint: 1280,
                settings: {
                  slidesToShow: 4,
                },
              },
            ]}
          >
            {places.map((place, i) => (
              <div key={i} className="px-1">
                <LocationCard {...place} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ExploreBangladesh;
