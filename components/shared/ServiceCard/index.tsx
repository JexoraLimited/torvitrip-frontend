import { cn } from "@/utils/common";
import Image from "next/image";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";

interface CategoryProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  img: string;
  link: string;
  image_alt?: string;
  maxLength?: number;
}

const ServiceCard: FC<CategoryProps> = ({
  img,
  title,
  link,
  description,
  image_alt,
  maxLength = 126,
  ...props
}) => {
  return (
    // @ts-ignore
    <Link
      {...props}
      href={link}
      className={cn(
        "group relative flex w-full cursor-pointer flex-col items-center  rounded-xl border border-border bg-[#0B3155] text-white px-3 py-4 transition-all duration-500",
        props.className
      )}
    >
      <div className="flex h-[60px] w-[60px]  justify-center">
        {img ? (
          <Image
            className="object-contain"
            src={img}
            alt={image_alt || ""}
            width={60}
            height={60}
            priority
          />
        ) : (
          <div className="h-[60px] w-[60px] bg-gray-400 bg-opacity-10 "></div>
        )}
      </div>
      <h3 className="mt-[8px] text-center text-lg font-semibold capitalize text-white transition-all duration-500 group-hover:text-white lg:mb-[9px]  lg:text-xl">
        {title}
      </h3>
      <p className="text-center font-manrope text-xs leading-4 text-secondary-heading transition-all duration-500 group-hover:text-white lg:text-sm lg:leading-6">
        {description.length > maxLength
          ? description?.slice(0, maxLength) + "..."
          : description}
      </p>
    </Link>
  );
};

export default ServiceCard;
