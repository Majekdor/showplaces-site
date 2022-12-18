/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
            //{
            //    source: '/',
            //    destination: '/index.html'
            //}
        ]
    },
    env: {
        MAPKIT_KEY: process.env.MAPKIT_KEY,
        KID: process.env.KID,
        ISS: process.env.ISS,
        BYTEBIN_AUTH_KEY: process.env.BYTEBIN_AUTH_KEY
    }
}

module.exports = nextConfig
