import { NoteType } from "@/types/NoteType";
import { useNote } from "./useNote";

export const useNewNote = (): NoteType => {
  const { notes } = useNote();

  const newNote: NoteType = {
    id: notes.length > 0 ? Math.max(...notes.map((n) => n.id)) + 1 : 1,
    title: "",
    description: "",
    isPinned: false,
    createdAt: new Date(),
  };

  return newNote;
};
