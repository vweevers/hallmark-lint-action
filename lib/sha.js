'use strict'

module.exports = function sha (context) {
  const pr = context.payload.pull_request
  return pr ? pr.head.sha : context.sha
}
