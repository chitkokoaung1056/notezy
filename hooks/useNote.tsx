import { NoteContext } from "@/contexts/NoteContext";
import { useContext } from "react";

export const useNote = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNote must be used within a NoteProvider");
  }

  return context;
};
