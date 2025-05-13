/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://tacosborabora.com'
  },
  images: {
    domains: ['tacosborabora.com']
  }
}

module.exports = nextConfig
