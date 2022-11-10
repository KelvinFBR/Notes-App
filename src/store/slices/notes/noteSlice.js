import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    isSaving: false,
    messageSaved: "",
    notes: [],
    noteActive: null,

    //* esta es la forma en que luce nuetra nota active o todas las notas en general
    // active: {
    //   id: "",
    //   title: "",
    //   body: "",
    //   date: "",
    //   imagesURLs: [], // arreglo de urls
    // },
  },

  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },

    setActiveNote: (state, action) => {
      state.noteActive = action.payload;
      state.messageSaved = "";
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    setPhotosToActiveNote: (state, action) => {
      state.noteActive.imagesURLs = [
        ...state.noteActive.imagesURLs,
        ...action.payload,
      ];

      state.isSaving = false;
    },

    updateNote: (state, action) => {
      //payload: note
      state.isSaving = false;

      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });

      state.messageSaved = `Note saved successfully`;
    },

    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = "";
      state.notes = [];
      state.noteActive = null;
    },
    deleteNoteById: (state, action) => {
      state.noteActive = null;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

//* Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = noteSlice.actions;
