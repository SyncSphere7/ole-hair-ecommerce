const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com'],
  },
  eslint: {
    // Don’t fail the build on ESLint errors in production (Vercel)
    ignoreDuringBuilds: true,
  },
}

module.exports = withPWA(nextConfig)
