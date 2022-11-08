/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

module.exports = {
  // nextConfig,
  env: {
    MONGO_URI: process.env.DATABASE_URL,
    myApiKey: process.env.REACT_APP_API_KEY
  }
}
