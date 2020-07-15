import { createSelector } from 'reselect'

const selectTasks = (state) => state.tasks

export const selectBoard = createSelector(
  [selectTasks],
  (tasks) => tasks.boards
)

export const selectModalShow = createSelector(
  [selectTasks],
  (tasks) => tasks.modalShow
)

export const selectTaskDetails = createSelector(
  [selectTasks],
  (tasks) => tasks.taskDetails
)

export const selectModalDetail = createSelector(
  [selectTasks],
  (tasks) => tasks.editModal
)

export const selectTaskBoard = (status) =>
  createSelector([selectTasks], (tasks) => {
    return tasks.taskList.filter((task) => task.status === status)
  })
