import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useIsActive = (id) => {
  const { noteActive } = useSelector((state) => state.notes);

  const isActive = useMemo(() => noteActive?.id === id, [noteActive]);

  return {
    isActive,
  };
};
