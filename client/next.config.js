/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_PATH: process.env.BASE_PATH,
    STRIPE_TOKEN: process.env.STRIPE_TOKEN,
  },
};

module.exports = nextConfig;
