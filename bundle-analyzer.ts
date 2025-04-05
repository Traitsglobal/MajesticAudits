import withBundleAnalyzer from '@next/bundle-analyzer'
import type { NextConfig } from 'next'

export const withBundleAnalyzerConfig = (config: NextConfig): NextConfig =>
  withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  })(config) 