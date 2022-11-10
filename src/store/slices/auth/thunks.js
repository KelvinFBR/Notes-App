import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPasswaord,
  signInWithGoogle,
  updateDispalyName,
  updateMyEmail,
  updateMyPassword,
  updatePhotoURL,
} from "../../../firebase/providers";
import {
  checkingCredentials,
  login,
  logout,
  savingData,
  updateDisplayName,
  updateEmail,
  updatePhotoUserURL,
} from "./authSlice";
import { clearNotesLogout } from "../notes/noteSlice";
import { fileUpload } from "../../../helpers";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();

    if (!result.ok)
      return dispatch(logout({ errorMessage: result.errorMessage }));

    // delete result.ok;

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage, errorCode } =
      await registerUserWithEmailPasswaord({
        email,
        password,
        displayName,
      });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, email, displayName, photoURL }));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, displayName, photoURL, errorMessage, errorCode } =
      await loginWithEmailPassword({
        email,
        password,
      });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, email, displayName, photoURL }));
  };
};

//! actualizar datos

export const startUpdatePhotoProfile = (file) => {
  return async (dispatch) => {
    dispatch(savingData());

    const newPhotoURL = await fileUpload(file);

    const { ok, errorMessage } = await updatePhotoURL({
      newPhotoURL,
    });

    if (!ok) throw new Error(errorMessage);
    dispatch(updatePhotoUserURL(newPhotoURL));

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Photo updated successfully",
    });
  };
};

export const startUpdateDispalyName = (newName) => {
  return async (dispatch) => {
    dispatch(savingData());
    const { ok, errorMessage } = await updateDispalyName({
      newName,
    });

    if (!ok) throw new Error(errorMessage);
    dispatch(updateDisplayName(newName));

    //* alerta de guardado
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Name updated successfully",
    });
  };
};

export const startUpdateEmail = (newEmail) => {
  return async (dispatch) => {
    dispatch(savingData());

    const { ok, errorMessage } = await updateMyEmail({ newEmail });

    if (!ok) throw new Error(errorMessage);
    dispatch(updateEmail(newEmail));

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Email updated successfully",
    });
  };
};
export const startUpdatePassword = (newPassword) => {
  return async (dispatch) => {
    dispatch(savingData());

    const { ok, errorMessage } = await updateMyPassword({ newPassword });

    if (!ok) throw new Error(errorMessage);
    dispatch(savingData(false));

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Password updated successfully",
    });
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    await logoutFirebase();
    dispatch(clearNotesLogout());
    dispatch(logout());
  };
};
