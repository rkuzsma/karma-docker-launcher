module.exports = {
  pkgFile: 'package.json',

  'npm-contributors': {
    options: {
      commitMessage: 'chore: update contributors'
    }
  },
  conventionalChangelog: {
    release: {
      options: {
        changelogOpts: {
          preset: 'angular'
        }
      },
      src: 'CHANGELOG.md'
    }
  },
  conventionalGithubReleaser: {
    release: {
      options: {
        auth: {
          type: 'oauth',
          token: process.env.GH_TOKEN
        },
        changelogOpts: {
          preset: 'angular',
          releaseCount: 0
        }
      }
    }
  },
  bump: {
    options: {
      commitMessage: 'chore: release v%VERSION%',
      pushTo: 'upstream',
      commitFiles: [
        'package.json',
        'CHANGELOG.md'
      ]
    }
  }
}
