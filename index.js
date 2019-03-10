module.exports = app => {
  app.on([
    'pull_request.opened',
    'pull_request.edited',
    'pull_request.closed',
    'pull_request.reopened'
  ], check)

  function getTaskListText (body) {
    const completedTasks = body.match(/(- \[[x]\].+)/g)
    const uncompletedTasks = body.match(/(- \[[ ]\].+)/g)

    let text = ''

    if (completedTasks !== null) {
      completedTasks.forEach((completedTask, index) => {
        if (index === 0) {
          text += '## :white_check_mark: Completed Tasks\n'
        }
        text += `${completedTask}\n`
      })
    }

    if (uncompletedTasks !== null) {
      uncompletedTasks.forEach((uncompletedTask, index) => {
        if (index === 0) {
          text += '## :x: Uncompleted Tasks\n'
        }
        text += `${uncompletedTask}\n`
      })
    }

    return text
  }

  async function check (context) {
    const body = context.payload.pull_request.body

    const isTaskCompleted = body.match(/(- \[[ ]\].+)/g) === null

    await context.github.checks.create(context.repo({
      name: 'Task Complete Checker',
      head_sha: context.payload.pull_request.head.sha,
      status: 'completed',
      conclusion: isTaskCompleted ? 'success' : 'failure',
      completed_at: new Date(),
      output: {
        title: 'Task Complete Checker',
        summary: isTaskCompleted ? 'All tasks are completed!' : 'Some tasks are uncompleted!',
        text: getTaskListText(body)
      }
    }))
  }
}
