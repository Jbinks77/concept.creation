/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'creationconcept.fr' }],
        destination: 'https://www.creationconcept.fr/:path*',
        permanent: true, // 301
      },
    ];
  },
};

export default nextConfig;
