/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  basePath: '/Tools', // Your repository name
  images: {
    unoptimized: true, // Required for static export
  },
  assetPrefix: '/Tools/',
  trailingSlash: true,
  distDir: 'out',
}

module.exports = nextConfig 