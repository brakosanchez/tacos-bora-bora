/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.tacosborabora.com', 'tacos-bora-bora.vercel.app'],
    unoptimized: true
  },
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    esmExternals: true
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        dns: false
      }
    }
    return config
  }
}

module.exports = nextConfig
