import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../firebase/config";
import { fileUpload } from "../../../helpers";
import { loadNotes } from "../../../helpers/loadNotes";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./noteSlice";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imagesURLs: [],
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/noteColletions/notes`));
    const setDocResp = await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!uid) throw new Error("El Uid no existe");

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};
export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { noteActive } = getState().notes;

    const noteToFireStore = { ...noteActive };
    delete noteToFireStore.id;

    const docRef = doc(
      FirebaseDB,
      `${uid}/noteColletions/notes/${noteActive.id}`
    );

    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updateNote(noteActive));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    const fileUploadPromise = [];

    for (const file of files) {
      fileUploadPromise.push(fileUpload(file));
    }

    const photosURLs = await Promise.all(fileUploadPromise);

    dispatch(setPhotosToActiveNote(photosURLs));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { noteActive } = getState().notes;

    const docRef = doc(
      FirebaseDB,
      `${uid}/noteColletions/notes/${noteActive.id}`
    );

    await deleteDoc(docRef);

    dispatch(deleteNoteById(noteActive.id));
  };
};
