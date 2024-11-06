const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve = webpackConfig.resolve || {};
      webpackConfig.resolve.fallback = {
        assert: require.resolve('assert'),
        buffer: require.resolve('buffer'),
        crypto: require.resolve('crypto-browserify'),
        os: require.resolve('os-browserify/browser'),
        path: require.resolve('path-browserify'),
        process: require.resolve('process/browser'),
        stream: require.resolve('stream-browserify'),
        url: require.resolve('url'),
      };
      return webpackConfig;
    },
  },
};