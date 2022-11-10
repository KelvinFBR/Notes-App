import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);

    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,

      //* User info
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage,
    };
  }
};

export const registerUserWithEmailPasswaord = async ({
  email,
  password,
  displayName,
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    await updateProfile(FirebaseAuth.currentUser, { displayName });

    const { uid, photoURL } = resp.user;

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
      errorCode: error.code,
    };
  }
};

export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL, displayName } = resp.user;

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
      errorCode: error.code,
    };
  }
};

export const updateDispalyName = async ({ newName }) => {
  try {
    await updateProfile(FirebaseAuth.currentUser, { displayName: newName });

    return {
      ok: true,
      newName,
    };
  } catch (error) {
    console.warn(error);
    return {
      ok: false,
      errorMessage: error.message,
      errorCode: error.code,
    };
  }
};

export const updatePhotoURL = async ({ newPhotoURL }) => {
  try {
    await updateProfile(FirebaseAuth.currentUser, { photoURL: newPhotoURL });

    return {
      ok: true,
      newPhotoURL,
    };
  } catch (error) {
    console.warn(error);
    return {
      ok: false,
      errorMessage: error.message,
      errorCode: error.code,
    };
  }
};
export const updateMyEmail = async ({ newEmail }) => {
  try {
    const auth = getAuth();

    if (auth.currentUser.email === newEmail)
      throw new Error("this is your current email");

    await updateEmail(auth.currentUser, newEmail);

    return {
      ok: true,
      newEmail,
    };
  } catch (error) {
    console.warn(error);
    return {
      ok: false,
      errorMessage: error.message,
      errorCode: error.code,
    };
  }
};
export const updateMyPassword = async ({ newPassword }) => {
  try {
    const auth = getAuth();

    await updatePassword(auth.currentUser, newPassword);

    return {
      ok: true,
      newPassword,
    };
  } catch (error) {
    console.warn(error);
    return {
      ok: false,
      errorMessage: error.message,
      errorCode: error.code,
    };
  }
};

export const logoutFirebase = async () => {
  try {
    return await FirebaseAuth.signOut();
  } catch (error) {
    console.warn(error);
  }
};
