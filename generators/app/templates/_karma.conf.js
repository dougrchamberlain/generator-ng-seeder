var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};
webpackConfig.devtool = 'inline-source-map';


module.exports = function (config) {
  config.set({

// base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    frameworks: ['jasmine'],

    files: [
      './node_modules/angular/angular.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './app/**/*.spec.js'
    ],
    preprocessors: {
      './app/**/*.js': ['webpack','sourcemap'],
    },

// test results reporter to use
// possible values: 'dots', 'progress'
// available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    webpack: webpackConfig,


// web server port
    port: 9876,


// enable / disable colors in the output (reporters and logs)
    colors: true,


// level of logging
// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


// enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


// start these browsers
// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'Chrome'
    ],
    customLaunchers: {
      ChromeSmall: {
        base: 'Chrome',
        flags: ['--window-size=300,300']
      }
    },

// Continuous Integration mode
// if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

// Concurrency level
// how many browser should be started simultaneous
    concurrency: 1,

    webpackMiddleware: {
// webpack-dev-middleware configuration
// i.e.
      noInfo: true,
// and use stats to turn off verbose output
      stats: {
        // options i.e.
        chunks: false
      }
    }
  })
};
