const loadGruntConfig = require('load-grunt-config')
const { cwd } = require('process')

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-mocha-test')

  loadGruntConfig(grunt, {
    configPath: cwd() + '/config/grunt'
  })

  require('load-grunt-tasks')(grunt)

  grunt.registerTask('release', 'Bump the version and publish to NPM.', function (type) {
    grunt.task.run([
      'npm-contributors',
      'bump:' + (type || 'patch') + ':bump-only',
      'conventionalChangelog',
      'bump-commit',
      'conventionalGithubReleaser',
      'npm-publish'
    ])
  })

  grunt.loadNpmTasks('gruntify-eslint')
}
