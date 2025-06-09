/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // reactCompiler: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/react-together-next' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/react-together-next/' : '',
}

module.exports = nextConfig
