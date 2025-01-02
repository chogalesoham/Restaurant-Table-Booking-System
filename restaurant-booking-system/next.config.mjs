/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "restauracja.files.wordpress.com", // Added the required domain
      "images.lifestyleasia.com", // Example domain
      "your-other-image-source.com", // Another domain
      "example.com", // Another one
    ],
  },
};

export default nextConfig;
