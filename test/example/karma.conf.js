// Karma configuration

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    // list of files / patterns to load in the browser
    files: [
      'lib/*.js',
      'test/*.js'
    ],
    // list of files to exclude
    exclude: [
    ],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],
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
      'DockerFirefoxHeadless',
      'DockerChromeHeadless'
    ],
    customLaunchers: {
      DockerFirefoxHeadless: {
        base: 'Docker',
        image: 'firefox-headless',
        containerCommand: 'firefox ' +
          '-p headless ' +
          '-no-remote ' +
          '-headless ' +
          '-url $KARMA_URL'
      },
      DockerChromeHeadless: {
        base: 'Docker',
        // Use your favorite Chrome headless docker container
        // image: 'chrome-headless',
        // containerCommand: 'chrome ' +
        // // // image: 'zenika/alpine-chrome',
        // // containerCommand: 'chromium-browser ' +
        image: 'alpeware/chrome-headless-stable:ver-70.0.3538.77',
        containerCommand: 'google-chrome-stable ' +
          '--headless ' +
          '--no-sandbox ' +
          '--remote-debugging-port=9222 ' +
          '--user-data-dir=/userdata ' +
          '--no-default-browser-check ' +
          '--no-first-run ' +
          '--disable-default-apps ' +
          '--disable-popup-blocking ' +
          '--disable-translate ' +
          '--disable-background-timer-throttling ' +
          '--disable-renderer-backgrounding ' +
          '--disable-device-discovery-notifications ' +
          '--disable-software-rasterizer ' +
          '--no-gpu ' +
          '--mute-audio ' +
          '--hide-scrollbars ' +
          '$KARMA_URL'

      }
    },
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
