import axios from "axios";
import { setPage, setNotFound } from "./slice";
import apiUrl from "../../apiUrl";
import toast from "react-hot-toast";

export const fetchPage = (username) => async(dispatch, getState) => {
  try {
    const page = await axios.get(`${apiUrl}/page/${username}`);
    dispatch(setPage(page.data));

    document.title = `${page.data.user.name} — Linktomyself`;
  } catch (error) {
    console.log(error);
    if (error.response.status === 404) {
      dispatch(setNotFound());
    } else {
      toast(error.response.data);
    }
  }
}