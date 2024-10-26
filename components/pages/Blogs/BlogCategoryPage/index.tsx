import Bg from "@/assets/images/blogs/blog_category_bg.png";
import { articleList } from "@/data/ArticleList";
import Image from "next/image";
import ArticleCard from "../components/ArticleCard";
import BlogAsideBar from "../components/BlogAsideBar";

interface IBlogCategoryPage {
  categoryName: string;
}

const BlogCategoryPage = ({ categoryName }: IBlogCategoryPage) => {
  return (
    <main className="w-full border-t border-[#A9A8A8]">
      <div className="mx-auto max-w-[1300px]">
        <section className="my-[50px] w-full rounded-[15px] bg-white p-5 shadow-[0px_4px_20px_rgba(0,0,0,0.14),0px_7px_10px_-5px_rgba(0,0,0,0.4)]">
          <div className="relative isolate h-full w-full overflow-hidden rounded-[15px] py-11">
            <Image
              className="absolute inset-0 z-0 h-full w-full object-cover"
              src={Bg}
              alt="Bg"
            />
            <div className="relative z-10 mx-auto w-full max-w-[520px] space-y-3 rounded-[15px] bg-white px-8 py-9 text-center">
              <h2 className="font-primary text-[30px] font-semibold capitalize leading-9 text-primary-heading">
                {categoryName}
              </h2>
              <h4 className="font-primary text-[15px] leading-7 text-secondary-heading text-opacity-95">
                She then expatiated very warmly upon the advantages
              </h4>
            </div>
          </div>
        </section>
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

export default BlogCategoryPage;
