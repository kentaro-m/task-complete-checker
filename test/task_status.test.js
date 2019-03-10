const { Context } = require('probot')
const TaskStatus = require('../lib/task_status')
const prOpenedFailurePayload = require('./fixtures/pull_request.opened.failure')
const prOpenedSuccessPayload = require('./fixtures/pull_request.opened.success')

describe('TaskStatus', () => {
  let event
  let context

  test('creates failure conclusion if some tasks are uncompleted', async () => {
    event = {
      id: '123',
      payload: prOpenedFailurePayload
    }

    context = new Context(event, {}, {})

    context.github.checks = {
      create: jest.fn().mockImplementation(async () => {})
    }

    const createSpy = jest.spyOn(context.github.checks, 'create')

    await TaskStatus.check(context)

    expect(createSpy).toBeCalled()
    expect(createSpy.mock.calls[0][0]).toEqual({
      owner: 'kentaro-m',
      repo: 'task-complete-checker-test',
      name: 'Task Complete Checker',
      head_sha: '932a4b32adfd37e3b77acca5fa9f746eb36ed59f',
      status: 'completed',
      conclusion: 'failure',
      completed_at: createSpy.mock.calls[0][0].completed_at,
      output: {
        title: 'Task Complete Checker',
        summary: 'Some tasks are uncompleted!',
        text: '## :x: Uncompleted Tasks\n- [ ] Update documents\n- [ ] Add the unit tests\n- [ ] Lint the source codes\n'
      }
    })
  })

  test('creates success conclusion if all tasks are completed', async () => {
    event = {
      id: '123',
      payload: prOpenedSuccessPayload
    }

    context = new Context(event, {}, {})

    context.github.checks = {
      create: jest.fn().mockImplementation(async () => {})
    }

    const createSpy = jest.spyOn(context.github.checks, 'create')

    await TaskStatus.check(context)

    expect(createSpy).toBeCalled()
    expect(createSpy.mock.calls[0][0]).toEqual({
      owner: 'kentaro-m',
      repo: 'task-complete-checker-test',
      name: 'Task Complete Checker',
      head_sha: '932a4b32adfd37e3b77acca5fa9f746eb36ed59f',
      status: 'completed',
      conclusion: 'success',
      completed_at: createSpy.mock.calls[0][0].completed_at,
      output: {
        title: 'Task Complete Checker',
        summary: 'All tasks are completed!',
        text: '## :white_check_mark: Completed Tasks\n- [x] Update documents\n- [x] Add the unit tests\n- [x] Lint the source codes\n'
      }
    })
  })
})