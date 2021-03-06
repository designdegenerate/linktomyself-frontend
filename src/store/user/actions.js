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
  updateSectionLink,
  updateReduxSectionCard,
  updateReduxSectionCardImage,
  createReduxSectionCard,
  deleteReduxSectionCard,
  createReduxSection,
  deleteReduxSection,
} from "./slice";
import apiUrl from "../../apiUrl";
import toast from "react-hot-toast";
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

export const forceRefetchData = () => async (dispatch, getState) => {
  try {
    const newData = await axios.get(`${apiUrl}/auth/user`, {
      withCredentials: true,
      mode: "cors",
    });
    dispatch(setUserProfile(newData.data.profile));
    dispatch(setUserPage(newData.data.page));
  } catch (error) {
    toast(error.response.data);
    console.log(error);
  }
};

export const deleteUser = (data, navigate) => async (dispatch, getState) => {
  try {
    await axios.patch(`${apiUrl}/auth/user/delete`, data, {
      withCredentials: true,
      mode: "cors",
    });

    toast("User Deleted");
    dispatch(clearUserStore());
    await axios.get(`${apiUrl}/auth/logout`, {
      withCredentials: true,
      mode: "cors",
    });

    navigate("/");
  } catch (error) {
    console.log(error);
    toast(error.response.data);
  }
};

