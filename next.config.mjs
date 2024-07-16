/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    // images:{
    //    domains: ["avatars.githubusercontent.com"]
    // },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
            pathname: '**',
          },
        ],
      },
};

export default nextConfig;