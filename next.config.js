/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'graph.facebook.com', 'www.tacosborabora.com', 'tacos-bora-bora.vercel.app'],
    unoptimized: true
  },
  async redirects() {
    return [
      {
        source: '/auth/login',
        destination: '/api/auth/signin',
        permanent: false,
      },
    ];
  },
  swcMinify: true,
  experimental: {
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
