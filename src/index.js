const spawn = require('child_process').spawn
const spawnargs = require('spawn-args')

function execute (command, log) {
  const chunks = []
  const tokens = command.split(/\s/)
  log.info(`Running: '${command}'`)
  const shell = spawn(tokens.shift(), spawnargs(tokens.join(' '), { removequotes: 'always' }))

  shell.stderr.on('readable', () => {
    const chunk = shell.stderr.read()

    if (chunk !== null) {
      log.warn(chunk.toString())
    }
  })

  shell.stdout.on('readable', () => {
    const chunk = shell.stdout.read()

    if (chunk !== null) {
      chunks.push(chunk.toString())
    }
  })

  return new Promise((resolve, reject) => {
    shell.on('error', (err) => {
      reject(err)
    })

    shell.on('exit', (code) => {
      if (code === 0) {
        resolve(chunks.join(''))
      } else {
        reject(code)
      }
    })
  })
};

function isLooksLikeContainerId (str) {
  return /^[a-fA-F0-9]+$/.test(str)
}

function DockerBrowser (args, baseBrowserDecorator, logger) {
  baseBrowserDecorator(this)

  const log = logger.create('launcher')
  let containerId = null

  this._start = () => {}

  this.on('kill', (done) => {
    const stopCmd = `docker stop ${containerId}`
    return execute(stopCmd, log)
      .then((result) => done())
      .catch(() => {
        log.error(`Failed to stop Docker browser with command: ${stopCmd}`)
        done()
      })
  })

  this.on('start', (url) => {
    if (!args.image) {
      log.error('No image specified in Karma configuration.')
      return
    }

    if (!args.containerCommand) {
      log.error('No containerCommand specified in Karma configuration.')
      return
    }

    const karmaUrlForContainer = url.replace(/localhost:/, 'host.docker.internal:')
    const image = args.image
    const containerCommand = args.containerCommand.replace(/\$KARMA_URL/, karmaUrlForContainer)
    const startCmd = `docker run --rm -d ${image} ${containerCommand}`

    return execute(startCmd, log)
      .then((result) => {
        if (isLooksLikeContainerId(result.trim())) {
          containerId = result.trim()
          log.info(`Launched Docker container: ${containerId}`)
        } else {
          log.error(`Unexpected response when launching Docker container: ${result}`)
        }
      })
      .catch((err) => {
        log.error(`Failed to launch Docker container with command: '${startCmd}'. Error: ${err}`)
      })
  })
}

// PUBLISH DI MODULE
module.exports = {
  'launcher:Docker': ['type', DockerBrowser]
}

DockerBrowser.prototype.name = 'Docker'

DockerBrowser.$inject = [ 'args', 'baseBrowserDecorator', 'logger' ]

module.exports = {
  'launcher:Docker': [ 'type', DockerBrowser ]
}
