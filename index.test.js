const report = require('./report')
const process = require('process')
const cp = require('child_process')
const path = require('path')

test('json with group metrics', async () => {
  process.env.GITHUB_REPOSITORY = 'pi-chan/simplecov-report-group-action'

  const json = require(path.resolve('./', 'examples/example_with_group.json'))
  expect(await report(json)).toEqual(true)
})

test('json without group metrics', async () => {
  process.env.GITHUB_REPOSITORY = 'pi-chan/simplecov-report-group-action'

  const json = require(path.resolve('./', 'examples/example_without_group.json'))
  expect(await report(json)).toEqual(true)
})
