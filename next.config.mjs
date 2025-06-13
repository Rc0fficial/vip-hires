/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
  remotePatterns: [
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '1337',
      pathname: '/uploads/**',
    },
    {
      protocol: 'https',
      hostname: 'your-production-strapi-domain.com',
      pathname: '/uploads/**',
    },
  ],
}
};

export default nextConfig;
