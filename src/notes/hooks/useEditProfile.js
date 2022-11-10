import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  startUpdateDispalyName,
  startUpdateEmail,
  startUpdatePassword,
  startUpdatePhotoProfile,
} from "../../store/slices/auth";

export const useEditProfile = (displayNameRef, emailRef, passwordRef) => {
  const [isActiveNameEdit, setIsActiveNameEdit] = useState(false);
  const [isActiveEmailedit, setIsActiveEmailedit] = useState(false);
  const [isActivePasswordEdit, setIsActivePasswordEdit] = useState(false);
  const dispatch = useDispatch();

  //   PhotoEdit
  const onPhotoEdit = ({ target }) => {
    if (target.files.length === 0) return;
    dispatch(startUpdatePhotoProfile(target.files[0]));
  };

  //   EmailEdit;
  const onEmailEdit = (newEmail) => {
    setIsActiveEmailedit(false);

    dispatch(startUpdateEmail(newEmail));
  };

  const onActiveEmailEdit = () => {
    setIsActiveEmailedit(true);

    setTimeout(() => {
      emailRef.current.getElementsByTagName("input")[0].focus();
    }, 200);
  };

  //   DisplayNameEdit;
  const onActiveDisplayNameEdit = () => {
    setIsActiveNameEdit(true);
    setTimeout(() => {
      displayNameRef.current.getElementsByTagName("input")[0].focus();
    }, 200);
  };

  const onDisplayNameEdit = (newName) => {
    setIsActiveNameEdit(false);
    dispatch(startUpdateDispalyName(newName));
  };

  //   PasswordEdit;
  const onPasswordEdit = (newPassword) => {
    setIsActivePasswordEdit(false);

    dispatch(startUpdatePassword(newPassword));
    passwordRef.current.querySelector("input").type = "password";
  };

  const onActivePasswordEdit = () => {
    setIsActivePasswordEdit(true);

    setTimeout(() => {
      passwordRef.current.getElementsByTagName("input")[0].focus();
    }, 200);
  };

  const onActiveVisibledPassword = () => {
    passwordRef.current.querySelector("input").type = "text";
  };

  return {
    onPhotoEdit,
    onEmailEdit,
    onActiveEmailEdit,
    onActiveDisplayNameEdit,
    onDisplayNameEdit,
    onPasswordEdit,
    onActivePasswordEdit,
    onActiveVisibledPassword,
    // States
    isActiveNameEdit,
    isActiveEmailedit,
    isActivePasswordEdit,
  };
};
