import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  updating: false,
  profile: null,
  page: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Loaders
    setUpdating: (state, action) => {
      state.updating = action.payload;
    },
    setUserLoading: (state, action) => {
      state.loading = action.payload;
    },

    // set user
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    setUserProfileByKey: (state, action) => {
      state.profile[action.payload.key] = action.payload.value;
    },
    setUserLightTheme: (state, action) => {
      state.page.colors.light = action.payload;
    },
    setUserDarkTheme: (state, action) => {
      state.page.colors.dark = action.payload;
    },

    //set page
    setUserPage: (state, action) => {
      state.page = action.payload;
    },
    setUserPageByKey: (state, action) => {
      state.page[action.payload.key] = action.payload.value;
    },

    //set links
    addPermaLink: (state, action) => {
      state.page.permaLinks = [...state.page.permaLinks, action.payload];
    },
    updatePermaLink: (state, action) => {
      const draftState = current(state.page.permaLinks);

      const index = draftState.findIndex((link) => {
        return link._id === action.payload._id;
      });

      state.page.permaLinks[index] = action.payload;
    },
    deletePermaLink: (state, action) => {
      const currentState = current(state.page.permaLinks);
      const newState = [...currentState];

      const index = newState.findIndex((link) => {
        return link._id === action.payload._id;
      });

      newState.splice(index);

      state.page.permaLinks = newState;
    },

    updateSectionLink: (state, action) => {
      const draftState = current(state.page.sections);

      const index = draftState.findIndex((sect) => {
        return sect._id === action.payload._id;
      });

      state.page.sections[index].fullLink = action.payload;

    },

    updateReduxSectionCard: (state, action) => {
      const draftState = current(state.page.sections);

      const sectIndex = draftState.findIndex((sect) => {
        return sect._id === action.payload.section_id;
      });

      const cardIndex = draftState[sectIndex].content.findIndex((card) => {
        return card._id === action.payload.data._id;
      });

      state.page.sections[sectIndex].content[cardIndex] = action.payload.data;
    },
    updateReduxSectionCardImage: (state, action) => {
      const draftState = current(state.page.sections);

      const sectIndex = draftState.findIndex((sect) => {
        return sect._id === action.payload.section_id;
      });

      const cardIndex = draftState[sectIndex].content.findIndex((card) => {
        return card._id === action.payload._id;
      });

      console.log(action.payload);
      state.page.sections[sectIndex].content[cardIndex].image = action.payload.image.image;
    },
    createReduxSectionCard: (state, action) => {
      const draftState = current(state.page.sections);

      const sectIndex = draftState.findIndex((sect) => {
        return sect._id === action.payload.section_id;
      });

      state.page.sections[sectIndex].content = [...state.page.sections[sectIndex].content, action.payload.obj];
    },
    deleteReduxSectionCard: (state, action) => {
      const currentState = current(state.page.sections);
      const newState = [...currentState];

      const sectIndex = currentState.findIndex((sect) => {
        return sect._id === action.payload.section_id;
      });

      const index = newState[sectIndex].content.findIndex((card) => {
        return card._id === action.payload._id;
      });

      const content = [...newState[sectIndex].content];

      console.log(index);
      console.log(content);

      content.splice(index, 1);

      state.page.sections[sectIndex].content = content;
    },

    clearUserStore: (state, action) => {
      state.profile = null;
      state.page = null;
    },
  },
});

export const {
  setUserLoading,
  setUpdating,
  setUserPage,
  setUserProfile,
  setUserProfileByKey,
  setUserDarkTheme,
  setUserLightTheme,
  setUserPageByKey,
  clearUserStore,
  addPermaLink,
  updatePermaLink,
  deletePermaLink,
  updateSectionLink,
  updateReduxSectionCard,
  updateReduxSectionCardImage,
  createReduxSectionCard,
  deleteReduxSectionCard
} = userSlice.actions;
export default userSlice.reducer;
