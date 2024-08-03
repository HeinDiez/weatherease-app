/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.weatherbit.io',
                port: '',
                pathname: '/static/img/icons/**',
            },
        ],
    },
};

export default nextConfig;
