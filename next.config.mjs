const nextConfig = {
  reactStrictMode: false,
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    WEBSITENAME: process.env.WEBSITE_NAME,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};
export default nextConfig;
