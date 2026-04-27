/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      // For S3 bucket URLs like: https://your-bucket-name.s3.amazonaws.com/image.jpg
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
        port: "",
      },
      // For S3 bucket URLs like: https://your-bucket-name.s3.us-east-1.amazonaws.com/image.jpg
      {
        protocol: "https",
        hostname: "*.s3.*.amazonaws.com",
        port: "",
      },
      // For CloudFront URLs (if you're using CloudFront CDN)
      {
        protocol: "https",
        hostname: "*.cloudfront.net",
        port: "",
      },
    ],
  },
};

export default nextConfig;
