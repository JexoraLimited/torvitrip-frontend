import { Keys } from "@/config";
import { GetServerSideProps } from "next";
import { getServerSideSitemapLegacy } from "next-sitemap";
const Site = () => null;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return getServerSideSitemapLegacy(ctx, [
    { loc: `${Keys.SITE_URL}` },
    { loc: `${Keys.SITE_URL}/flights` },
    { loc: `${Keys.SITE_URL}/hotels` },
    { loc: `${Keys.SITE_URL}/holiday` },
    { loc: `${Keys.SITE_URL}/visa` },
    { loc: `${Keys.SITE_URL}/umrah` },
    { loc: `${Keys.SITE_URL}/about` },
    { loc: `${Keys.SITE_URL}/mission-vision-values` },
    { loc: `${Keys.SITE_URL}/terms-and-conditions` },
    { loc: `${Keys.SITE_URL}/privacy-policy` },
    { loc: `${Keys.SITE_URL}/auth/signin` },
    { loc: `${Keys.SITE_URL}/auth/signup` },
    { loc: `${Keys.SITE_URL}/holiday-packages` },
    { loc: `${Keys.SITE_URL}/hotel-booking` },
    { loc: `${Keys.SITE_URL}/umrah-packages` },
    { loc: `${Keys.SITE_URL}/tourist-visa` },
    { loc: `${Keys.SITE_URL}/student-visa` },
    { loc: `${Keys.SITE_URL}/work-visa` },
  ]);
};

export default Site;
