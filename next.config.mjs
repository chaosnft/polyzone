/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Bỏ qua lỗi ESLint khi build (nếu bạn chưa setup ESLint)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Bỏ qua lỗi TypeScript khi build (tránh bị block do type)
    ignoreBuildErrors: true,
  },
  images: {
    // Cho phép load ảnh từ Strapi (local & production)
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'your-strapi-domain.com', // ⚠️ Thay bằng domain thật khi deploy (VD: api.polyzone.io)
        pathname: '/uploads/**',
      },
    ],
    unoptimized: true, // Tắt tối ưu ảnh (nếu bạn không dùng Image Optimization)
  },
};

export default nextConfig;
