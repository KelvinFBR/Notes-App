import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking", //checking , not-authenticated, authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null, // este es por si algun error sucede en el auth
    isSaving: false,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = "authenticated";
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload?.errorMessage || null;
    },

    savingData: (state, { payload = true }) => {
      state.isSaving = payload;
    },

    updatePhotoUserURL: (state, { payload }) => {
      state.photoURL = payload;
      state.isSaving = false;
    },
    updateDisplayName: (state, { payload }) => {
      state.displayName = payload;
      state.isSaving = false;
    },
    updateEmail: (state, { payload }) => {
      state.email = payload;
      state.isSaving = false;
    },

    checkingCredentials: (state) => {
      state.status = "checking";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  login,
  logout,
  checkingCredentials,
  updateDisplayName,
  updateEmail,
  updatePhotoUserURL,
  savingData,
} = authSlice.actions;
