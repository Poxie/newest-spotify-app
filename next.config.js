/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.scdn.co', 'mosaic.scdn.co', 'wrapped-images.spotifycdn.com', 'blend-playlist-covers.spotifycdn.com', 'dailymix-images.scdn.co']
  }
}

module.exports = nextConfig
