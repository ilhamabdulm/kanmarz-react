import { createSelector } from 'reselect'

const selectProjects = (state) => state.projects

export const selectPersonalProjects = createSelector(
  [selectProjects],
  (projects) => projects.personalProjects
)

export const selectGroupProjects = createSelector(
  [selectProjects],
  (projects) => projects.groupProjects
)

export const selectProjectModal = createSelector(
  [selectProjects],
  (projects) => projects.projectModal
)

export const selectInviteModal = createSelector(
  [selectProjects],
  (projects) => projects.inviteModal
)

export const selectProjectDetails = createSelector(
  [selectProjects],
  (projects) => projects.projectDetails
)

export const selectProjectInvitations = createSelector(
  [selectProjects],
  (projects) => projects.invitations
)
