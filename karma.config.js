var webpackConfig = require('./webpack.dev.config.js');
webpackConfig.entry = {};
webpackConfig.plugins = {};

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    autoWatchBatchDelay: 300,

    files: [
      './src/index.js',
      './tests/**/*.spec.js'
    ],

    preprocessors: {
      './src/index.js': ['webpack'],
      './tests/**/*.spec.js': ['webpack']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    }
  });
};
