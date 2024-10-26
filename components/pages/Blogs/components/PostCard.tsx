import Clock from "@/assets/svg/clock.svg";
import Image from "next/image";
import Link from "next/link";

export interface IBlogPost {
  img: any;
  title: string;
  time: string;
}

const PostCard = ({ img, time, title }: IBlogPost) => {
  return (
    <Link
      href={`/blogs/${title.replace(/\s+/g, "-").toLocaleLowerCase()}`}
      className="flex items-center gap-x-4"
    >
      <div className="h-[100px] w-full max-w-[100px] overflow-hidden rounded-[15px] shadow-[0px_4px_20px_rgba(0,0,0,0.14),0px_7px_10px_-5px_rgba(0,0,0,0.4)]">
        <Image className="h-full w-full object-cover" src={img} alt={title} />
      </div>
      <div className="space-y-[18px]">
        <h6 className="font-primary text-base leading-5 text-primary-heading">
          {title}
        </h6>
        <div className="flex items-center space-x-[6px]">
          <Image src={Clock} alt="" />
          <span className="font-primary text-[13px] leading-6 text-secondary-heading text-opacity-95">
            {time}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
