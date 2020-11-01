'use strict'

const core = require('@actions/core')
const github = require('@actions/github')
const action = require('./lib/action')

async function main () {
  try {
    await action(core, github)
  } catch (err) {
    core.setFailed(err.message)
  }
}

main()
