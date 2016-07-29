var webpackConfig = require('./webpack.dev.config.js');
webpackConfig.entry = {};
webpackConfig.plugins = {};
process.env.BABEL_ENV = 'test';

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    reporters: ['progress', 'coverage'],
    coverageReporter: {
      reporters: [
        {type: 'lcov', dir: 'coverage/', subdir: '.'},
        {type: 'json', dir: 'coverage/', subdir: '.'},
        {type: 'text-summary'}
      ]
    },
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
