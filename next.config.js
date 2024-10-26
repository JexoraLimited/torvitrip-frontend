/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn.sharetrip.net",
      "flagcdn.com",
      "upload.wikimedia.org",
      "tbbd-flight.s3.ap-southeast-1.amazonaws.com",
      "api.sharetrip.net",
      "utility-assets.s3.amazonaws.com",
      "airlineimages.s3.ap-southeast-1.amazonaws.com",
      "fastgotravel.s3.ap-south-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
