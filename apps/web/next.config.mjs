/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async rewrites() {
    const apiUrl = (process.env.API_INTERNAL_URL || 'http://127.0.0.1:3018').replace(/\/$/, '');
    return [
      { source: '/api/:path*', destination: `${apiUrl}/:path*` },
    ];
  },
};

export default nextConfig;
