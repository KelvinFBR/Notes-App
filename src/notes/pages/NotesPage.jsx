import { IconButton } from "@mui/material";
import AddOutlined from "@mui/icons-material/AddOutlined";
import { NotesLayout } from "../layout/NotesLayout";
import { NotesView, NothingSeletedView } from "../views";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/slices/notes";

export const NotesPage = () => {
  const dispatch = useDispatch();
  const { noteActive } = useSelector((state) => state.notes);

  const { isSaving } = useSelector((state) => state.notes);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <NotesLayout>
      {!!noteActive ? <NotesView /> : <NothingSeletedView />}

      {/* Add Note */}
      <IconButton
        disabled={isSaving}
        onClick={onClickNewNote}
        className="box-shadow"
        size="large"
        sx={{
          color: "primary.main",
          backgroundColor: "secondary.main",

          ":hover": { backgroundColor: "secondary.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </NotesLayout>
  );
};
