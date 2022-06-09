import axios from "axios";
import {
  clearUserStore,
  setUserDarkTheme,
  setUserLightTheme,
  setUserLoading,
  setUserPage,
  setUserPageByKey,
  setUserProfile,
  setUserProfileByKey,
} from "./slice";
import apiUrl from "../../apiUrl";
import toast from "react-hot-toast";
import colorThemes from "../../colors.json";

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
    const hasLightColors = data.find((obj) => {
      return "lightColors" in obj;
    });

    const hasDarkColors = data.find((obj) => {
      return "darkColors" in obj;
    });

    if (hasLightColors) {
      const newLightColor = colorThemes.light.find(
        (color) => color.name === hasLightColors.lightColors
      );

      data = [...data, { colors: { light: { ...newLightColor } } }];

      const toDel = data.findIndex((obj) => "lightColors" in obj);

      data.splice(toDel, 1)
    }

    if (hasDarkColors) {
      const newDarkColor = colorThemes.dark.find(
        (color) => color.name === hasDarkColors.darkColors
      );

      if (hasLightColors) {
        const colorIndex = data.findIndex((obj) => "colors" in obj);

        data[colorIndex].colors = {
          ...data[colorIndex].colors,
          dark: { ...newDarkColor },
        };
      } else {
        data = [...data, { colors: { dark: { ...newDarkColor } } }];
      }

      const toDel = data.findIndex((obj) => "darkColors" in obj);

      data.splice(toDel, 1)
    }

    await axios.patch(`${apiUrl}/auth/user`, data, {
      withCredentials: true,
      mode: "cors",
      data: data,
    });

    const sanitizedData = Object.assign({}, ...data);

    //TODO: Replace all of this with a .map()!
    if (sanitizedData.email) {
      dispatch(
        setUserProfileByKey({ key: "email", value: sanitizedData.email })
      );
    }

    if (sanitizedData.username) {
      dispatch(
        setUserProfileByKey({ key: "username", value: sanitizedData.username })
      );
    }

    if (sanitizedData.name) {
      dispatch(setUserProfileByKey({ key: "name", value: sanitizedData.name }));
    }

    if (sanitizedData.oneLiner) {
      dispatch(setUserPageByKey({ key: "bio", value: sanitizedData.name }));
    }

    if (sanitizedData.bio) {
      dispatch(setUserPageByKey({ key: "bio", value: sanitizedData.name }));
    }

    if (sanitizedData.colors?.light ) {
      dispatch(setUserLightTheme(sanitizedData.colors.light));
    }

    if (sanitizedData.colors?.dark ) {
      dispatch(setUserDarkTheme(sanitizedData.colors.dark));
    }

    toast("Profile Updated");
  } catch (error) {
    console.log(error);
    toast(error.response.data);
  }
};
