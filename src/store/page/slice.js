import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  content: null,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.content = action.payload;
      if (state.content.colors) {
        const html = document.documentElement.style;
        const main = document.querySelector("main");
        console.log(main);
        const colors = state.content.colors;

        //This is usually a bad idea, but it's quite
        //harmless in this case. Besides, this guarantees
        //that these colors will only be set on a per
        //page case
        html.setProperty("--lightFG", colors.lightFG);
        html.setProperty("--lightBG", colors.lightBG);
        html.setProperty("--darkFG", colors.darkFG);
        html.setProperty("--darkBG", colors.darkBG);
      }
    },
  },
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;
