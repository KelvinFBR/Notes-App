import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hook/useForm";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";
import {
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from "../../store/slices/notes";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export const NotesView = () => {
  const fileInputRef = useRef();
  const dispatch = useDispatch();
  const { noteActive, isSaving, messageSaved } = useSelector(
    (state) => state.notes
  );

  const { body, title, date, onInputChange, formState } = useForm(noteActive);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    //* alerta de guardado
    if (messageSaved.length > 0) {
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
        title: messageSaved,
      });
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files.length === 0) return;

    dispatch(startUploadingFiles(target.files));
  };
  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        mb: 1,
      }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          multiple
          onChange={onFileInputChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />

        <IconButton
          onClick={() => fileInputRef.current.click()}
          color="primary"
          disabled={isSaving}
        >
          <AddPhotoAlternateIcon />
        </IconButton>

        <Button
          disabled={isSaving}
          onClick={onSaveNote}
          color="primary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ mr: 1 }} />
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Enter a title"
          label="Title"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          multiline
          fullWidth
          placeholder="Enter a Description"
          label="Description"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent="end">
        <Button
          disabled={isSaving}
          onClick={onDelete}
          color="error"
          sx={{
            my: 2,
          }}
        >
          <DeleteOutline />
          Delete
        </Button>
      </Grid>

      {/* Images gallery */}
      <ImageGallery images={noteActive.imagesURLs} />
    </Grid>
  );
};
