import axios from "axios";
import { setPage } from "./slice";
import apiUrl from "../../apiUrl";

export const fetchPage = (username) => async(dispatch, getState) => {
  try {
    const page = await axios.get(`${apiUrl}/page/${username}`);
    dispatch(setPage(page.data));
  } catch (error) {
    console.log(error);
  }
}