'use strict'

module.exports = function getOptions (files, { owner, repo }) {
  files = files.split(/[\r\n]+/).filter(Boolean)

  return {
    files: files.length ? files : null,
    repository: `${owner}/${repo}`,
    contributors: false
  }
}
