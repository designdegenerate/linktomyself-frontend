import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  page: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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

export const {setUserPage, setUserProfile, clearUserStore} = userSlice.actions;
export default userSlice.reducer;