import { Navigate, Route, Routes } from "react-router-dom";
import { NotesLayout } from "../layout/NotesLayout";
import { AccountView, SettingsView } from "../views";

export const SettingUserRoutes = () => {
  return (
    <NotesLayout>
      <Routes>
        <Route path="/account" element={<AccountView />} />
        <Route path="/settings" element={<SettingsView />} />

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </NotesLayout>
  );
};
