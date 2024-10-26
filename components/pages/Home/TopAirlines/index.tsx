import AnimateInView from "@/components/shared/AnimateInView";
import { Heading, ParaGraph } from "@/components/shared/Headings";
import Testimonial from "@/components/shared/Testimonial";
import { textVariant } from "@/utils/variants";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { testimonialData } from "./data";

const TestimonialSection = () => {
  return (
    <section className="bg-white py-[50px]">
      <div className="px-6">
        <AnimateInView variant={textVariant}>
          <Heading className="text-center capitalize">
            What <span className="text-secondary">people</span> say about US
          </Heading>
          <ParaGraph className="mx-auto max-w-[744px] text-center">
            UTH values customer feedback, reviews, and suggestions. Here are
            some of our freelancers and established business professionals
            sharing their experience in using the UTH website.
          </ParaGraph>
        </AnimateInView>
        <div className="mx-auto main-container">
          {/* @ts-ignore: Unreachable code error */}
          <Slider
            dots={true}
            infinite={true}
            autoplay={true}
            autoplaySpeed={4000}
            speed={2000}
            slidesToScroll={1}
            slidesToShow={3}
            centerMode={true}
            centerPadding="0px"
            dotsClass="rec-dot"
            responsive={[
              {
                breakpoint: 1180,
                settings: {
                  slidesToShow: 3,
                  centerPadding: "-20px",
                },
              },
              {
                breakpoint: 1090,
                settings: {
                  slidesToShow: 1,
                  centerPadding: "300px",
                },
              },
              {
                breakpoint: 1030,
                settings: {
                  slidesToShow: 1,
                  centerPadding: "250px",
                },
              },
              {
                breakpoint: 930,
                settings: {
                  slidesToShow: 1,
                  centerPadding: "200px",
                },
              },
              {
                breakpoint: 830,
                settings: {
                  slidesToShow: 1,
                  centerPadding: "150px",
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  centerPadding: "0px",
                },
              },
            ]}
          >
            {testimonialData.map((item, i) => {
              return (
                <Testimonial
                  key={i}
                  name={item.name}
                  review={item.review}
                  stars={item.stars}
                  img={item.img}
                />
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
