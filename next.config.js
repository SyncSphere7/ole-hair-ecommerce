const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  // Use a non-default SW filename to avoid conflicts with any existing files
  sw: 'pwa-sw.js',
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
