/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://www.tacosborabora.com'
  },
  images: {
    domains: ['www.tacosborabora.com', 'tacos-bora-bora.vercel.app']
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'tacosborabora.com'
          }
        ],
        destination: 'https://www.tacosborabora.com',
        permanent: true
      },
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'http://tacosborabora.com'
          }
        ],
        destination: 'https://www.tacosborabora.com',
        permanent: true
      }
    ];
  }
}

module.exports = nextConfig
