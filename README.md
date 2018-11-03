# karma-docker-launcher

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
 [![npm version](https://img.shields.io/npm/v/@rkuzsma/karma-docker-launcher.svg?style=flat-square)](https://www.npmjs.com/package/@rkuzsma/karma-docker-launcher) [![npm downloads](https://img.shields.io/npm/dm/@rkuzsma/karma-docker-launcher.svg?style=flat-square)](https://www.npmjs.com/package/@rkuzsma/karma-docker-launcher)

[![Build Status](https://img.shields.io/travis/rkuzsma/karma-docker-launcher/master.svg?style=flat-square)](https://travis-ci.org/rkuzsma/karma-docker-launcher) [![Dependency Status](https://img.shields.io/david/rkuzsma/karma-docker-launcher.svg?style=flat-square)](https://david-dm.org/rkuzsma/karma-docker-launcher) [![devDependency Status](https://img.shields.io/david/dev/rkuzsma/karma-docker-launcher.svg?style=flat-square)](https://david-dm.org/rkuzsma/karma-docker-launcher#info=devDependencies)

> Docker image launcher for [Karma](https://github.com/karma-runner/karma)

This plugin allows you to use any Docker image containing a browser as a browser launcher.

## Installation

Install using

```bash
$ npm install @rkuzsma/karma-docker-launcher --save-dev
```

## Configuration

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    plugins: [
      // Karma automatically require()s packages that start with karma-*,
      // but it does not recognize scoped packages, so we must be explicit.
      '@rkuzsma/karma-docker-launcher',
      'karma-*'
    ],
    browsers: [
      'DockerFirefoxHeadless',
      'DockerChromeHeadless'
    ],
    customLaunchers: {
      DockerFirefoxHeadless: {
        base: 'Docker',
        // Use your favorite Firefox headless image, e.g. https://github.com/rkuzsma/docker-headless-browsers
        image: 'firefox-headless:latest'
        containerCommand: 'firefox ' +
          '-p headless ' +
          '-no-remote ' +
          '-headless ' +
          '-url $KARMA_URL'
      },
      DockerChromeHeadless: {
        base: 'Docker',
        // Use your favorite Chrome headless image, e.g.:
        image: 'alpeware/chrome-headless-stable:latest',
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
    }
  });
}
```

`$KARMA_URL` will be replaced at runtime with the URL of the Karma web server. If you are running Karma on `localhost`, the `$KARMA_URL` will point to `host.docker.internal` so that the container can access it.

For more information on Karma see the [homepage].

[homepage]: http://karma-runner.github.com
