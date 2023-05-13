/* eslint-disable no-undef */
const process = require('process')
const main = require('./index')

test('json with group metrics', async () => {
  process.env.GITHUB_REPOSITORY = 'pi-chan/simplecov-report-group-action'
  expect(await main('examples/example_with_group.json')).toEqual(true)
})

test('json without group metrics', async () => {
  process.env.GITHUB_REPOSITORY = 'pi-chan/simplecov-report-group-action'
  expect(await main('examples/example_without_group.json')).toEqual(true)
})
