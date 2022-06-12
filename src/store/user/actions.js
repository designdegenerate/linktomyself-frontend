import axios from "axios";
import {
  addPermaLink,
  clearUserStore,
  setUserDarkTheme,
  setUserLightTheme,
  setUserLoading,
  setUserPage,
  setUserPageByKey,
  setUserProfile,
  setUserProfileByKey,
  updatePermaLink,
  deletePermaLink,
} from "./slice";
import apiUrl from "../../apiUrl";
import toast from "react-hot-toast";
import colorThemes from "../../colors.json";
import formatColors from "./formatColors";

export const loginUser = (email, password) => async (dispatch, getState) => {
  try {
    dispatch(setUserLoading(true));
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
    dispatch(setUserLoading(false));
  } catch (error) {
    console.log(error);
    toast(error.response.data);
    dispatch(setUserLoading(false));
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
      return; //401 is fine
    }

    //anything else is not
    if (error.response.data) {
      toast(error.response.data);
      console.log(error);
    } else {
      console.log(error);
    }
  }
};

export const registerUser =
  (email, password, username, name) => async (dispatch, getState) => {
    try {
      dispatch(setUserLoading(true));
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
      dispatch(setUserLoading(false));
    } catch (error) {
      console.log(error);
      toast(error.response.data);
      dispatch(setUserLoading(false));
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

export const updateData = (data) => async (dispatch, getState) => {
  try {

    if (
      data.filter((obj) => {
        if ("lightColors" in obj || "darkColors" in obj ) return true;
        return false;
      })
    ) {
      data = formatColors(data);
    }

    await axios.patch(`${apiUrl}/auth/user`, data, {
      withCredentials: true,
      mode: "cors",
      data: data,
    });

    data.map( obj => {
      if ('colors' in obj) {

        if (obj.colors?.light) {
          dispatch(setUserLightTheme(obj.colors.light));
        }
    
        if (obj.colors?.dark) {
          dispatch(setUserDarkTheme(obj.colors.dark));
        }

      } else if (
        'email' in obj ||
        'username' in obj ||
        'name' in obj
      ) {
        dispatch(
          setUserProfileByKey({
            key: Object.keys(obj)[0],
            value: obj[Object.keys(obj)[0]]
          })
        )
      } else if (
        'oneLiner' in obj ||
        'bio' in obj
      ) {
        dispatch(
          setUserPageByKey({
            key: Object.keys(obj)[0],
            value: obj[Object.keys(obj)[0]]
          })
        )
      }
    })

    toast("Profile Updated");
  } catch (error) {
    console.log(error);
    toast(error.response.data);
  }
};

export const addLink = (data) => async (dispatch, getState) => {
  try {
    const newLink = await axios.post(`${apiUrl}/auth/links`, data, {
      withCredentials: true,
      mode: "cors",
      data: data,
    });
    dispatch(addPermaLink(newLink.data));

  } catch (error) {
    console.log(error);
    toast(error.response.data);
  }
};

export const updateLink = (data) => async (dispatch, getState) => {
  try {
    await axios.patch(`${apiUrl}/auth/links`, data, {
      withCredentials: true,
      mode: "cors",
      data: data,
    });

    dispatch(updatePermaLink(data));

    toast("link updated");

  } catch (error) {
    console.log(error);
    toast(error.response.data);
  }
};

export const deleteLink = (data) => async (dispatch, getState) => {
  try {
    await axios.patch(`${apiUrl}/auth/links/delete`, data, {
      withCredentials: true,
      mode: "cors",
    });

    dispatch(deletePermaLink(data));

    toast("link deleted");

  } catch (error) {
    console.log(error);
    toast(error.response.data);
  }
};
