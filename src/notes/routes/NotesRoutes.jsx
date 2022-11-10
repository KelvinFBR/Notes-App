import { Route, Routes } from "react-router-dom";
import { NotesPage } from "../pages/NotesPage";
import { SettingUserRoutes } from "./SettingUserRoutes";

export const NotesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<NotesPage />} />
      <Route path="/*" element={<SettingUserRoutes />} />
    </Routes>
  );
};
