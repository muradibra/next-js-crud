/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: 'encrypted-tbn0.gstatic.com',
      }
    ]
  }
};

export default nextConfig;
