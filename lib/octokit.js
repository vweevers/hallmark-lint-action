'use strict'

const { GitHub, getOctokitOptions } = require('@actions/github/lib/utils')
const { throttling } = require('@octokit/plugin-throttling')
const { retry } = require('@octokit/plugin-retry')

module.exports = function getOctokit (token) {
  const Octokit = GitHub.plugin(throttling, retry)
  const options = getOctokitOptions(token)

  options.throttle = {
    onRateLimit (retryAfter, options, octokit) {
      octokit.log.warn(`Request quota exhausted for request ${options.method} ${options.url}`)

      if (options.request.retryCount < 5) {
        octokit.log.info(`Retrying after ${retryAfter} seconds`)
        return true
      }
    },
    onAbuseLimit (retryAfter, options, octokit) {
      octokit.log.warn(`Abuse detected for request ${options.method} ${options.url}`)
    }
  }

  return new Octokit(options)
}
