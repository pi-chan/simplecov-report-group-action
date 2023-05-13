// Requiring necessary libraries.
const core = require('@actions/core')
const github = require('@actions/github')
const path = require('path')
const replaceComment = require('@aki77/actions-replace-comment')
const table = require('markdown-table')

const main = async (filePath) => {
  try {
    const pullRequestId = github.context.issue.number

    // Run this workflow only if event is a pull request.
    if (!pullRequestId) return true

    // Fetch coverage.json and get the groups from the file.
    const json = require(path.resolve(process.env.GITHUB_WORKSPACE, filePath))
    const groups = json.groups || []

    // Table data construction.
    const headers = ['Group Name', 'Covered Percent', 'Covered Lines', 'Lines of Code']
    const metrics = [
      '**Total**',
      `**${json.metrics.covered_percent.toFixed(3)}**`,
      `**${json.metrics.covered_lines}**`,
      `**${json.metrics.total_lines}**`
    ]
    const groupRows = groups.map((group) => [
      group.group_name,
      group.covered_percent.toFixed(3),
      group.covered_lines,
      group.lines_of_code
    ])
    const tableText = table([headers, ...groupRows, metrics])

    // Request payload construction.
    // Body is a markdown.
    const payload = {
      token: core.getInput('token'),
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: pullRequestId,
      body: `## ${core.getInput('comment-subject')} \
             ${tableText}`
    }

    // TODO: Add minimum coverage checks.

    // Sending request to add new/replace previous coverage report comment.
    await replaceComment.default(payload)
  } catch (error) {
    core.setFailed(error.message)
    return false
  }

  return true
}

module.exports = main

main(`${core.getInput('working-directory')}/${core.getInput('result-path')}`)
