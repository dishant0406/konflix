/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    fontLoaders: [
      { loader: 'next/font/google' },
    ],
  }
}

module.exports = nextConfig
