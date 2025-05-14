/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://www.tacosborabora.com'
  },
  images: {
    domains: ['www.tacosborabora.com', 'tacos-bora-bora.vercel.app']
  }
}

module.exports = nextConfig
