var webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    customLaunchers: {
      // Not current used by can be used to test if CORS is on
      chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      },
    },
    basePath: '',
    frameworks: ['jasmine-ajax', 'jasmine'],
    files: [
      'dist/citrus.js',
      'spec/index.spec.ts'
    ],
    exclude: [
    ],
    preprocessors: {
      'spec/index.spec.ts': ['webpack', 'sourcemap']
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      devtool: 'inline-source-map'
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    // Turn this off to debug
    singleRun: true,
    concurrency: Infinity,
    mime: { 'text/x-typescript': ['ts', 'tsx'] }
  })
}
