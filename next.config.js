// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.glsl$/,
      use: ["raw-loader"],
      exclude: /node_modules/,
    });
    return config;
  },
};

module.exports = nextConfig;
