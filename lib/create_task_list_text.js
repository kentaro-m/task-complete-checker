module.exports = function createTaskListText (body) {
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
