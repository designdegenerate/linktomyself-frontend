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

export const registerUser = (email, password, username, name) => async(dispatch, getState) => {
  try {
    const newUser = await axios.post(`${apiUrl}/auth/register`, {email, password, username, name})
    dispatch(setUserProfile(newUser.data.profile));
    dispatch(setUserPage(newUser.data.page));
  } catch (error) {
    console.log(error);
  }

}