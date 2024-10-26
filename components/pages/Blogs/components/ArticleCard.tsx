import Calender from "@/assets/svg/calender.svg";
import Clock from "@/assets/svg/clock.svg";
import Image from "next/image";
import Link from "next/link";
import BlogCategory from "./BlogCategory";

export interface IArticleCardProps {
  title: string;
  description: string;
  date: string;
  time: string;
  category: {
    color: string;
    name: string;
  };
  img: any;
}

const ArticleCard = (props: IArticleCardProps) => {
  return (
    <article className="group flex items-center gap-x-4 rounded-[15px] p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.14),0px_7px_10px_-5px_rgba(0,0,0,0.4)]">
      <div className="h-[250px] w-full max-w-[294px] rounded-[15px]">
        <div className="h-full w-full overflow-hidden rounded-[15px]">
          <Image
            className="h-full w-full transition-all duration-300 group-hover:scale-125"
            src={props.img}
            alt={props.title}
          />
        </div>
      </div>
      <div className="w-full space-y-[15px]">
        <BlogCategory {...props.category} />
        <Link
          href={`/blogs/${props.title
            .replace(/\s+/g, "-")
            .toLocaleLowerCase()}`}
        >
          <h2 className="cursor-pointer font-primary text-[30px] font-semibold leading-9 text-secondary-heading text-opacity-95 hover:underline">
            {props.title}
          </h2>
        </Link>
        <p className="font-primary text-[15px] leading-7 text-secondary-heading text-opacity-95">
          {props.description}
        </p>
        <div className="flex items-center gap-x-7">
          <div className="flex items-center space-x-[6px]">
            <Image src={Calender} alt="" />
            <span className="font-primary text-[13px] leading-6 text-secondary-heading text-opacity-95">
              {props.date}
            </span>
          </div>
          <div className="flex items-center space-x-[6px]">
            <Image src={Clock} alt="" />
            <span className="font-primary text-[13px] leading-6 text-secondary-heading text-opacity-95">
              {props.time}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
