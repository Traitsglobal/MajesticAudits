import type { NextConfig } from "next";
import { withBundleAnalyzerConfig } from './bundle-analyzer'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: ' ',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'majesticaudits.com',
        pathname: '/uploads/**'
      },
      // {
      //   protocol: 'http',
      //   hostname: 'majestic.hopto.org',
      //   pathname: '/uploads/**',
      // },
      {
        protocol: 'http',
        hostname: 'ec2-34-224-212-73.compute-1.amazonaws.com',
        pathname: '/uploads/**',
      },
      // Add your production domain when deploying
      // {
      //   protocol: 'https',
      //   hostname: 'your-production-domain.com',
      //   pathname: '/uploads/**',
      // },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Add performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
    typedRoutes: true,
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['localhost:3000']
    },
  },
  // Enable gzip compression
  compress: true,
  // Optimize bundle size
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Split chunks for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
};

// Apply bundle analyzer wrapper
export default withBundleAnalyzerConfig(nextConfig);
