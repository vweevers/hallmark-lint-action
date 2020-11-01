'use strict'

const hallmark = require('hallmark')
const getOctokit = require('./octokit')
const getOptions = require('./options')
const ann = require('./vfile-annotations')
const sha = require('./sha')

module.exports = async function action (core, github) {
  const start = new Date()
  const token = core.getInput('token')
  const files = core.getInput('files')
  const options = getOptions(files, github.context.repo)

  if (!token) {
    core.setFailed('The "token" input is required')
    return
  }

  // TODO: should we only create annotations for files/lines that changed?
  const result = await hallmark.lint(options)
  const annotations = ann(result.files)
  const length = annotations.length
  const octokit = getOctokit(token)
  const ok = result.code === 0

  // TODO: support more than 50 annotations by updating the check in chunks
  await octokit.checks.create({
    ...github.context.repo,
    name: 'Markdown Style Guide',
    head_sha: sha(github.context),
    started_at: start.toISOString(),
    completed_at: new Date().toISOString(),
    conclusion: ok ? 'success' : 'failure',
    output: {
      // Where is this title used?
      title: 'Markdown Style Guide',
      summary: ok ? 'Passed' : `${length} warning${length === 1 ? '' : 's'}`,
      annotations: length > 50 ? annotations.slice(0, 50) : annotations
    }
  })
}