export const updateData = (data) => async (dispatch, getState) => {
  try {
    if (
      data.filter((obj) => {
        if ("lightColors" in obj || "darkColors" in obj) return true;
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

    data.map((obj) => {
      if ("colors" in obj) {
        if (obj.colors?.light) {
          dispatch(setUserLightTheme(obj.colors.light));
        }

        if (obj.colors?.dark) {
          dispatch(setUserDarkTheme(obj.colors.dark));
        }
      } else if ("email" in obj || "username" in obj || "name" in obj) {
        dispatch(
          setUserProfileByKey({
            key: Object.keys(obj)[0],
            value: obj[Object.keys(obj)[0]],
          })
        );
      } else if ("oneLiner" in obj || "bio" in obj) {
        dispatch(
          setUserPageByKey({
            key: Object.keys(obj)[0],
            value: obj[Object.keys(obj)[0]],
          })
        );
      }
    });

    toast("Profile Updated");
  } catch (error) {
    console.log(error);
    toast(error.response.data);
  }
};

export const updateProfileImage = (img) => async (dispatch, getState) => {
  try {
    dispatch(setUserLoading(true));

    const formData = new FormData();
    formData.append("image", img[0]);

    const imgURL = await axios.post(`${apiUrl}/auth/user/image`, formData, {
      withCredentials: true,
      mode: "cors",
      data: formData,
    });

    dispatch(
      setUserPageByKey({
        key: "profileImage",
        value: imgURL.data.profileImage,
      })
    );

    dispatch(setUserLoading(false));
    toast("Updated Profile Picture");
  } catch (error) {
    console.log(error);
    dispatch(setUserLoading(false));
    toast(error.response.data);
  }
};

export const deleteProfileImage = () => async (dispatch, getState) => {
  try {
    dispatch(setUserLoading(true));
    console.log("send req");

    await axios.delete(`${apiUrl}/auth/user/image`, {
      withCredentials: true,
      mode: "cors",
    });

    dispatch(setUserLoading(false));
    dispatch(
      setUserPageByKey({
        key: "profileImage",
        value: null,
      })
    );
    toast("Deleted Profile Picture");
  } catch (error) {
    console.log(error);
    dispatch(setUserLoading(false));
    toast(error.response.data);
  }
};

export const addLink = (data) => async (dispatch, getState) => {
  console.log(data);
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

    toast("Link Updated");
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

    toast("Link Deleted");
  } catch (error) {
    console.log(error);
    toast(error.response.data);
  }
};

export const updateSectionDetails = (data) => async (dispatch, getState) => {
  try {
    await axios.patch(`${apiUrl}/auth/sections/details`, data, {
      withCredentials: true,
      mode: "cors",
    });

    dispatch(updateSectionLink(data));

    toast("Section Updated");
  } catch (error) {
    console.log(error);
    toast(error.response.data);
  }
};

export const updateSectionCard =
  (data, section_id) => async (dispatch, getState) => {
    try {
      await axios.patch(
        `${apiUrl}/auth/sections/cards`,
        { data, section_id },
        {
          withCredentials: true,
          mode: "cors",
        }
      );

      dispatch(updateReduxSectionCard({ data, section_id }));

      toast("Card Updated");
    } catch (error) {
      console.log(error);
      toast(error.response.data);
    }
  };

export const updateCardImage =
  (img, _id, section_id, imageId) => async (dispatch, getState) => {
    try {
      dispatch(setUserLoading(true));

      const formData = new FormData();
      formData.append("image", img[0]);
      formData.append("_id", _id);
      formData.append("section_id", section_id);
      formData.append("imageId", imageId);

      const newImg = await axios.post(
        `${apiUrl}/auth/sections/cards/image`,
        formData,
        {
          withCredentials: true,
          mode: "cors",
          data: formData,
        }
      );
      const image = newImg.data;

      dispatch(
        updateReduxSectionCardImage({
          _id,
          section_id,
          image: image.image,
          imageId: image.imageId,
        })
      );

      dispatch(setUserLoading(false));
      toast("Updated Card Picture");
    } catch (error) {
      console.log(error);
      dispatch(setUserLoading(false));
      toast(error.response.data);
    }
  };

export const deleteCardImage = (data) => async (dispatch, getState) => {
  try {
    dispatch(setUserLoading(true));

    await axios.patch(`${apiUrl}/auth/sections/cards/image/delete`, data, {
      withCredentials: true,
      mode: "cors",
      data: data,
    });

    dispatch(
      updateReduxSectionCardImage({
        _id: data._id,
        section_id: data.section_id,
        image: null,
        imageId: null,
      })
    );

    dispatch(setUserLoading(false));
    toast("Updated Card Picture");
  } catch (error) {
    console.log(error);
    dispatch(setUserLoading(false));
    toast(error.response.data);
  }
};

export const createSectionCard =
  (data, section_id) => async (dispatch, getState) => {
    try {
      const res = await axios.post(
        `${apiUrl}/auth/sections/cards`,
        { data, section_id },
        {
          withCredentials: true,
          mode: "cors",
        }
      );
      const obj = res.data;

      dispatch(createReduxSectionCard({ obj, section_id }));

      toast("Card Updated");
    } catch (error) {
      console.log(error);
      toast(error.response.data);
    }
  };

export const deleteCard = (data) => async (dispatch, getState) => {
  try {
    await axios.patch(`${apiUrl}/auth/sections/cards/delete`, data, {
      withCredentials: true,
      mode: "cors",
    });

    dispatch(deleteReduxSectionCard(data));

    toast("Link Deleted");
  } catch (error) {
    console.log(error);
    toast(error.response.data);
  }
};

export const createSection = (data, type) => async (dispatch, getState) => {
  try {
    const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

    const sectionName = data === "tvShows" ? "TV Shows" : capitalize(data);

    const obj = {
      sectionName: `Favourite ${sectionName}`,
      type,
      contentType: data,
    };

    const newSection = await axios.post(`${apiUrl}/auth/sections`, obj, {
      withCredentials: true,
      mode: "cors",
    });

    dispatch(createReduxSection(newSection.data));

    toast("Section Created");
  } catch (error) {
    console.log(error);
    toast(error.response.data);
  }
};

export const deleteSection = (data) => async (dispatch, getState) => {
  try {
    await axios.patch(`${apiUrl}/auth/sections/delete`, data, {
      withCredentials: true,
      mode: "cors",
    });

    const _id = data._id;

    dispatch(deleteReduxSection(_id));

    toast("Section Deleted");
  } catch (error) {
    console.log(error);
    toast(error.response.data);
  }
};
