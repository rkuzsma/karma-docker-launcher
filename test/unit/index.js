const chai = require('chai')

// const rewire = require('rewire')

const spies = require('chai-spies')

chai.use(spies)
const expect = chai.expect
const dockerLauncher = require('../../src/index.js')
// const rewiredLauncher = rewire('../../src/index.js')

describe('karma-docker-launcher', () => {
  it('should export the launcher', () => {
    expect(dockerLauncher['launcher:Docker']).to.not.be.undefined
  })
})
