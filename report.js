const core = require('@actions/core');
const table = require('markdown-table')
// const replaceComment = require('@aki77/actions-replace-comment')
const path = require('path');
const github = require('@actions/github')
import replaceComment from '@aki77/actions-replace-comment'

let report = async function () {
  const resultPath = core.getInput('resultPath') || 'example.json'
  core.debug(`resultPath ${resultPath}`)

  const json = require(path.resolve(process.env.GITHUB_WORKSPACE, resultPath))
  const groups = json.groups

  const header = [
    'group name',
    'covered percent',
    'covered lines',
    'lines of code'
  ]

  const metrics = [
    'total',
    json.metrics.covered_percent,
    json.metrics.covered_lines,
    json.metrics.lines_of_code,
  ]

  const groupRows = groups.map((group) => {
    return [
      group.group_name,
      group.covered_percent.toFixed(3),
      group.covered_lines,
      group.lines_of_code,
    ]
  })

  const tableText = table([header, metrics, ...groupRows])

  const pullRequestId = github.context.issue.number
  if (pullRequestId) {
    await replaceComment({
      token: core.getInput('token', {required: true}),
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: pullRequestId,
      body: `## Simplecov Coverage
${tableText}
`
    })
  }

  return true
};

module.exports = report;
