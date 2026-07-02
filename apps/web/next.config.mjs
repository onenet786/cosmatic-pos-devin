/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    const apiUrl = (process.env.API_INTERNAL_URL || 'http://127.0.0.1:3018').replace(/\/$/, '');
    return [
      { source: '/api/:path*', destination: `${apiUrl}/v1/:path*` },
    ];
  },
};

export default nextConfig;
