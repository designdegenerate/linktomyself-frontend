import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  page: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    }
  }
})

export const {setPage, setProfile} = userSlice.actions;
export default userSlice.reducer;