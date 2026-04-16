/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@cannabuy/ui', '@cannabuy/compliance', '@cannabuy/types'],
};

module.exports = nextConfig;
