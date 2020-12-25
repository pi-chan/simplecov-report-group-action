const core = require('@actions/core')
const path = require('path')
const report = require('./report')

// most @actions toolkit packages have async methods
async function run () {
  try {
    const resultPath = core.getInput('resultPath')
    core.debug(`resultPath ${resultPath}`)

    const json = require(path.resolve(process.env.GITHUB_WORKSPACE, resultPath))
    report(json)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
