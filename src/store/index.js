import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/slice";
import pageReducer from "./page/slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    page: pageReducer
  }
});

export default store;