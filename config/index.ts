export const Keys = {
  API_BASE_URL:
    process.env.NEXT_PUBLIC_BASE_URL || "https://api.fastgotravel.com",
  AUTH_SECRET: "",
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://www.fastgotravel.com",
  ENCRYPTION_STRING:
    process.env.NEXT_PUBLIC_ENCRYPTION_SECRET ||
    "f300c948aaa83752b55f1ec3b02b34f6029b65dcb8fa46bcb9f6459e19bffb043599bd2c30e8a2fc7952faf8be840eafb9968273671c74fed9ccc68ef6c6a634",
};
