import axios from "axios";
import { clearUserStore, setUserPage, setUserProfile } from "./slice";
import apiUrl from "../../apiUrl";
import toast from "react-hot-toast";

export const loginUser = (email, password) => async (dispatch, getState) => {
  try {
    const userInfo = await axios.post(
      `${apiUrl}/auth/login`,
      { email, password },
      {
        withCredentials: true,
        mode: "cors",
      }
    );
    dispatch(setUserProfile(userInfo.data.profile));
    dispatch(setUserPage(userInfo.data.page));
  } catch (error) {
    console.log(error);
    toast(error.response.data);
  }
};

export const restoreLogin = () => async (dispatch, getState) => {
  try {
    const restoredUser = await axios.get(`${apiUrl}/auth/user`, {
      withCredentials: true,
      mode: "cors",
    });
    dispatch(setUserProfile(restoredUser.data.profile));
    dispatch(setUserPage(restoredUser.data.page));
  } catch (error) {
    if (error.response.status === 401) {
      //401 is fine
      return;
    }
    //anything else is not
    console.log(error);
    toast(error.response.data);
  }
};

export const registerUser =
  (email, password, username, name) => async (dispatch, getState) => {
    try {
      const newUser = await axios.post(
        `${apiUrl}/auth/register`,
        {
          email,
          password,
          username,
          name,
        },
        {
          withCredentials: true,
          mode: "cors",
        }
      );
      dispatch(setUserProfile(newUser.data.profile));
      dispatch(setUserPage(newUser.data.page));
    } catch (error) {
      console.log(error);
      toast(error.response.data);
    }
  };

export const logoutUser = () => async (dispatch, getState) => {
  try {
    dispatch(clearUserStore());
    await axios.get(`${apiUrl}/auth/logout`, {
      withCredentials: true,
      mode: "cors",
    });
  } catch (error) {
    console.log(error);
    toast(error.response.data);
  }
};
