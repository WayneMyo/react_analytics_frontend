module.exports = function override(config, env) {
    config.resolve.fallback = {
      assert: require.resolve('assert'),
      buffer: require.resolve('buffer'),
      stream: require.resolve('stream-browserify'),
    };
  
    return config;
  };
  