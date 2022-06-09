// export const selectPost = (reduxState) => reduxState.post;
export const selectUserProfile = (reduxState) => reduxState.user.profile;
export const selectUserPage = (reduxState) => reduxState.user.page;
export const isUserLoading = (reduxState) => reduxState.user.loading;
export const isDataUpdating = (reduxState) => reduxState.user.updating;