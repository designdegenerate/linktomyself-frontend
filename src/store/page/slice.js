import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  content: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
  }
})

export const {} = userSlice.actions;
export default userSlice.reducer;