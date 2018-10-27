const chai = require('chai')

module.exports = function (grunt, options) {
  return {
    test: {
      options: {
        bail: true,
        clearRequireCache: true,
        require: [
          () => { global.expect = chai.expect }
        ]
      },
      src: [
        'test/unit/**/*.js'
      ]
    }
  }
}
