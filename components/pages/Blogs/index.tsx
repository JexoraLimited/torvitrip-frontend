import ArticleOne from "@/assets/images/blogs/article_one.png";
import Calender from "@/assets/svg/calender.svg";
import Clock from "@/assets/svg/clock.svg";
import { articleList } from "@/data/ArticleList";
import Image from "next/image";
import ArticleCard from "./components/ArticleCard";
import BlogAsideBar from "./components/BlogAsideBar";
import BlogCategory from "./components/BlogCategory";

const BlogPage = () => {
  return (
    <main className="w-full">
      <div className="mx-auto max-w-[1300px]">
        <article className="flex items-center gap-x-14 py-12 pb-16">
          <div className="w-full">
            <BlogCategory color="#00FF29" name="Travel" />
            <h1 className="mb-4 mt-[7px] font-primary text-[40px] font-semibold leading-[48px] text-primary-heading">
              Never let your memories be grater than your dreams
            </h1>
            <p className="mb-4 font-primary text-[15px] leading-7 text-secondary-heading text-opacity-95">
              Before long the searchlight discovered some distance away a
              schooner with all sails set, apparently the same vessel which had
              been noticed earlier in the evening. The wind had by this time
              backed to the east, and there was a shudder amongst the watchers
              on
            </p>
            <div className="flex items-center gap-x-7">
              <div className="flex items-center space-x-[6px]">
                <Image src={Calender} alt="" />
                <span className="font-primary text-[13px] leading-6 text-secondary-heading text-opacity-95">
                  May 2, 2023
                </span>
              </div>
              <div className="flex items-center space-x-[6px]">
                <Image src={Clock} alt="" />
                <span className="font-primary text-[13px] leading-6 text-secondary-heading text-opacity-95">
                  4 min read
                </span>
              </div>
            </div>
          </div>
          <div className="h-[434px] w-full max-w-[630px] rounded-[15px] p-[15px] shadow-[0px_4px_20px_rgba(0,0,0,0.14),0px_7px_10px_-5px_rgba(0,0,0,0.4)]">
            <div className="h-full w-full overflow-hidden rounded-[15px]">
              <Image
                className="h-full w-full object-cover transition-all duration-300 hover:scale-125"
                src={ArticleOne}
                alt="Article One"
              />
            </div>
          </div>
        </article>

        <main className="flex w-full justify-between gap-x-10 pb-32">
          <div className="w-full max-w-[840px] space-y-[40px]">
            {articleList.map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
            <button className="mx-auto flex h-[46px] w-[180px] items-center justify-center rounded-full bg-primary text-white">
              Load More
            </button>
          </div>
          <BlogAsideBar />
        </main>
      </div>
    </main>
  );
};

export default BlogPage;
