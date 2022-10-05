// DEMO TEAM CUSTOMIZATION (whole file) - Add Next bundle analyzer

const withBundleAnalizerPlugin = (nextConfig = {}) => {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });

  return withBundleAnalyzer(nextConfig)
};

module.exports = withBundleAnalizerPlugin;
