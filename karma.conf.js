var webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({
    customLaunchers: {
      chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      },
    },
    basePath: '',
    frameworks: ['jasmine-ajax', 'jasmine'],
    files: [
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
    browsers: ['chrome_without_security'],
    singleRun: false,
    concurrency: Infinity,
    mime: { 'text/x-typescript': ['ts','tsx'] }
  })
}
