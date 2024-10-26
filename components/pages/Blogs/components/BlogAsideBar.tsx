import { categoryList, postsList, socialLinks } from "@/data/ArticleList";
import Image from "next/image";
import Link from "next/link";
import BlogCategory from "./BlogCategory";
import PostCard from "./PostCard";

const BlogAsideBar = () => {
  return (
    <aside className="sticky bottom-5 top-4 h-fit w-full max-w-[420px] flex-grow-0 rounded-[15px] bg-white p-6 font-primary shadow-[0px_4px_20px_rgba(0,0,0,0.14),0px_7px_10px_-5px_rgba(0,0,0,0.4)]">
      <h4 className="text-xl font-semibold leading-6 text-secondary-heading text-opacity-95">
        Featured posts
      </h4>
      <div className="w-full space-y-6 py-6 pb-[70px]">
        {postsList.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
      <h4 className="text-xl font-semibold leading-6 text-secondary-heading text-opacity-95">
        Categories
      </h4>
      <div className="flex w-full flex-wrap gap-x-[10px] gap-y-[15px] py-6 pb-[70px]">
        {categoryList.map((category, index) => (
          <BlogCategory key={index} {...category} />
        ))}
      </div>
      <h4 className="text-xl font-semibold leading-6 text-secondary-heading text-opacity-95">
        Latest posts
      </h4>
      <div className="w-full space-y-6 py-6 pb-[70px]">
        {postsList.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
      <h4 className="text-xl font-semibold leading-6 text-secondary-heading text-opacity-95">
        Follow us
      </h4>
      <div className="flex w-full space-x-[6px] py-6">
        {socialLinks.map((link, index) => (
          <SocialLink key={index} {...link} />
        ))}
      </div>
    </aside>
  );
};

export interface ISocialLinks {
  icon: any;
  link: string;
}

const SocialLink = ({ icon, link }: ISocialLinks) => {
  return (
    <Link href={link}>
      <Image src={icon} alt="" />
    </Link>
  );
};

export default BlogAsideBar;
