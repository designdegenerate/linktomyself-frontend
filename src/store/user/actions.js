import axios from "axios";
import { setPage, setProfile } from "./slice";
import apiUrl from "../../apiUrl";

export const loginUser = (email, password) => async(dispatch, getState) => {
  try {
    const userInfo = await axios.post(`${apiUrl}/auth/login`, {email, password})
    dispatch(setProfile(userInfo.data.profile));
    dispatch(setPage(userInfo.data.page));
  } catch (error) {
    console.log(error);
  }
}