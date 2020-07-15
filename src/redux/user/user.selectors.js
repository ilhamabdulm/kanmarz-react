import { createSelector } from 'reselect'

const selectUser = (state) => state.user

export const selectLoginStatus = createSelector(
  [selectUser],
  (user) => user.loginStatus
)

export const selectUserId = createSelector([selectUser], (user) => user.userId)
