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
    }
  }
})

export const {setUserPage, setUserProfile} = userSlice.actions;
export default userSlice.reducer;