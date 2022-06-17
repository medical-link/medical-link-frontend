/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    additionalData:
      '@import "./src/styles/_color.scss"; @import "./src/styles/_font.scss";',
  },
};

module.exports = nextConfig;
