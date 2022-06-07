import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
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
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    setUserPage: (state, action) => {
      state.page = action.payload;
    },
    clearUserStore: (state, action) => {
      state.profile = null;
      state.page = null
    }
  }
})

export const {setUserLoading, setUserPage, setUserProfile, clearUserStore} = userSlice.actions;
export default userSlice.reducer;