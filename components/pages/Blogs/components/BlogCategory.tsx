import Link from "next/link";
import React from "react";

export interface IBlogCategoryProps {
  color: string;
  name: string;
}

const BlogCategory = ({ color, name }: IBlogCategoryProps) => {
  return (
    <Link
      href={`/blogs/categories/${name
        .replace(/\s+/g, "-")
        .toLocaleLowerCase()}`}
      className="group flex max-w-fit items-center justify-center space-x-2 rounded-full bg-[#F3F1F1] px-3 py-[6px]"
    >
      <div
        className={`h-[10px] w-[10px] rounded-full`}
        style={{
          backgroundColor: color,
        }}
      ></div>
      <span className="font-primary text-[13px] leading-6 text-secondary-heading text-opacity-95 group-hover:underline">
        {name}
      </span>
    </Link>
  );
};

export default BlogCategory;
