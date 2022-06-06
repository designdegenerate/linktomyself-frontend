import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notFound: false,
  content: null,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.content = action.payload;
    },
    setNotFound: (state, action) => {
      state.notFound = true;
    }
  },
});

export const { setPage, setNotFound } = pageSlice.actions;
export default pageSlice.reducer;
