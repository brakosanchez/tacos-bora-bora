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
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
      crypto: false,
      stream: false,
      http: false,
      https: false,
      zlib: false,
      assert: false,
      buffer: false,
      util: false
    }
    return config
  },
  distDir: '.next',
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
