import { Keys } from "@/config";
import { GetServerSideProps } from "next";

const Site = () => null;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const hostname = ctx.req.headers.host;
  let robots = "";
  if (hostname === "www.OTA.com" || hostname === "OTA.com") {
    robots = `User-agent: *\nAllow: /\nSitemap: ${Keys.SITE_URL}/sitemap.xml\nDisallow: /flight-search/\nDisallow: /under-construction`;
  } else {
    robots = `User-agent: *\nUser-agent: AdsBot-Google\nDisallow: /`;
  }

  ctx.res.setHeader("Content-Type", "text/plain");
  ctx.res.write(robots);
  ctx.res.end();
  return { props: {} };
};

export default Site;
