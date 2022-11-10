import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { useCheckAuth } from "../hook";
import { NotesRoutes } from "../notes/routes/NotesRoutes";
import { CheckingAuth } from "../ui";

export const AppRoute = () => {
  const status = useCheckAuth();

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<NotesRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
