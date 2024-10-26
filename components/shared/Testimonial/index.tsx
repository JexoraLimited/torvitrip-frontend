import starIcon from "@/assets/icons/star.png";
import Image from "next/image";

interface TestimonialProps {
  className?: string;
  img: string;
  name: string;
  stars: number;
  review: string;
}

const Testimonial = ({
  className,
  img,
  name,
  stars,
  review,
}: TestimonialProps) => {
  return (
    <div className="testimonial-card mx-2 flex items-end justify-end pt-[30px] md:mx-auto md:h-[438px] md:w-[365px]">
      <div
        className={` testimonial-wrapper duration-[2000ms] flex h-[344px] flex-col items-center rounded-[10px] pt-6 transition-all ${
          className === "active"
            ? "xl: bg-[#0A2A5B]"
            : "bg-[#DEDEDE2E] md:translate-y-0"
        }`}
      >
        {/* Stars */}
        <div className="flex items-center">
          {Array.apply(null, Array(stars)).map((star, index) => (
            <Image
              key={index}
              src={starIcon}
              alt="Review"
              title="Review"
              width={24}
              height={25}
            />
          ))}
        </div>
        <p
          className={`testimonial-text duration-[2000ms] mt-4 px-3 text-center font-manrope text-sm leading-6 tracking-[0.3px] transition-all ${
            className == "active" ? "text-[#fff]" : "text-[#666666]"
          }`}
        >
          {review}{" "}
        </p>
        <Image
          src={img}
          className="mt-[22px] h-[105px] w-[105px] overflow-hidden rounded-full"
          alt={name}
          title={name}
          width={105}
          height={105}
        />
        <span
          className={`testimonial-text mt-[6px] text-center font-manrope text-sm font-bold uppercase leading-[26px] tracking-[2px] opacity-90 ${
            className === "active" ? "text-[#fff]" : "text-[#292929]"
          } `}
        >
          {name}
        </span>
      </div>
    </div>
  );
};

export default Testimonial;
