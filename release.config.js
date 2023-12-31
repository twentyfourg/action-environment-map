/* eslint-disable no-template-curly-in-string */
module.exports = {
  branches: ['master'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          {
            breaking: true,
            release: 'major',
          },
          {
            revert: true,
            release: 'patch',
          },
          {
            type: 'feat',
            release: 'minor',
          },
          {
            type: 'fix',
            release: 'patch',
          },
          {
            type: 'build',
            scope: 'deps',
            release: 'patch',
          },
        ],
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            {
              type: 'feat',
              section: 'Features',
            },
            {
              type: 'fix',
              section: 'Bug Fixes',
            },
            {
              type: 'build',
              section: 'Build',
            },
          ],
        },
      },
    ],
    '@semantic-release/changelog',
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'npm version ${nextRelease.version} --no-git-tag-version',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['dist', 'CHANGELOG.md', 'package.json', 'package-lock.json'],
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: '*.tgz',
      },
    ],
  ],
};
