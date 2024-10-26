import { cn } from "@/utils/common";
import Image from "next/image";
import { FC, HTMLAttributes } from "react";

interface ILocationCard extends HTMLAttributes<HTMLDivElement> {
  img: string;
  title: string;
  description: string;
}

const LocationCard: FC<ILocationCard> = ({
  description,
  img,
  title,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "w-full relative group cursor-pointer text-white h-[350px] md:h-[350px] overflow-hidden rounded-xl",
        props.className
      )}
    >
      <div className="relative w-full h-full">
        <Image
          className="object-cover group-hover:scale-105 duration-300"
          src={img}
          alt={title}
          fill
        />
      </div>
      <div className="vignette-overlay"></div>
      <div className="text-white group-hover:bottom-4 duration-300 absolute bottom-3 left-3 z-9">
        <h5 className="text-lg font-bold">{title}</h5>
        <span className="text-sm">{description}</span>
      </div>
    </div>
  );
};

export default LocationCard;
