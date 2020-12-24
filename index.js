const core = require('@actions/core')
const report = require('./report')

// most @actions toolkit packages have async methods
async function run () {
  try {
    report()
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
