/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"s3.piton.com.tr"
      }
    ]
  }
}

module.exports = nextConfig
