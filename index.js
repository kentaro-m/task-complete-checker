const TaskStatus = require('./lib/task_status')

module.exports = app => {
  app.on([
    'pull_request.opened',
    'pull_request.edited',
    'pull_request.closed',
    'pull_request.reopened'
  ], TaskStatus.check)
}
