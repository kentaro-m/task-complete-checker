/* global describe, beforeEach, test, expect */

const nock = require('nock')
const taskCompleteChecker = require('..')
const TaskStatus = require('../lib/task_status')
const { Probot } = require('probot')
const prOpenedPayload = require('./fixtures/pull_request.opened.success')

nock.disableNetConnect()

describe('app', () => {
  test.only('runs the app if sends the pull request event', async () => {
    const checkSpy = jest.spyOn(TaskStatus, 'check')

    const probot = new Probot({})
    const app = probot.load(taskCompleteChecker)
    app.app = () => 'test'

    nock('https://api.github.com')
      .post('/app/installations/735996/access_tokens')
      .reply(200, { token: 'test' })

    nock('https://api.github.com')
      .post('/repos/kentaro-m/task-complete-checker-test/check-runs', (body) => {
        body.completed_at = '2018-07-14T18:18:54.156Z'
        return true
      })
      .reply(200)

    await probot.receive({ name: 'pull_request', payload: prOpenedPayload })

    expect(checkSpy).toBeCalled()
  })
})
