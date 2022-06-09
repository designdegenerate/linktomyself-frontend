import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  updating: false,
  profile: null,
  page: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUpdating: (state, action) => {
      state.updating = action.payload;
    },
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    setUserProfileByKey: (state, action) => {
      state.profile[action.payload.key] = action.payload.value;
    },
    setUserPage: (state, action) => {
      state.page = action.payload;
    },
    setUserPageByKey: (state, action) => {
      state.page[action.payload.key] = action.payload.value;
    },
    clearUserStore: (state, action) => {
      state.profile = null;
      state.page = null
    }
  }
})

export const {setUserLoading, setUpdating, setUserPage, setUserProfile, setUserProfileByKey, setUserPageByKey, clearUserStore} = userSlice.actions;
export default userSlice.reducer;