import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  content: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const {setPage} = userSlice.actions;
export default userSlice.reducer;
