/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'], // Add common domains for testing
  },
}

module.exports = nextConfig
