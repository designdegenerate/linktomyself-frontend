import axios from "axios";
import { setUserPage, setUserProfile } from "./slice";
import apiUrl from "../../apiUrl";

export const loginUser = (email, password) => async(dispatch, getState) => {
  try {
    const userInfo = await axios.post(`${apiUrl}/auth/login`, {email, password})
    dispatch(setUserProfile(userInfo.data.profile));
    dispatch(setUserPage(userInfo.data.page));
  } catch (error) {
    console.log(error);
  }
}