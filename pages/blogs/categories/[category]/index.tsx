import BlogCategoryPage from "@/components/pages/Blogs/BlogCategoryPage";
import { GetServerSidePropsContext } from "next";

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const categoryName = context.query.category;

  return {
    props: {
      categoryName,
    },
  };
};

const BlogCategory = ({ categoryName }: { categoryName: string }) => {
  return <BlogCategoryPage categoryName={categoryName.replace(/-/g, " ")} />;
};

export default BlogCategory;
