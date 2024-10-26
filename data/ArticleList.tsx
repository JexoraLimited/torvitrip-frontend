import article_five from "@/assets/images/blogs/article_five.png";
import article_four from "@/assets/images/blogs/article_four.png";
import article_one from "@/assets/images/blogs/article_one.png";
import article_three from "@/assets/images/blogs/article_three.png";
import article_two from "@/assets/images/blogs/article_two.png";
import { IArticleCardProps } from "@/components/pages/Blogs/components/ArticleCard";
import { IBlogCategoryProps } from "@/components/pages/Blogs/components/BlogCategory";
import { IBlogPost } from "@/components/pages/Blogs/components/PostCard";

// Social Links
import facebook from "@/assets/icons/blogs/facebook.svg";
import github from "@/assets/icons/blogs/github.svg";
import globe from "@/assets/icons/blogs/globe.svg";
import instagram from "@/assets/icons/blogs/instagram.svg";
import linkedin from "@/assets/icons/blogs/linkedin.svg";
import twitter from "@/assets/icons/blogs/twitter.svg";
import { ISocialLinks } from "@/components/pages/Blogs/components/BlogAsideBar";

export const articleList: IArticleCardProps[] = [
  {
    title: "Autumn is a second spring when every leaf is a flower",
    description:
      "She then expatiated very warmly upon the advantages I should reap from her plan; talked in a high style of my future grandeur; assured me how heartily I should despise almost every body and",
    date: "May 2, 2023",
    time: "4 min read",
    category: {
      color: "#00FF29",
      name: "Tech & Programming",
    },
    img: article_two,
  },
  {
    title: "Never let your memories be greater than your dreams",
    description:
      "She then expatiated very warmly upon the advantages I should reap from her plan; talked in a high style of my future grandeur; assured me how heartily I should despise almost every body and",
    date: "May 2, 2023",
    time: "4 min read",
    category: {
      color: "#00A3FF",
      name: "Writers & Translation",
    },
    img: article_one,
  },
  {
    title: "Dramatically improve your cooking just your imagination",
    description:
      "She then expatiated very warmly upon the advantages I should reap from her plan; talked in a high style of my future grandeur; assured me how heartily I should despise almost every body and",
    date: "May 2, 2023",
    time: "4 min read",
    category: {
      color: "#EB00FF",
      name: "Graphic & Design",
    },
    img: article_three,
  },
  {
    title: "Self-observation is the first step of inner unfolding",
    description:
      "She then expatiated very warmly upon the advantages I should reap from her plan; talked in a high style of my future grandeur; assured me how heartily I should despise almost every body and",
    date: "May 2, 2023",
    time: "4 min read",
    category: {
      color: "#FAFF00",
      name: "Sales & Marketing",
    },
    img: article_four,
  },
  {
    title:
      "It is during our darkest moments that we must focus to see the light",
    description:
      "She then expatiated very warmly upon the advantages I should reap from her plan; talked in a high style of my future grandeur; assured me how heartily I should despise almost every body and",
    date: "May 2, 2023",
    time: "4 min read",
    category: {
      color: "#FF0000",
      name: "Animation & Video",
    },
    img: article_five,
  },
];

export const postsList: IBlogPost[] = [
  {
    img: article_two,
    title: "Never let your memories be greater than your dream ",
    time: "4 min read",
  },
  {
    img: article_four,
    title: "Self-observation is the first step of inner unfolding",
    time: "4 min read",
  },
  {
    img: article_one,
    title:
      "The mind and body are not separate. what affect one, affect the other",
    time: "4 min read",
  },
  {
    img: article_three,
    title: "Self-observation is the first step of inner unfolding",
    time: "4 min read",
  },
];

export const categoryList: IBlogCategoryProps[] = [
  {
    color: "#00FF29",
    name: "Tech & Programming",
  },
  {
    color: "#00A3FF",
    name: "Writers & Translation",
  },
  {
    color: "#EB00FF",
    name: "Graphic & Design",
  },
  {
    color: "#FAFF00",
    name: "Sales & Marketing",
  },
  {
    color: "#FF0000",
    name: "Animation & Video",
  },
];

export const socialLinks: ISocialLinks[] = [
  {
    icon: github,
    link: "",
  },
  {
    icon: linkedin,
    link: "",
  },
  {
    icon: twitter,
    link: "",
  },
  {
    icon: facebook,
    link: "",
  },
  {
    icon: instagram,
    link: "",
  },
  {
    icon: globe,
    link: "",
  },
];
