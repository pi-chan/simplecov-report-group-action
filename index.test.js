const report = require('./report');
const process = require('process');
const cp = require('child_process');
const path = require('path');

test('test runs', async () => {
  process.env['GITHUB_WORKSPACE'] = './';
  process.env['GITHUB_REPOSITORY'] = 'pi-chan/simplecov-report-group-action';
  expect(await report()).toEqual(true);
})
