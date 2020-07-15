export const removeTask = (taskList, taskId) => {
  return taskList.filter((task) => task.id !== taskId)
}
