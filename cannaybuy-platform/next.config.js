/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@cannabuy/ui', '@cannabuy/compliance', '@cannabuy/types'],
  appDir: 'apps/web/src/app',
  dir: 'apps/web',
  output: '.next',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: '**.cannbuy.co.za' },
    ],
  },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    }]
  },
}
module.exports = nextConfig
