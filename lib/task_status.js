const createTaskListText = require('./create_task_list_text')

exports.check = async function (context) {
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
      text: createTaskListText(body)
    }
  }))
}